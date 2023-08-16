import { connectDB } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// connecting with the database
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, emailType } = reqBody;

    const user = await User.findOne({ email });
    // if user does not exist
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid details",
        },
        { status: 400 }
      );
    }

    await sendEmail({ email, emailType, userID: user?._id });
    return NextResponse.json(
      {
        success: true,
        message: "Mail send successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send the mail",
      },
      { status: 400 }
    );
  }
}
