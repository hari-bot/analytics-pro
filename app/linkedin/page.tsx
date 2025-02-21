"use client"

import { useEffect, useState } from "react"
import LinkedInLogin from "@/components/linkedin-login"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import AnalyticsChart from "@/components/analytics-chart"

const LinkedInPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [analyticsError, setAnalyticsError] = useState<string | null>(null)
  const [analyticsData, setAnalyticsData] = useState<any[] | null>(null)
  const [selectedOrgId, setSelectedOrgId] = useState<string>("")
  const [organizations, setOrganizations] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem("linkedin_token")
    const storedProfile = localStorage.getItem("linkedin_profile")

    if (storedToken && storedProfile) {
      setAccessToken(storedToken)
      setProfile(JSON.parse(storedProfile))
      setLoading(false)
      fetchOrganizations(storedToken);
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      fetch(`/api/linkedin/auth?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("linkedin_token", data.accessToken)
            localStorage.setItem("linkedin_profile", JSON.stringify(data.profile))

            setAccessToken(data.accessToken)
            setProfile(data.profile)
            fetchOrganizations(data.accessToken);
            router.replace("/linkedin")
          }
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [router])

  const fetchOrganizations = async (token: string) => {
    try {
      const response = await fetch('/api/linkedin/organizations', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch organizations");
      }

      const data = await response.json();
      setOrganizations(data.organizations);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("linkedin_token")
    localStorage.removeItem("linkedin_profile")
    setAccessToken(null)
    setProfile(null)
    setAnalyticsData(null)
  }

  const fetchAnalytics = async () => {
    if (!selectedOrgId) {
      setAnalyticsError("Please select an organization")
      return
    }

    setAnalyticsLoading(true)
    setAnalyticsError(null)

    try {
      const response = await fetch(`/api/linkedin/analytics?orgId=${selectedOrgId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch analytics")
      }

      const data = await response.json()
      console.log(data)

      // Transform the data for the chart
      const transformedData = data.elements.map((item: any) => ({
        date: new Date(item.timeRange.start).toISOString().split("T")[0],
        impressions: item.totalShareStatistics.impressionCount,
        uniqueImpressions: item.totalShareStatistics.uniqueImpressionsCount,
        clicks: item.totalShareStatistics.clickCount,
        likes: item.totalShareStatistics.likeCount,
        engagement: item.totalShareStatistics.engagement,
        shares: item.totalShareStatistics.shareCount,
        comments: item.totalShareStatistics.commentCount,
      }))

      setAnalyticsData(transformedData)
    } catch (error) {
      setAnalyticsError(error instanceof Error ? error.message : "Failed to fetch analytics")
    } finally {
      setAnalyticsLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center p-8 text-gray-400">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">LinkedIn Profile</h2>

      {!accessToken ? (
        <LinkedInLogin />
      ) : (
        <div className="space-y-8">
          {/* Profile Overview */}
          <div className="bg-[#242830] p-6 rounded-lg shadow-lg flex items-center gap-6 w-full">
            {/* Profile Image */}
            <div className="w-24 h-24 flex-shrink-0">
              <Image
                src={
                  profile?.profilePicture?.displayImage
                    ? `https://media.licdn.com/dms/image/${profile.profilePicture.displayImage}`
                    : "/placeholder.svg"
                }
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
                width={96}
                height={96}
              />
            </div>

            {/* Profile Details */}
            <div className="flex flex-col flex-grow w-full">
              <p className="text-xl font-semibold text-white">{profile?.localizedFirstName} {profile?.localizedLastName}</p>
              <p className="text-sm text-gray-400">@{profile?.vanityName}</p>
            </div>

            {/* Logout Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 px-4 py-2 rounded-md border border-red-500 hover:border-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Access Token Display */}
          {accessToken && (
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Access Token</h3>
              <pre className="text-gray-300 whitespace-pre-wrap break-all">{accessToken}</pre>
            </div>
          )}

          {/* Organizations Dropdown */}
          <div className="bg-[#242830] p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-4">Select Organization</h3>
            <select
              className="bg-gray-700 text-white rounded-md p-2 mb-4 w-full"
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(e.target.value)}
            >
              <option value="" disabled>
                Select your organization
              </option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.vanityName} 
                </option>
              ))}
            </select>
            <button
              onClick={fetchAnalytics}
              disabled={analyticsLoading || !selectedOrgId}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {analyticsLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  <span>Loading...</span>
                </>
              ) : (
                <span>Fetch Insights</span>
              )}
            </button>
          </div>

          {/* Analytics Error */}
          {analyticsError && (
            <Alert variant="destructive">
              <AlertDescription>{analyticsError}</AlertDescription>
            </Alert>
          )}

          {/* Analytics Chart */}
          {analyticsData && analyticsData.length > 0 && (
            <div className="bg-[#242830] p-6 rounded-lg shadow-lg relative">
              <AnalyticsChart data={analyticsData} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LinkedInPage

