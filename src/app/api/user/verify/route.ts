import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// connecting with the database
connectDB();

// function to verify the user account
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    //   checking the user based on the token
    const user = await User.findOne({
      verifyToken: decodeURIComponent(token),
      verifyTokenExpiry: { $gt: Date.now() },
    });

    //   user not found
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid token",
      });
    }

    //   updating the user fields if it exist
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "User verification successfull",
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: "Failed to verify the user",
      error: error?.message,
    });
  }
}
