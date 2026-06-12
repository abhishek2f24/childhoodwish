'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { isOnlinePaymentConfigured, WHATSAPP_NUMBER } from '@/lib/site';
import { Shield, Package, Banknote, CreditCard, MessageCircle } from 'lucide-react';
import { TrustSignals } from '@/components/ui/TrustSignals';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const ONLINE_AVAILABLE = isOnlinePaymentConfigured();

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>(
    ONLINE_AVAILABLE ? 'online' : 'cod'
  );
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    personalNote: '',
  });
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    try {
      sendGAEvent('event', 'begin_checkout', { currency: 'INR', value: total });
    } catch {
      // analytics must never break checkout
    }
    // fire once per checkout visit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePincodeChange = async (pincode: string) => {
    setForm((f) => ({ ...f, pincode }));
    if (pincode.length === 6) {
      // Simulate delivery estimate
      const metro = ['400001', '110001', '560001', '600001'];
      const isMetro = metro.some((m) => pincode.startsWith(m.slice(0, 3)));
      const days = isMetro ? '3–5' : '5–7';
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + (isMetro ? 4 : 6));
      setEstimatedDelivery(`Estimated delivery: ${days} business days (by ${deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })})`);
    }
  };

  const grandTotal = total + (total < 799 ? 79 : 0);

  const whatsappOrderHref = () => {
    const lines = items.map(
      (i) => `• ${i.product.name} ×${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`
    );
    const addr = form.address
      ? `\nDeliver to: ${form.name}, ${form.address}, ${form.city}, ${form.state} ${form.pincode}`
      : '';
    const msg = `Hi! I'd like to order from ChildhoodWish:\n${lines.join('\n')}\nTotal: ${formatPrice(grandTotal)}${addr}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const placeCodOrder = async () => {
    const res = await fetch('/api/orders/cod', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: form,
        items: items.map((i) => ({
          product: { id: i.product.id },
          quantity: i.quantity,
          giftWrapping: !!i.giftWrapping,
        })),
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Could not place order');
    }
    try {
      sendGAEvent('event', 'purchase', {
        transaction_id: data.orderId,
        currency: 'INR',
        value: data.total,
        payment_type: 'cod',
      });
    } catch {
      // analytics must never break checkout
    }
    clearCart();
    router.push(`/order-confirmation/${data.orderId}?m=cod&amt=${data.total}`);
  };

  const payOnline = async () => {
    // Create Razorpay order (amount is computed server-side)
    const res = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: grandTotal * 100,
        customer: form,
        items: items.map((i) => ({
          product: { id: i.product.id },
          quantity: i.quantity,
          giftWrapping: !!i.giftWrapping,
        })),
      }),
    });
    const data = await res.json();

    if (!res.ok || !data.orderId) {
      throw new Error(data.error || 'Could not create order');
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);

    script.onload = () => {
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'ChildhoodWish',
        description: 'Nostalgia gift order',
        order_id: data.orderId,
        prefill: { name: form.name, email: form.email, contact: form.phone },
        theme: { color: '#E8532A' },
        handler: async (response: any) => {
          // Verify payment
          const verifyRes = await fetch('/api/orders/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customer: form,
              items,
              total: grandTotal,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            try {
              sendGAEvent('event', 'purchase', {
                transaction_id: verifyData.orderId,
                currency: 'INR',
                value: grandTotal,
                payment_type: 'online',
              });
            } catch {
              // analytics must never break checkout
            }
            clearCart();
            router.push(`/order-confirmation/${verifyData.orderId}`);
          }
        },
      });
      rzp.open();
    };
    script.onerror = () => {
      setError('Could not load the payment window. Please try Cash on Delivery.');
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    if (!/^\d{6}$/.test(form.pincode)) {
      setError('Please enter a valid 6-digit pincode.');
      return;
    }
    if (form.phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      if (paymentMethod === 'cod') {
        await placeCodOrder();
      } else {
        await payOnline();
      }
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error && err.message
          ? err.message
          : 'Something went wrong. Please try again or order via WhatsApp below.'
      );
    }
    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4">🛒</div>
          <h1 className="font-fraunces text-3xl font-bold text-dark mb-3">Nothing to checkout</h1>
          <a href="/shop" className="btn-primary">Shop now</a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="font-fraunces text-4xl font-bold text-dark mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Delivery Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <h2 className="font-fraunces text-xl font-bold text-dark mb-6">Delivery Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name', col: 2 },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', col: 1 },
                    { id: 'phone', label: 'Phone', type: 'tel', placeholder: '10-digit mobile number', col: 1 },
                    { id: 'address', label: 'Address', type: 'text', placeholder: 'House no., Street, Area', col: 2 },
                    { id: 'city', label: 'City', type: 'text', placeholder: 'City', col: 1 },
                    { id: 'state', label: 'State', type: 'text', placeholder: 'State', col: 1 },
                  ].map((field) => (
                    <div key={field.id} className={field.col === 2 ? 'col-span-2' : 'col-span-1'}>
                      <label htmlFor={`checkout-${field.id}`} className="block text-sm font-semibold text-dark mb-1.5">{field.label}</label>
                      <input
                        id={`checkout-${field.id}`}
                        type={field.type}
                        value={(form as any)[field.id]}
                        onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                        placeholder={field.placeholder}
                        required
                        className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors text-dark bg-cream placeholder:text-muted"
                      />
                    </div>
                  ))}

                  {/* Pincode with delivery estimate */}
                  <div className="col-span-2">
                    <label htmlFor="checkout-pincode" className="block text-sm font-semibold text-dark mb-1.5">Pincode</label>
                    <input
                      id="checkout-pincode"
                      type="text"
                      value={form.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit pincode"
                      maxLength={6}
                      required
                      className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors text-dark bg-cream"
                    />
                    {estimatedDelivery && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-green-600 font-medium">
                        <Package className="w-4 h-4" />
                        {estimatedDelivery}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="card p-6">
                <h2 className="font-fraunces text-xl font-bold text-dark mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <button
                    type="button"
                    id="checkout-method-cod"
                    onClick={() => setPaymentMethod('cod')}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-primary bg-primary/5'
                        : 'border-cream-darker hover:border-primary/40'
                    }`}
                  >
                    <Banknote className="w-6 h-6 text-primary flex-shrink-0" />
                    <span>
                      <span className="block font-semibold text-dark">Cash on Delivery</span>
                      <span className="block text-sm text-muted">Pay in cash or UPI when your gift arrives. No advance payment.</span>
                    </span>
                  </button>

                  {ONLINE_AVAILABLE ? (
                    <button
                      type="button"
                      id="checkout-method-online"
                      onClick={() => setPaymentMethod('online')}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-colors ${
                        paymentMethod === 'online'
                          ? 'border-primary bg-primary/5'
                          : 'border-cream-darker hover:border-primary/40'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-primary flex-shrink-0" />
                      <span>
                        <span className="block font-semibold text-dark">Pay Online</span>
                        <span className="block text-sm text-muted">UPI, cards & wallets — secured by Razorpay.</span>
                      </span>
                    </button>
                  ) : (
                    <div className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-cream-darker opacity-60">
                      <CreditCard className="w-6 h-6 text-muted flex-shrink-0" />
                      <span>
                        <span className="block font-semibold text-muted">Pay Online (UPI / Cards)</span>
                        <span className="block text-sm text-muted">Coming soon — use Cash on Delivery for now.</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Note */}
              <div className="card p-6">
                <h2 className="font-fraunces text-xl font-bold text-dark mb-2">Add a memory note (optional)</h2>
                <p className="text-muted text-sm mb-4">This message will be printed on the gift card inside your box.</p>
                <textarea
                  id="checkout-personal-note"
                  value={form.personalNote}
                  onChange={(e) => setForm((f) => ({ ...f, personalNote: e.target.value }))}
                  placeholder="e.g. 'Happy birthday! This is the RC car you always wanted...'"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors text-dark bg-cream resize-none placeholder:text-muted"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="font-fraunces text-xl font-bold text-dark mb-4">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-dark line-clamp-1 flex-1">{item.product.name} ×{item.quantity}</span>
                      <span className="text-dark font-medium ml-2 flex-shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-cream-darker pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Shipping</span>
                    <span className={total >= 799 ? 'text-green-600 font-medium' : 'font-medium'}>
                      {total >= 799 ? 'FREE' : '₹79'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-cream-darker pt-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-dark">Total</span>
                    <span className="font-bold text-2xl text-dark">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  id="checkout-pay-btn"
                  disabled={loading}
                  className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? 'Placing order...'
                    : paymentMethod === 'cod'
                      ? `Place Order — ${formatPrice(grandTotal)} on delivery`
                      : `Pay ${formatPrice(grandTotal)}`}
                </button>

                <a
                  href={whatsappOrderHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="checkout-whatsapp-order"
                  className="mt-3 w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp instead
                </a>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{ONLINE_AVAILABLE ? 'Secured by Razorpay • UPI, Cards, COD' : 'Cash on Delivery across India'}</span>
                </div>

                <TrustSignals />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
