import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

// connecting to the database
connectDB();

// function to return the user data
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );
    console.log(token, decodedToken);
    const { id } = decodedToken;
    const user = await User.findOne({ _id: id }).select("-password");
    return NextResponse.json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error?.message,
    });
  }
}
