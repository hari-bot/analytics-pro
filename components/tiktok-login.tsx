"use client"

const TikTokLogin = () => {
  const TIKTOK_AUTH_URL = `https://www.tiktok.com/v2/auth/authorize?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}&response_type=code&scope=user.info.basic,user.info.stats,user.info.profile,video.list&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI!)}`;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-[#242830] rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="mb-6">
            <img 
              src="/tiktok-logo.png" 
              alt="TikTok" 
              className="w-16 h-16 mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your TikTok Account</h2>
          <p className="text-gray-400 mb-8">
            Link your TikTok account to analyze your performance and track engagement
          </p>
          <a
            href={TIKTOK_AUTH_URL}
            className="inline-flex items-center space-x-2 bg-[#fe2c55] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#ff3d67] transition-colors"
          >
            <span>Login with TikTok</span>
          </a>
        </div>
        <div className="bg-[#1c1f26] p-4 text-center">
          <p className="text-gray-400 text-sm">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default TikTokLogin; 