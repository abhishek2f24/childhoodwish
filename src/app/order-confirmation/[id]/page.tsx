import Link from 'next/link';
import { CheckCircle, Share2, Package } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="pt-16 min-h-screen bg-cream flex items-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="font-fraunces text-4xl font-bold text-dark mb-3">
          Your wish is on its way! 🎁
        </h1>
        <p className="text-muted text-lg mb-2">Order #{id}</p>
        <p className="text-muted leading-relaxed mb-8">
          We've received your order and we're packing it with love and a handwritten note. You'll receive a tracking link via SMS within 24 hours.
        </p>

        {/* Handwritten Note Preview */}
        <div className="bg-cream-dark border border-cream-darker rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-3 right-3 text-xs text-muted font-medium bg-cream px-2 py-1 rounded-full">
            Coming in your box ✍️
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎁</span>
          </div>
          <p className="font-caveat text-2xl text-secondary italic mb-2">
            "I hope this brings back a memory worth keeping."
          </p>
          <p className="font-caveat text-lg text-dark">— Abhishek</p>
          <p className="text-xs text-muted mt-1">ChildhoodWish.in</p>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-3 bg-white rounded-2xl p-4 mb-8 shadow-card text-left">
          <Package className="w-8 h-8 text-primary flex-shrink-0" />
          <div>
            <div className="font-semibold text-dark">Expected delivery: 3–7 business days</div>
            <div className="text-sm text-muted">Tracking link will be sent to your phone and email</div>
          </div>
        </div>

        {/* Share / Memory Wall */}
        <div className="bg-secondary/5 border border-secondary/20 rounded-2xl p-6 mb-8">
          <h3 className="font-fraunces text-xl font-bold text-dark mb-2">Share your wish on the Memory Wall</h3>
          <p className="text-muted text-sm mb-4">Your experience could inspire someone else's wish to come true.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/?text=${encodeURIComponent('I just fulfilled a childhood wish! 🎁 childhoodwish.in')}`}
              target="_blank"
              rel="noopener noreferrer"
              id="order-whatsapp-share"
              className="flex items-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </a>
            <Link href="/memory-wall" id="order-memory-wall-cta" className="btn-outline">
              Add to Memory Wall
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-primary">
            Continue shopping
          </Link>
          <Link href="/" className="btn-ghost">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
