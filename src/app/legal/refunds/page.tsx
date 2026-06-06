import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy — ChildhoodWish',
};

export default function RefundsPage() {
  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="bg-secondary py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="font-fraunces text-4xl font-bold text-white">Cancellation & Refund Policy</h1>
          <p className="text-white/60 mt-2">Last updated: June 2026</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 prose prose-lg max-w-none">
        <h2>1. Order Cancellation</h2>
        <ul>
          <li>Orders can be cancelled within <strong>2 hours of placing</strong> the order (before dispatch begins)</li>
          <li>To cancel: email hello@childhoodwish.in with your Order ID</li>
          <li>Once an order is dispatched, it cannot be cancelled</li>
          <li>If a cancellation is approved, a full refund is issued to your original payment method within 5–7 business days</li>
        </ul>

        <h2>2. Returns</h2>
        <ul>
          <li><strong>Return window:</strong> 7 days from the date of delivery</li>
          <li>Item must be unused and in original packaging</li>
          <li>To initiate a return: email hello@childhoodwish.in or WhatsApp us with your Order ID and reason for return</li>
          <li>We'll arrange a pickup at no additional cost for valid return requests</li>
        </ul>

        <h2>3. Refund Timeline</h2>
        <ul>
          <li>Once a return is received and inspected, we'll notify you via email</li>
          <li>Approved refunds are processed within <strong>5–7 business days</strong> to your original payment method</li>
          <li>UPI refunds: 1–3 business days</li>
          <li>Card refunds: 5–7 business days (depends on your bank)</li>
          <li>Wallet refunds: 1–3 business days</li>
        </ul>

        <h2>4. Damaged / Dead on Arrival (DOA) Products</h2>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 not-prose mb-4">
          <p className="font-semibold text-dark mb-2">📦 Our DOA policy: Simple, trustworthy, no hassle.</p>
          <p className="text-dark text-sm">We trust our customers. If something arrives broken, we fix it — no questions asked.</p>
        </div>
        <p>If your product arrives damaged or non-functional:</p>
        <ol>
          <li><strong>Photograph the item and its packaging</strong> within 24 hours of delivery</li>
          <li><strong>WhatsApp the photo</strong> to our support number with your Order ID</li>
          <li>We will dispatch a <strong>replacement within 3 business days</strong> OR issue a <strong>full refund</strong> — your choice</li>
          <li>You do <strong>NOT need to return the damaged item</strong> (reverse logistics costs more than the product is worth — we trust you)</li>
        </ol>

        <h2>5. Product-Specific DOA Coverage</h2>
        <ul>
          <li><strong>RC toys and electronics</strong> (RC Helicopter, RC Car, Bluetooth Speaker): 30-day DOA coverage</li>
          <li><strong>Glass items</strong> (Marble sets): If packaging arrived visibly crushed (photo required), replacement dispatched immediately</li>
          <li><strong>Other products:</strong> Standard 7-day return window applies</li>
        </ul>

        <h2>6. Non-Returnable Items</h2>
        <ul>
          <li>Customized or personalized products (Build Your Wish Box with custom engraving)</li>
          <li>Items returned without original packaging</li>
          <li>Items showing signs of use or damage caused after delivery</li>
        </ul>

        <h2>7. Exchange Policy</h2>
        <p>We currently offer replacements for damaged items only, not exchanges. If you'd like a different product, please return the original item and place a new order.</p>

        <h2>8. Contact</h2>
        <p>For any refund or return queries:</p>
        <ul>
          <li>Email: hello@childhoodwish.in</li>
          <li>WhatsApp: Available on every page (bottom-right button)</li>
          <li>Response time: Within 24 hours, usually faster</li>
        </ul>
      </div>
    </div>
  );
}
