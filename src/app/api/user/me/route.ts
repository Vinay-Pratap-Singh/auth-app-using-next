import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";
import { headers } from "next/headers";

// connecting to the database
connectDB();

// function to return the user data
export async function GET(request: NextRequest) {
  try {
    const headersList = headers();
    const Authorization = headersList.get("Authorization");
    const token = Authorization?.split(" ")[1] || "";

    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );
    const { id } = decodedToken;
    const user = await User.findOne({ _id: id }).select("-password");
    return NextResponse.json(
      {
        success: true,
        message: "User details fetched successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message,
        error,
      },
      { status: 400 }
    );
  }
}
