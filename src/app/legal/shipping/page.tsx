import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy — ChildhoodWish',
};

export default function ShippingPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="bg-secondary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-fraunces text-4xl font-bold text-white">Shipping & Delivery Policy</h1>
          <p className="text-white/60 mt-2">Last updated: June 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-lg max-w-none">
        <h2>1. Shipping Partner</h2>
        <p>We ship all orders via <strong>Shiprocket</strong>, which aggregates multiple courier partners including Delhivery, Ekart, Xpressbees, and BlueDart. The courier assigned to your order is automatically selected for the fastest and most cost-effective route to your pin code.</p>

        <h2>2. Delivery Timelines</h2>
        <ul>
          <li><strong>Metro cities</strong> (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata): 3–5 business days</li>
          <li><strong>Tier-2 & Tier-3 cities:</strong> 5–7 business days</li>
          <li><strong>Remote/rural areas:</strong> 7–10 business days</li>
        </ul>
        <p>Business days exclude Sundays and public holidays. Orders placed before 12 PM IST are typically dispatched same day.</p>

        <h2>3. Shipping Charges</h2>
        <ul>
          <li><strong>Free shipping</strong> on all orders above ₹799</li>
          <li><strong>₹79 flat shipping fee</strong> on orders below ₹799</li>
        </ul>

        <h2>4. Order Tracking</h2>
        <p>Once your order is dispatched, you will receive:</p>
        <ul>
          <li>An SMS with your tracking number and courier partner name</li>
          <li>An email with a tracking link</li>
        </ul>
        <p>You can also track your order on the courier's website or via Shiprocket's branded tracking page.</p>

        <h2>5. Delivery Estimate on Product Page</h2>
        <p>You can check the estimated delivery date for your pincode on any product page by entering your pincode in the delivery estimator. This estimate is powered by the Shiprocket API and reflects real-time courier availability.</p>

        <h2>6. Delivery Restrictions</h2>
        <ul>
          <li>We currently ship within India only</li>
          <li>We do not deliver to P.O. Boxes</li>
          <li>Some remote pincodes may not be serviceable — you will be notified before payment if your area is unavailable</li>
        </ul>

        <h2>7. Cash on Delivery (COD)</h2>
        <p>COD is available on select pincodes, subject to Shiprocket's COD serviceability. COD orders may have an additional handling fee of ₹30.</p>

        <h2>8. Failed Delivery Attempts</h2>
        <p>If a delivery attempt fails, the courier will make up to 2 additional attempts. If all attempts fail, the package is returned to us. In this case, contact us at hello@childhoodwish.in to arrange re-delivery (re-delivery shipping charges apply).</p>

        <h2>9. Contact</h2>
        <p>For shipping queries: hello@childhoodwish.in or WhatsApp us.</p>
      </div>
    </div>
  );
}
