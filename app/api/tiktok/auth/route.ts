import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code is missing" }, { status: 400 });
  }

  try {
    // Request access token
    const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams({
        client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY!,
        client_secret: process.env.TIKTOK_CLIENT_SECRET!,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI!,
      }),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error("Token response error:", errorText);
      throw new Error(`Token request failed with status ${tokenRes.status}`);
    }

    const tokenData = await tokenRes.json();
    console.log("Token response data:", tokenData);

    if (!tokenData.access_token) {
      console.error("Invalid token data:", tokenData);
      throw new Error("Failed to get access token: Invalid response format");
    }

    const accessToken = tokenData.access_token;

    // Fetch user info (Use POST and include `fields`)
    const userRes = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name,username,bio_description,is_verified,is_verified,following_count,likes_count,likes_count,video_count,profile_deep_link", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });

    const userData = await userRes.json()
    console.log(userData)

    return NextResponse.json({ accessToken, profile: userData.data });
  } catch (error) {
    console.error("TikTok Auth Error:", error);
    return NextResponse.json({ error: "Authentication failed", details: error }, { status: 500 });
  }
}
