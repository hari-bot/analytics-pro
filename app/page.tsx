import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Analytics Pro</h1>
      <p className="text-lg text-gray-700 mb-4">Choose a platform to explore:</p>

      <div className="flex space-x-4">
        <Link
          href="/bluesky"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Bluesky
        </Link>
        <Link
          href="/linkedin"
          className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 transition"
        >
          LinkedIn
        </Link>
        <Link
          href="/tiktok"
          className="px-6 py-3 bg-black text-white rounded-lg shadow-md hover:bg-gray-900 transition"
        >
          TikTok
        </Link>
      </div>
    </div>
  )
}

