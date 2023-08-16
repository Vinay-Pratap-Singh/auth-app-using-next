import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// connecting to the database
connectDB();

// function to login
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // checking that the user exist or not
    const user = await User.findOne({ email });
    if (user) {
      // checking for the password
      const isPasswordMatched = await bcryptjs.compare(password, user.password);
      if (isPasswordMatched) {
        const payload = {
          id: user._id,
          email: user.email,
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });

        const response = NextResponse.json({
          success: true,
          message: "Login successfully",
          user,
        });
        // adding the token to https only cookie
        response.cookies.set("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24,
        });

        return response;
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
