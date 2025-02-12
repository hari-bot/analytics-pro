"use client"

const LinkedInLogin = () => {
  const LINKEDIN_AUTH_URL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!)}&scope=openid%20profile%20w_member_social%20email`;

  return (
    <div className="flex justify-center items-center h-screen">
      <a
        href={LINKEDIN_AUTH_URL}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Login with LinkedIn
      </a>
    </div>
  );
};

export default LinkedInLogin;
