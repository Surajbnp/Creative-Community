import crypto from "crypto";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import database from "../../../../../lib/database";
import User from "../../../../../models/User.Model";

export async function POST(req) {
  try {
    await database();

    const { email, token, newPassword } = await req.json();

    if (!email || !token || !newPassword) {
      return NextResponse.json(
        { message: "Email, token, and new password are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase();
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email: normalizedEmail,
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordTokenHash +resetPasswordExpires");

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset link" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful. You can now log in." },
      { status: 200 },
    );
  } catch (err) {
    console.error("Password reset confirm error:", err);
    return NextResponse.json(
      { message: "Something went wrong, please try again" },
      { status: 500 },
    );
  }
}
