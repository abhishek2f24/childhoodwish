import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { getGiftBoxes } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Gift Boxes — Curated Nostalgia Gift Sets',
  description: 'Curated nostalgia gift boxes for every 90s kid. The 90s Kid Box, The Dreamer Box, and Build Your Wish Box. Every box includes a handwritten founder note.',
};

export default async function GiftBoxesPage() {
  const giftBoxes = await getGiftBoxes();

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-secondary to-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl mb-4">🎁</div>
          <h1 className="font-fraunces text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Gift Boxes
          </h1>
          <p className="font-caveat text-2xl text-accent italic mb-4">
            "Not because it's expensive. Because it means something."
          </p>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Every box is packed by hand, lined with tissue paper, sealed with our sticker, and includes a handwritten founder note. This is how gifting should feel.
          </p>
        </div>
      </div>

      {/* What's Always Included */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-dark">
            {['✍️ Handwritten founder note', '📦 Kraft gift box', '🎀 Tissue paper & fill', '🏷️ ChildhoodWish sticker seal'].map((item) => (
              <span key={item} className="flex items-center gap-2">{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Gift Boxes Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {giftBoxes.map((box, index) => (
            <div key={box.id} className={`card overflow-hidden group ${index === 0 ? 'md:col-span-1 ring-2 ring-primary' : ''}`}>
              {index === 0 && (
                <div className="bg-primary text-white text-xs font-bold py-2 text-center tracking-widest uppercase">
                  ⭐ Most Popular
                </div>
              )}
              {/* Visual */}
              <div className="aspect-video bg-gradient-to-br from-cream to-cream-dark flex items-center justify-center relative overflow-hidden">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {box.slug === 'the-90s-kid-box' ? '🚁' : box.slug === 'the-dreamer-box' ? '🚗' : '✨'}
                </span>
                {box.slug === 'build-your-wish-box' && (
                  <div className="absolute top-3 left-3 bg-accent text-dark text-xs font-bold px-2 py-1 rounded-full">
                    Custom
                  </div>
                )}
              </div>

              <div className="p-6">
                <h2 className="font-fraunces text-2xl font-bold text-dark mb-2">{box.name}</h2>
                <p className="font-caveat text-secondary italic text-base mb-4 line-clamp-2">{box.memoryHook}</p>

                {/* Contents */}
                {box.giftBoxContents && (
                  <ul className="space-y-1.5 mb-6">
                    {box.giftBoxContents.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-dark">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-2xl text-dark">{formatPrice(box.price)}</span>
                    {box.slug === 'build-your-wish-box' && (
                      <span className="text-sm text-muted ml-1">minimum</span>
                    )}
                    {box.originalPrice && (
                      <span className="text-sm text-muted line-through ml-2">{formatPrice(box.originalPrice)}</span>
                    )}
                  </div>
                  <Link
                    href={`/gift-boxes/${box.slug}`}
                    id={`gift-box-cta-${box.id}`}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                  >
                    {box.slug === 'build-your-wish-box' ? 'Build yours' : 'Gift this'} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="mt-16 bg-secondary/5 border border-secondary/20 rounded-3xl p-8 text-center">
          <div className="text-4xl mb-3">💌</div>
          <h3 className="font-fraunces text-2xl font-bold text-dark mb-2">Every box includes a personal note</h3>
          <p className="text-muted max-w-xl mx-auto">
            "I hope this brings back a memory worth keeping." — Abhishek. Your personal message is printed on the reverse side.
          </p>
        </div>
      </div>
    </div>
  );
}
