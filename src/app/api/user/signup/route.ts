import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

// connecting to database
connectDB();

// function to create account
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { fullName, email, phoneNumber, password } = reqBody;

    // checking that the user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        success: false,
        message: "User already exist",
      });
    }

    // checking that the fields are proper or not
    if (!fullName || !email || !password || !phoneNumber) {
      return NextResponse.json({
        success: false,
        message: "Please fill the required fields",
      });
    }

    // checking for valid email
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    // checking for valid phone number
    if (!phoneNumber.match(/^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/)) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    // checking for valid password
    if (!password.match(/^(\+91[-\s]?)?[0]?(91)?[789]\d{9}$/)) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid phone number",
      });
    }

    //   encypting the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //   creating the user account
    const newUser = await new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
    }).save();

    console.log(newUser);
    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
