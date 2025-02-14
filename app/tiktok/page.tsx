"use client";

import TikTokLogin from "@/components/tiktok-login";
import TikTokVideoCard from "@/components/tiktok-video-card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TikTokPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Try to get stored data first
    const storedToken = localStorage.getItem('tiktok_access_token');
    const storedProfile = localStorage.getItem('tiktok_profile');

    if (storedToken && storedProfile) {
      setAccessToken(storedToken);
      setProfile(JSON.parse(storedProfile));
      setLoading(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !accessToken) {
      fetch(`/api/tiktok/auth?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem('tiktok_access_token', data.accessToken);
            localStorage.setItem('tiktok_profile', JSON.stringify(data.profile.user));
            
            setAccessToken(data.accessToken);
            setProfile(data.profile.user);
            router.replace("/tiktok");
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [accessToken, router]);

  const handleLogout = () => {
    localStorage.removeItem('tiktok_access_token');
    localStorage.removeItem('tiktok_profile');
    setAccessToken(null);
    setProfile(null);
    setVideos([]);
  };

  const fetchVideos = async () => {
    if (!accessToken) return;
    
    setLoadingVideos(true);
    try {
      const response = await fetch(`/api/tiktok/videos?accessToken=${accessToken}`);
      const data = await response.json();
      if (data.data && data.data.videos) {
        setVideos(data.data.videos);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoadingVideos(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        TikTok Analytics Dashboard
      </h2>

      {!accessToken ? (
        <TikTokLogin />
      ) : (
        <div className="space-y-8">
          {/* Logout Button */}
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>

          {/* Profile Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <a
                href={profile.profile_deep_link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={profile.avatar_url || "/placeholder.svg"}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold">{profile.display_name}</h3>
                  <p className="text-gray-600">@{profile.username}</p>
                  {profile.is_verified && (
                    <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Verified
                    </span>
                  )}
                </div>
              </a>
            </div>

            <div className="md:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-2xl font-bold">{profile.follower_count || 0}</p>
                  <p className="text-gray-600">Followers</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-2xl font-bold">{profile.following_count || 0}</p>
                  <p className="text-gray-600">Following</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-2xl font-bold">{profile.likes_count || 0}</p>
                  <p className="text-gray-600">Likes</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <p className="text-2xl font-bold">{profile.video_count || 0}</p>
                  <p className="text-gray-600">Videos</p>
                </div>
              </div>

              {/* Auth Token Display moved here */}
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-700 mb-2">Access Token</h4>
                <div className="relative">
                  <div className="overflow-x-auto bg-gray-50 p-3 rounded text-xs font-mono break-all">
                    {accessToken}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(accessToken);
                      // Optionally add a toast notification here
                    }}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    title="Copy to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          {profile.bio_description && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-gray-700 mb-2">Bio</h4>
              <p className="text-gray-600">{profile.bio_description}</p>
            </div>
          )}

          {/* Videos Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Videos & Analytics</h3>
              <button
                onClick={fetchVideos}
                disabled={loadingVideos}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 transition"
              >
                {loadingVideos ? 'Loading...' : 'Fetch Videos'}
              </button>
            </div>

            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <TikTokVideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 py-8">
                {loadingVideos ? (
                  <p>Loading videos...</p>
                ) : (
                  <p>Click the button above to load your videos and analytics</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TikTokPage;