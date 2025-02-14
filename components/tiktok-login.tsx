"use client"

const TikTokLogin = () => {
  const TIKTOK_AUTH_URL = `https://www.tiktok.com/v2/auth/authorize?client_key=${process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY}&response_type=code&scope=user.info.basic,user.info.stats,user.info.profile&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI!)}`;

  return (
    <div className="flex justify-center items-center h-screen">
      <a
        href={TIKTOK_AUTH_URL}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Login with TikTok
      </a>
    </div>
  );
};

export default TikTokLogin; 