import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import database from "../../../../../lib/database";
import User from "../../../../../models/User.Model";

export async function GET(req) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(`${origin}/login?error=google_denied`);
    }

    if (!code) {
      return NextResponse.redirect(`${origin}/login?error=no_code`);
    }

    // Exchange code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await tokenRes.json();

    if (!tokens.access_token) {
      console.error("Token exchange failed:", tokens);
      return NextResponse.redirect(
        `${origin}/login?error=token_exchange_failed`,
      );
    }

    // Fetch Google profile
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${tokens.access_token}` } },
    );
    const profile = await profileRes.json();

    if (!profile.email || !profile.verified_email) {
      return NextResponse.redirect(`${origin}/login?error=unverified_email`);
    }

    await database();

    const normalizedEmail = profile.email.toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });

    if (user) {
      if (user.authProvider === "local") {
        return NextResponse.redirect(
          `${origin}/login?error=account_exists_local`,
        );
      }
    } else {
      user = await User.create({
        name: profile.name,
        email: normalizedEmail,
        password: undefined, // no password for Google accounts
        profilePicture: profile.picture || "",
        authProvider: "google",
        googleId: profile.id,
        avatar: profile.picture || "",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // NEW: only go straight to /classroom once onboarding is actually
    // done. Otherwise land back on the signup board, which detects
    // ?resume=1 and picks up the wizard at the right step.
    const destination = user.isProfileCompleted
      ? "/classroom"
      : "/signup?resume=1";

    const response = NextResponse.redirect(`${origin}${destination}`);

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Google OAuth callback error:", err);
    const { origin } = new URL(req.url);
    return NextResponse.redirect(`${origin}/login?error=server_error`);
  }
}
