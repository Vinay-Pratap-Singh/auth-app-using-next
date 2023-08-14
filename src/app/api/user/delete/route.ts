import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// connecting to the database
connectDB();

export async function DELETE(request: NextRequest) {
  try {
    const token: any = request.cookies.get("token")?.value || "";
    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );

    const user = await User.findOneAndDelete({ _id: decodedToken?.id });

    if (user) {
      // removing the token from cookie
      const response = NextResponse.json({
        success: true,
        message: "Account deleted successfully",
      });
      response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      return response;
    }
    return NextResponse.json({
      success: false,
      message: "Failed to delete your account",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete your account",
    });
  }
}
