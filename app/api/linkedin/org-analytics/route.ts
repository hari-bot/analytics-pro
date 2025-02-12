import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const accessToken = searchParams.get("accessToken");
  const orgId = searchParams.get("orgId");

  if (!accessToken || !orgId) {
    return NextResponse.json({ error: "Missing accessToken or orgId" }, { status: 400 });
  }

  try {
    const analyticsRes = await fetch(
      `https://api.linkedin.com/v2/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=${orgId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const analyticsData = await analyticsRes.json();
    return NextResponse.json(analyticsData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
