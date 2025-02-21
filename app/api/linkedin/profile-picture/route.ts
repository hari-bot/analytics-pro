import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { error: "Authorization token is required" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch("https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile picture");
    }

    const data = await response.json();
    const profilePictureUrl = data.profilePicture?.displayImage.elements[0]?.identifiers[0]?.identifier || null;

    return NextResponse.json({ profilePictureUrl });
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 