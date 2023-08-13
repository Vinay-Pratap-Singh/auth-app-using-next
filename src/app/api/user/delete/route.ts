import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// connecting to the database
connectDB();

export async function DELETE(response: NextResponse) {
  try {
    const token: any = response.cookies.get("token")?.value || "";
    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );

    const user = await User.findOneAndDelete({ _id: decodedToken?.id });

    if (user) {
      return NextResponse.json({
        success: true,
        message: "Account deleted successfully",
      });
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
