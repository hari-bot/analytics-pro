"use client";

const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white my-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
          <p>When you use Analytics Pro, we collect:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Social media account information (through OAuth)</li>
            <li>Content analytics and statistics</li>
            <li>Usage data of our dashboard</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Provide analytics and insights about your TikTok content</li>
            <li>Improve our dashboard functionality</li>
            <li>Communicate important updates</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Storage</h2>
          <p>We store your TikTok access token and basic profile information locally in your browser. This data is only used to provide the dashboard functionality and is not shared with third parties.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Third-Party Services</h2>
          <p>We use TikTok's API services. Your use of the dashboard is also subject to TikTok's privacy policy and terms of service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
          <p>We implement security measures to protect your information. However, no internet transmission is completely secure, and we cannot guarantee the security of your data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Access your personal data</li>
            <li>Delete your account and data</li>
            <li>Opt-out of communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Updates to Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify users of any material changes via email or through the dashboard.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
          <p>If you have questions about this privacy policy, please contact us at ajwmy8@gmail.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage; 