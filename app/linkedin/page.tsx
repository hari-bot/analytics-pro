"use client";

import { useEffect, useState } from "react";
import LinkedInLogin from "@/components/linkedin-login"
import Image from "next/image";
import { useRouter } from 'next/navigation';

const LinkedInPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored token first
    const storedToken = localStorage.getItem('linkedin_token');
    const storedProfile = localStorage.getItem('linkedin_profile');
    
    if (storedToken && storedProfile) {
      setAccessToken(storedToken);
      setProfile(JSON.parse(storedProfile));
      setLoading(false);
      return;
    }

    // If no stored token, check for code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(`/api/linkedin/auth?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            // Store token and profile
            localStorage.setItem('linkedin_token', data.accessToken);
            localStorage.setItem('linkedin_profile', JSON.stringify(data.profile));
            
            setAccessToken(data.accessToken);
            setProfile(data.profile);
            
            // Remove code from URL
            router.replace('/linkedin');
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('linkedin_token');
    localStorage.removeItem('linkedin_profile');
    setAccessToken(null);
    setProfile(null);
  };

  if (loading) {
    return <div className="text-center p-8 text-gray-400">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">
        LinkedIn Profile
      </h2>

      {!accessToken ? (
        <LinkedInLogin />
      ) : (
        <div className="space-y-8">
          {/* Profile Overview */}
          <div className="bg-[#242830] p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={profile.picture || "/placeholder.svg"}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                  width={64}
                  height={64}
                />
                <div>
                  <h3 className="text-xl font-semibold text-white">{profile.name}</h3>
                  <p className="text-gray-400">{profile.email}</p>
                  {profile.headline && (
                    <p className="text-gray-300 mt-2">{profile.headline}</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 px-4 py-2 rounded-md border border-red-500 hover:border-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInPage;