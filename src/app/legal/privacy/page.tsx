import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — ChildhoodWish',
};

export default function PrivacyPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="bg-secondary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-fraunces text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-white/60 mt-2">Last updated: June 2026 · DPDP Act 2023 compliant</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-lg max-w-none">
        <h2>1. What We Collect</h2>
        <p>We collect the following personal information when you use ChildhoodWish.in:</p>
        <ul>
          <li><strong>Identity data:</strong> Name, date of birth (if provided)</li>
          <li><strong>Contact data:</strong> Email address, phone number</li>
          <li><strong>Delivery data:</strong> Shipping address (house number, street, city, state, pincode)</li>
          <li><strong>Transaction data:</strong> Order details, amounts paid. Note: We do not store full payment card details — these are handled by Razorpay</li>
          <li><strong>Usage data:</strong> Pages visited, referring URLs (via Vercel Analytics — no personal data)</li>
          <li><strong>Memory Wall data:</strong> Wishes submitted (stored anonymously — no name attached)</li>
          <li><strong>Waitlist/email data:</strong> Email address if you opt in via the Memory Wall or product waitlist</li>
        </ul>

        <h2>2. How We Use Your Data</h2>
        <ul>
          <li>To process and fulfill your orders</li>
          <li>To send order confirmation and tracking emails via Resend</li>
          <li>To send waitlist/product launch emails (only if you opted in)</li>
          <li>To improve our website and product catalog</li>
          <li>To contact you regarding your order if needed</li>
        </ul>
        <p>We do not use your data for advertising, profiling, or sell it to any third party.</p>

        <h2>3. Data Storage</h2>
        <p>Order and customer data is stored in Supabase (PostgreSQL database, India/Singapore region). Memory Wall submissions are stored in Vercel KV (Redis, US region) and archived to Supabase. Payment data is handled and stored by Razorpay — please refer to <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">Razorpay's Privacy Policy</a>.</p>

        <h2>4. Third-Party Services</h2>
        <ul>
          <li><strong>Razorpay:</strong> Payment processing. They handle all payment data securely.</li>
          <li><strong>Resend:</strong> Email delivery service.</li>
          <li><strong>Shiprocket:</strong> Logistics partner. Your delivery address is shared with them to ship your order.</li>
          <li><strong>Vercel Analytics:</strong> Website usage analytics (no personal data collected).</li>
        </ul>

        <h2>5. Your Rights (DPDP Act 2023)</h2>
        <p>Under the Digital Personal Data Protection Act 2023, you have the right to:</p>
        <ul>
          <li>Access your personal data we hold</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for email communications</li>
        </ul>
        <p>To exercise any of these rights, email us at: <strong>hello@childhoodwish.in</strong></p>

        <h2>6. Cookies</h2>
        <p>We use only essential cookies required for the website to function (cart session) and Vercel Analytics (anonymized, no personal data). We do not use advertising or tracking cookies.</p>

        <h2>7. Data Retention</h2>
        <p>Order data is retained for 7 years for accounting purposes. Waitlist email data is retained until you unsubscribe. Memory Wall submissions are stored indefinitely (anonymously).</p>

        <h2>8. Contact</h2>
        <p>For any privacy concerns, email: hello@childhoodwish.in</p>
        <p>ChildhoodWish.in, Vadodara, Gujarat, India.</p>
      </div>
    </div>
  );
}
