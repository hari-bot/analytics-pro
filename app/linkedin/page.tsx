"use client";

import { useEffect, useState } from "react";
import LinkedInLogin from "@/components/linkedin-login"
import Image from "next/image";
const LinkedInPage = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code && !accessToken) {
      fetch(`/api/linkedin/auth?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            setAccessToken(data.accessToken);
            setProfile(data.profile);
            console.log(data.profile);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        LinkedIn Profile
      </h2>

      {!accessToken ? (
        <LinkedInLogin />
      ) : (
        <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <Image
              src={profile.picture || "/placeholder.svg"}
              alt="Avatar"
              className="w-16 h-16 rounded-full border-2 border-blue-500"
              width={64}
              height={64}
            />
            <div>
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedInPage;