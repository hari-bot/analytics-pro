"use client";

import TikTokLogin from "@/components/tiktok-login";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TikTokPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
            // Store data in localStorage
            localStorage.setItem('tiktok_access_token', data.accessToken);
            localStorage.setItem('tiktok_profile', JSON.stringify(data.profile.user));
            
            setAccessToken(data.accessToken);
            setProfile(data.profile.user);
            // Clean up URL after successful auth
            router.replace("/tiktok");
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [accessToken, router]);

  // Add logout function
  const handleLogout = () => {
    localStorage.removeItem('tiktok_access_token');
    localStorage.removeItem('tiktok_profile');
    setAccessToken(null);
    setProfile(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        TikTok Profile
      </h2>

      {!accessToken ? (
        <TikTokLogin />
      ) : (
        <div className="space-y-6">
          {/* Add Logout Button */}
          <div className="flex justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 focus:outline-none"
            >
              Logout
            </button>
          </div>

          {/* Profile Header */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <Image
                src={profile.avatar_url || "/placeholder.svg"}
                alt="Avatar"
                className="w-16 h-16 rounded-full border-2 border-black"
                width={64}
                height={64}
              />
              <div>
                <h3 className="text-lg font-semibold">{profile.display_name}</h3>
                <p className="text-gray-600">@{profile.username}</p>
                {profile.is_verified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-gray-800">{profile.following_count || 0}</p>
              <p className="text-gray-600">Following</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-gray-800">{profile.likes_count || 0}</p>
              <p className="text-gray-600">Likes</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-gray-800">{profile.video_count || 0}</p>
              <p className="text-gray-600">Videos</p>
            </div>
          </div>

          {/* Bio */}
          {profile.bio_description && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-700 mb-2">Bio</h4>
              <p className="text-gray-600">{profile.bio_description}</p>
            </div>
          )}

          {/* Access Token */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Access Token</h4>
            <div className="overflow-x-auto">
              <code className="text-sm bg-gray-100 p-2 rounded block">{accessToken}</code>
            </div>
          </div>

          {/* Profile Link */}
          {profile.profile_deep_link && (
            <div className="text-center">
              <a
                href={profile.profile_deep_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                View TikTok Profile
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TikTokPage;
  
  