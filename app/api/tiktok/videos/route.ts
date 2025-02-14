import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");

  if (!accessToken) {
    return NextResponse.json({ error: "Access token is required" }, { status: 400 });
  }

  try {
    const fields = [
      "id",
      "create_time",
      "cover_image_url",
      "share_url",
      "video_description",
      "duration",
      "title",
      "like_count",
      "comment_count",
      "share_count",
      "view_count",
      "embed_html",
      "embed_link"
    ].join(',');

    const videosRes = await fetch(
      `https://open.tiktokapis.com/v2/video/list/?fields=${encodeURIComponent(fields)}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
    });

    if (!videosRes.ok) {
      let errorDetails;
      try {
        errorDetails = await videosRes.json();
      } catch {
        // If response is not JSON, get text instead
        errorDetails = await videosRes.text();
      }
      
      console.error("TikTok API Error:", {
        status: videosRes.status,
        details: errorDetails
      });

      return NextResponse.json({
        error: "Failed to fetch videos",
        details: errorDetails,
        status: videosRes.status
      }, { status: videosRes.status });
    }

    const data = await videosRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch videos", details: error },
      { status: 500 }
    );
  }
} 