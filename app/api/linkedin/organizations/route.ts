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
    // Fetch organizations
    const orgResponse = await fetch(
      "https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    if (!orgResponse.ok) {
      throw new Error("Failed to fetch organizations");
    }

    const orgData = await orgResponse.json();
    const elements = orgData.elements || [];
    console.log(orgData);

    if (elements.length === 0) {
      return NextResponse.json({ error: "No organizations found" }, { status: 404 });
    }

    // Extract organization IDs
    const orgIds = elements
      .map((item: any) => item.organizationalTarget.replace("urn:li:organization:", ""))
      .filter(Boolean);

    if (orgIds.length === 0) {
      return NextResponse.json({ error: "No valid organization IDs found" }, { status: 404 });
    }

    // Fetch details of each organization
    const orgDetailsPromises = orgIds.map(async (orgId: string) => {
      const orgDetailResponse = await fetch(
        `https://api.linkedin.com/v2/organizations/${orgId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Restli-Protocol-Version": "2.0.0",
          },
        }
      );

      if (!orgDetailResponse.ok) {
        console.error(`Failed to fetch details for org ID: ${orgId}`);
        return null; // Skip failed orgs
      }

      const data = await orgDetailResponse.json();
      return {
        id: orgId,
        name: data.localizedName || "Unknown",
        vanityName: data.vanityName || "N/A",
      };
    });

    const orgDetails = (await Promise.all(orgDetailsPromises)).filter(Boolean);

    return NextResponse.json({ organizations: orgDetails });
  } catch (error) {
    console.error("Error fetching organization details:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
