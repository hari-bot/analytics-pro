"use client";

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white my-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using Analytics Pro, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
          <p>Analytics Pro is a web application that provides analytics and insights for social media content creators. The service utilizes official APIs to fetch and display data.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. API Usage</h2>
          <p>This service uses various platform APIs but is not endorsed or certified by them. All trademarks displayed on this service are property of their respective owners.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. User Data and Privacy</h2>
          <p>We only store the data necessary for the functioning of the dashboard. For more information about how we handle your data, please refer to our Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Limitations of Liability</h2>
          <p>The dashboard is provided "as is" without any guarantees or warranty. In association with the service, we make no warranties of any kind, either express or implied.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of this agreement.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">7. Contact Information</h2>
          <p>For any questions regarding these terms, please contact us at ajwmy8@gmail.com</p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage; 