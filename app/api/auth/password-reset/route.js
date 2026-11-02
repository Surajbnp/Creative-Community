import crypto from "crypto";
import { NextResponse } from "next/server";
import database from "../../../../lib/database";
import User from "../../../../models/User.Model";
import { resend } from "../../../../lib/resend";

export async function POST(req) {
  try {
    await database();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const normalizedEmail = email.toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    // Always respond the same way, whether or not the user exists,
    // to avoid leaking which emails are registered.
    const genericResponse = NextResponse.json(
      { message: "If an account exists, a reset link has been sent." },
      { status: 200 },
    );

    if (!user) {
      console.log("[password-reset] exiting: no user found for this email");
      return genericResponse;
    }

    if (!user.password) {
      console.log(
        "[password-reset] exiting: user has no password (Google-only account)",
      );
      return genericResponse;
    }

    // Generate raw token (sent to user) + hashed token (stored in DB)
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    console.log(
      "[password-reset] token saved on user, expires:",
      new Date(user.resetPasswordExpires).toISOString(),
    );

    const resetUrl = `${process.env.APP_URL}/reset-password?token=${rawToken}&email=${encodeURIComponent(normalizedEmail)}`;
    console.log("[password-reset] reset URL:", resetUrl);

    console.log(
      "[password-reset] RESEND_API_KEY loaded:",
      !!process.env.RESEND_API_KEY,
    );
    console.log(
      "[password-reset] RESEND_FROM_EMAIL:",
      process.env.RESEND_FROM_EMAIL,
    );

    const { data, error } = await resend.emails.send({
      from: "JVM App <noreply@jvm2k2.online>",
      to: normalizedEmail,
      subject: "Reset your JVM App password",
      text: `You requested a password reset. Open this link within 5 minutes to reset your password: ${resetUrl}\n\nIf you didn't request this, ignore this email.`,
      html: `
    <p>You requested to reset your password.</p>
    <p>This link will expire in <strong>5 minutes</strong>.</p>
    <p><a href="${resetUrl}">Reset your password</a></p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `,
    });

    if (error) {
      console.error(
        "[password-reset] Resend send error:",
        JSON.stringify(error, null, 2),
      );
    } else {
      console.log(
        "[password-reset] Resend email sent successfully:",
        JSON.stringify(data, null, 2),
      );
    }

    return genericResponse;
  } catch (err) {
    console.error("[password-reset] Uncaught error:", err);
    return NextResponse.json(
      { message: "Something went wrong, please try again" },
      { status: 500 },
    );
  }
}
