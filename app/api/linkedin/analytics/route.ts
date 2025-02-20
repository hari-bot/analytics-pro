import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const orgId = req.nextUrl.searchParams.get("orgId");

  if (!token || !orgId) {
    return NextResponse.json(
      { error: "Authorization token and organization ID are required" },
      { status: 401 }
    );
  }

  const currentTime = Date.now();
  const sevenDaysAgo = currentTime - 15 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  try {
    const response = await fetch(
      `https://api.linkedin.com/v2/organizationalEntityShareStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:${orgId}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=${sevenDaysAgo}&timeIntervals.timeRange.end=${currentTime}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch organization analytics");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching organization analytics:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 