'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function GiftBoxFeature() {
  return (
    <section className="bg-secondary py-20 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-accent text-sm font-semibold uppercase tracking-widest mb-4">Gift Boxes</div>
            <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              The perfect gift. Not because it's expensive.{' '}
              <span className="text-accent">Because it means something.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Every gift box is packed by hand, lined with tissue paper, sealed with our logo sticker, and includes a handwritten founder note. This is gifting done right.
            </p>

            {/* Box Lineup */}
            <div className="space-y-3 mb-8">
              {[
                { name: 'The 90s Kid Box', price: '₹1,499', emoji: '🚁', desc: 'Yo-Yo, Kanchas, RC Helicopter, Geometry Box' },
                { name: 'The Dreamer Box', price: '₹999', emoji: '🚗', desc: 'RC Car, Dart Board, Spinning Top' },
                { name: 'Build Your Wish Box', price: '₹1,299+', emoji: '✨', desc: 'You pick any 3 items from our collection' },
              ].map((box) => (
                <div key={box.name} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                  <span className="text-2xl">{box.emoji}</span>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{box.name}</div>
                    <div className="text-white/60 text-sm">{box.desc}</div>
                  </div>
                  <div className="text-accent font-bold">{box.price}</div>
                </div>
              ))}
            </div>

            <Link href="/gift-boxes" id="gift-box-feature-cta" className="btn-primary">
              Explore Gift Boxes <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Main box visual */}
              <div className="w-72 h-72 bg-cream rounded-3xl shadow-warm flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cream to-cream-dark" />
                <div className="relative text-center">
                  <div className="text-7xl mb-3 animate-float">📦</div>
                  <div className="font-caveat text-secondary text-xl font-bold">The 90s Kid Box</div>
                  <div className="text-muted text-sm mt-1">5 nostalgic items</div>
                </div>
              </div>

              {/* Floating items */}
              {['🚁', '🔮', '🪀', '📐'].map((emoji, i) => (
                <motion.div
                  key={emoji}
                  className="absolute w-12 h-12 bg-white rounded-full shadow-card flex items-center justify-center text-2xl"
                  style={{
                    top: `${[-20, 20, 70, 80][i] + 10}%`,
                    left: i % 2 === 0 ? '-15%' : 'auto',
                    right: i % 2 !== 0 ? '-15%' : 'auto',
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {emoji}
                </motion.div>
              ))}

              {/* Note card */}
              <div className="absolute -bottom-6 -right-6 bg-accent rounded-2xl p-3 rotate-6 shadow-card">
                <div className="font-caveat text-dark text-sm italic">Every box includes</div>
                <div className="font-bold text-dark text-sm">a handwritten note ✍️</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
