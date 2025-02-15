"use client"

const LinkedInLogin = () => {
  const LINKEDIN_AUTH_URL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI!)}&scope=openid%20profile%20w_member_social%20email`;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-[#242830] rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="mb-6">
            <img 
              src="/linkedin-logo.png" 
              alt="LinkedIn" 
              className="w-16 h-16 mx-auto"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your LinkedIn Account</h2>
          <p className="text-gray-400 mb-8">
            Link your LinkedIn account to analyze your professional network and engagement
          </p>
          <a
            href={LINKEDIN_AUTH_URL}
            className="inline-flex items-center space-x-2 bg-[#0a66c2] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#004182] transition-colors"
          >
            <span>Login with LinkedIn</span>
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

export default LinkedInLogin;
