'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Gift } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-cream overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              India's Nostalgia Gifting Company
            </div>

            <h1
              className="font-fraunces text-5xl sm:text-6xl lg:text-7xl font-bold text-dark leading-tight mb-6"
            >
              Your childhood wish,{' '}
              <span className="text-primary relative">
                finally fulfilled.
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 300 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6C50 2 100 1 150 2C200 3 250 5 298 6" stroke="#F5C842" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p
              className="text-muted text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
            >
              India's nostalgia gifting company. For every wish that waited — the RC helicopter, the geometry box, the marbles in the velvet pouch. All of it, finally yours.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/find-a-gift" id="hero-find-gift-btn" className="btn-primary text-base">
                Find Your Gift <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/gift-boxes" id="hero-gift-boxes-btn" className="btn-outline text-base">
                <Gift className="w-5 h-5" /> See Gift Boxes
              </Link>
            </div>

            {/* Trust Signals */}
            <div
              className="flex flex-wrap items-center gap-6 mt-10 pt-10 border-t border-cream-darker"
            >
              {[
                { emoji: '✍️', text: 'Handwritten note in every order' },
                { emoji: '📦', text: 'Shipped in 3–7 days' },
                { emoji: '❤️', text: '500+ wishes fulfilled' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-sm text-muted font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main card */}
              <div className="w-full h-full bg-gradient-to-br from-cream-dark to-cream-darker rounded-3xl overflow-hidden shadow-warm">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-12">
                    <div className="text-8xl mb-6 animate-float">🎁</div>
                    <div className="font-fraunces text-2xl text-dark font-bold mb-2">The 90s Kid Box</div>
                    <div className="text-muted text-sm mb-4">RC Helicopter • Kanchas • Yo-Yo • Geometry Box</div>
                    <div className="inline-block bg-primary text-white font-bold px-6 py-2 rounded-full text-lg">₹1,499</div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-card p-3 flex items-center gap-2">
                <span className="text-2xl">🚁</span>
                <div>
                  <div className="font-bold text-sm text-dark">RC Helicopter</div>
                  <div className="text-xs text-muted">384 people wished for this</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-card p-3 flex items-center gap-2">
                <span className="text-2xl">🔮</span>
                <div>
                  <div className="font-bold text-sm text-dark">Glass Marbles</div>
                  <div className="text-xs text-muted">512 memory wall mentions</div>
                </div>
              </div>
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-accent text-dark rounded-2xl shadow-card p-3">
                <div className="font-bold text-sm text-center">✍️ Every order</div>
                <div className="text-xs text-center">includes a note</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted to-transparent" />
      </motion.div>
    </section>
  );
}
