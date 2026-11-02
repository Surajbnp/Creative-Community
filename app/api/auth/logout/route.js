import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "token"; 

export async function POST() {
  const cookieStore = await cookies();

  if (cookieStore.has(SESSION_COOKIE_NAME)) {
    cookieStore.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  }

  return NextResponse.json({ success: true });
}
