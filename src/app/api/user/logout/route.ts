import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Logout successfull",
      },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to logout",
      },
      { status: 400 }
    );
  }
}
