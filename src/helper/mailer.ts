import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import nodemailer from "nodemailer";

type Iprop = {
  email: string;
  emailType: string;
  userID: string;
};

export const sendEmail = async ({ email, emailType, userID }: Iprop) => {
  try {
    // creating the hashed token
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);
    const encodedToken = encodeURIComponent(hashedToken);

    // setting the data as per email type
    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          verifyToken: hashedToken,
          //   expiry of 10 minutes
          verifyTokenExpiry: Date.now() + 600000,
        }
      );
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(
        { _id: userID },
        {
          forgetPasswordToken: hashedToken,
          //   expiry of 10 minutes
          forgetPasswordTokenExpiry: Date.now() + 600000,
        }
      );
    }

    //   creating the mail transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.TRANSPORT_USER,
        pass: process.env.TRANSPORT_PASS,
      },
    });

    //   creating the mail options
    const mailOptions = {
      from: "technicalharvi@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your account" : "Reset your password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verify/${encodedToken}">here<a/> to verify the account. <br>If not working, please visit the given link ${process.env.DOMAIN}/verify/${encodedToken}</p>`
          : `<p>Click <a href="${process.env.DOMAIN}/reset/${encodedToken}">here<a/> to reset your account password. <br>If not working, please visit the given link: ${process.env.DOMAIN}/reset/${encodedToken}</p>`,
    };

    //   sending the mail
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Failed to send mail",
      error: error?.message,
    });
  }
};
