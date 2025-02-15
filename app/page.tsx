import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#1c1f26] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Adrigo</h1>
          <p className="text-xl text-gray-300">Manage and analyze your social media presence</p>
        </div>

        <div className="bg-[#242830] rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold">Connected Platforms</h2>
          </div>
          
          <div className="divide-y divide-gray-700">
            {/* Bluesky Row */}
            <Link href="/bluesky" 
              className="flex items-center justify-between p-4 hover:bg-[#2d3139] transition">
              <div className="flex items-center space-x-4">
                <img 
                  src="/bluesky-logo.png" 
                  alt="Bluesky" 
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">Bluesky</h3>
                  <p className="text-gray-400 text-sm">Connect and analyze your Bluesky profile</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Not Connected</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* LinkedIn Row */}
            <Link href="/linkedin"
              className="flex items-center justify-between p-4 hover:bg-[#2d3139] transition">
              <div className="flex items-center space-x-4">
                <img 
                  src="/linkedin-logo.png" 
                  alt="LinkedIn" 
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">LinkedIn</h3>
                  <p className="text-gray-400 text-sm">Analyze your professional network</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Not Connected</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* TikTok Row */}
            <Link href="/tiktok"
              className="flex items-center justify-between p-4 hover:bg-[#2d3139] transition">
              <div className="flex items-center space-x-4">
                <img 
                  src="/tiktok-logo.png" 
                  alt="TikTok" 
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">TikTok</h3>
                  <p className="text-gray-400 text-sm">Track your TikTok performance</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">Not Connected</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

