import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — ChildhoodWish',
};

export default function TermsPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="bg-secondary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-fraunces text-4xl font-bold text-white">Terms & Conditions</h1>
          <p className="text-white/60 mt-2">Last updated: June 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-lg max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using ChildhoodWish.in, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website.</p>

        <h2>2. Age Eligibility</h2>
        <p>You must be 18 years or older to make purchases on ChildhoodWish.in. By placing an order, you confirm that you are at least 18 years of age.</p>

        <h2>3. Products & Descriptions</h2>
        <p>We make every effort to accurately describe our products. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. Colors may vary slightly due to photography. We reserve the right to correct any errors and to cancel orders placed based on incorrect information.</p>

        <h2>4. Payment Terms</h2>
        <p>Full payment is required before we dispatch any order. Payments are processed securely via Razorpay. We accept UPI, credit/debit cards, net banking, and supported digital wallets. By completing payment, you confirm the accuracy of your order details.</p>

        <h2>5. Order Cancellation</h2>
        <p>Orders may be cancelled within 2 hours of placement by emailing hello@childhoodwish.in with your Order ID. After 2 hours or once dispatched, cancellation is not possible. Please refer to our Refund Policy for post-dispatch options.</p>

        <h2>6. Intellectual Property</h2>
        <p>All content on ChildhoodWish.in — including text, images, logos, product descriptions, and design — is the intellectual property of ChildhoodWish and may not be reproduced, distributed, or used without prior written permission.</p>

        <h2>7. Limitation of Liability</h2>
        <p>ChildhoodWish shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability shall not exceed the amount paid for the specific product in question.</p>

        <h2>8. Governing Law</h2>
        <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Vadodara, Gujarat.</p>

        <h2>9. Changes to Terms</h2>
        <p>We reserve the right to update these Terms at any time. Continued use of the website after changes constitutes acceptance of the revised Terms.</p>

        <h2>10. Contact</h2>
        <p>For questions about these Terms, email us at hello@childhoodwish.in.</p>
      </div>
    </div>
  );
}
