import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// connecting with the database
connectDB();

// function to reset the password
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password, confirmPassword } = reqBody;

    // checking for valid password
    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ) ||
      !confirmPassword.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ) ||
      password !== confirmPassword
    ) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid password",
      });
    }

    //   checking the user based on the token
    const user = await User.findOne({
      forgetPasswordToken: decodeURIComponent(token),
      forgetPasswordTokenExpiry: { $gt: Date.now() },
    });

    //   user not found
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid token",
      });
    }

    //   encypting the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //   updating the user's password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Failed to changed the password",
      error: error?.message,
    });
  }
}
