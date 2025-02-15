"use client"

import { useState } from "react"
import BlueskyPost from "./bluesky-post"

const BlueskyLogin = () => {
  const [handle, setHandle] = useState("")
  const [password, setPassword] = useState("")
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    try {
      const response = await fetch("https://bsky.social/xrpc/com.atproto.server.createSession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: handle, password }),
      })

      if (!response.ok) throw new Error("Invalid credentials")
      const data = await response.json()

      const profileRes = await fetch(`https://bsky.social/xrpc/app.bsky.actor.getProfile?actor=${data.did}`, {
        headers: { Authorization: `Bearer ${data.accessJwt}` },
      })

      if (!profileRes.ok) throw new Error("Failed to fetch profile")
      const profileData = await profileRes.json()
      setProfile(profileData)

      const postsRes = await fetch(`https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed?actor=${data.did}&limit=20`, {
        headers: { Authorization: `Bearer ${data.accessJwt}` },
      })

      if (!postsRes.ok) throw new Error("Failed to fetch posts")
      const postsData = await postsRes.json()
      console.log('Posts data:', postsData)
      setPosts(postsData.feed.map((item: any) => item.post) || [])

      setError(null)
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message)
      setProfile(null)
      setPosts([])
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      {!profile ? (
        <div className="bg-[#242830] rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 text-center">
            <div className="mb-6">
              <img 
                src="/bluesky-logo.png" 
                alt="Bluesky" 
                className="w-16 h-16 mx-auto"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Bluesky Account</h2>
            <p className="text-gray-400 mb-8">
              Link your Bluesky account to analyze your social presence and engagement
            </p>
            
            <div className="max-w-sm mx-auto space-y-4">
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Handle (e.g., @you.bsky.social)"
                className="w-full px-4 py-2 bg-[#1c1f26] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="App Password"
                className="w-full px-4 py-2 bg-[#1c1f26] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-[#0560ff] hover:bg-[#0351d4] text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Login with Bluesky
              </button>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
          </div>
          <div className="bg-[#1c1f26] p-4 text-center">
            <p className="text-gray-400 text-sm">
              By connecting, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-[#242830] rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-2 border-blue-500"
                />
              </div>
              <div className="flex-grow">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-white">{profile.displayName}</h2>
                  <p className="text-gray-400">@{profile.handle}</p>
                </div>
                {profile.description && (
                  <p className="text-gray-300 mb-4">{profile.description}</p>
                )}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-[#2d3139] p-3 rounded-lg">
                    <p className="text-2xl font-bold text-white">{profile.followersCount || 0}</p>
                    <p className="text-sm text-gray-400">Followers</p>
                  </div>
                  <div className="bg-[#2d3139] p-3 rounded-lg">
                    <p className="text-2xl font-bold text-white">{profile.followsCount || 0}</p>
                    <p className="text-sm text-gray-400">Following</p>
                  </div>
                  <div className="bg-[#2d3139] p-3 rounded-lg">
                    <p className="text-2xl font-bold text-white">{profile.postsCount || 0}</p>
                    <p className="text-sm text-gray-400">Posts</p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={() => {
                    setProfile(null)
                    setPosts([])
                  }}
                  className="text-red-500 hover:text-red-600 px-4 py-2 rounded-md border border-red-500 hover:border-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Posts Section */}
          <div className="bg-[#242830] rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              {posts.map((post, index) => (
                <BlueskyPost key={index} post={post} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default BlueskyLogin

