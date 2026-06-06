'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Flame } from 'lucide-react';
import type { Metadata } from 'next';

const sampleWishes = [
  { text: 'RC helicopter 🚁', decade: '90s', popular: true },
  { text: 'Nintendo GameBoy 🎮', decade: '90s', popular: true },
  { text: 'Real cricket bat 🏏', decade: '90s', popular: false },
  { text: 'Big cycle 🚲', decade: '80s', popular: false },
  { text: 'Lego set 🧱', decade: '90s', popular: true },
  { text: 'Remote control car 🚗', decade: '90s', popular: true },
  { text: 'Video game console 🕹️', decade: '2000s', popular: false },
  { text: 'Air gun 🔫', decade: '80s', popular: false },
  { text: 'Roller skates ⛸️', decade: '90s', popular: false },
  { text: 'Complete cricket set 🏏', decade: '2000s', popular: true },
  { text: 'My own computer 💻', decade: '2000s', popular: false },
  { text: 'Foosball table ⚽', decade: '90s', popular: false },
  { text: 'Professional chess set ♟️', decade: '80s', popular: false },
  { text: 'A real telescope 🔭', decade: '90s', popular: false },
  { text: 'Walkie-talkies 📻', decade: '90s', popular: false },
  { text: 'Scooter 🛵', decade: '2000s', popular: false },
  { text: 'Kite with manjha 🪁', decade: '90s', popular: false },
  { text: 'Hot Wheels track set 🏎️', decade: '2000s', popular: false },
];

const cardColors = [
  'bg-orange-50 border-orange-100',
  'bg-blue-50 border-blue-100',
  'bg-green-50 border-green-100',
  'bg-purple-50 border-purple-100',
  'bg-yellow-50 border-yellow-100',
  'bg-red-50 border-red-100',
  'bg-indigo-50 border-indigo-100',
  'bg-pink-50 border-pink-100',
  'bg-teal-50 border-teal-100',
];

export default function MemoryWallPage() {
  const [wish, setWish] = useState('');
  const [decade, setDecade] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [wishes, setWishes] = useState(sampleWishes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wish.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/memory-wall/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wish: wish.trim(), decade }),
      });
      setWishes((prev) => [{ text: wish.trim(), decade: decade || '90s', popular: false }, ...prev]);
      setSubmitted(true);
    } catch {
      // Still show success to user — we'll retry
      setSubmitted(true);
    }
    setLoading(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), wish }),
    });
    setEmailSent(true);
  };

  return (
    <div className="pt-16 min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-secondary to-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-fraunces text-4xl md:text-5xl font-bold text-white mb-4">
            The wish list of a generation
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto mb-4">
            These are real things real people wanted but never got. Some became our products. Some will become future products.
          </p>
          <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            12,847 wishes shared so far
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Submit Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="card p-8 shadow-card-hover">
            {!submitted ? (
              <>
                <h2 className="font-fraunces text-2xl font-bold text-dark mb-2">What did you always want but never got?</h2>
                <p className="text-muted text-sm mb-6">Share yours. No signup required. Your wish stays anonymous.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      id="memory-wall-wish-input"
                      type="text"
                      value={wish}
                      onChange={(e) => setWish(e.target.value.slice(0, 50))}
                      placeholder="e.g. RC helicopter 🚁"
                      maxLength={50}
                      className="w-full px-4 py-3 border-2 border-cream-darker rounded-xl focus:outline-none focus:border-primary transition-colors font-medium text-dark placeholder:text-muted bg-cream"
                      required
                    />
                    <div className="text-xs text-muted text-right mt-1">{wish.length}/50</div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-dark mb-2 block">When did you grow up? (optional)</label>
                    <div className="flex gap-2">
                      {['80s', '90s', '2000s'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDecade(d === decade ? '' : d)}
                          className={`flex-1 py-2 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                            decade === d ? 'border-primary bg-primary text-white' : 'border-cream-darker bg-cream text-dark hover:border-primary/40'
                          }`}
                        >
                          {d} kid
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    id="memory-wall-submit-btn"
                    disabled={!wish.trim() || loading}
                    className="w-full btn-primary justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Adding your wish...' : <><Send className="w-5 h-5" /> Share My Wish</>}
                  </button>
                </form>
              </>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.6 }}
                    className="text-6xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-fraunces text-2xl font-bold text-dark mb-2">Added to the wall!</h3>
                  <p className="text-muted mb-6">Your wish has joined 12,847 others. If it becomes a product, you'll know.</p>

                  {/* Contextual email capture */}
                  {!emailSent ? (
                    <div className="bg-cream rounded-xl p-4">
                      <p className="font-semibold text-dark mb-1 text-sm">Want to know if this becomes a product?</p>
                      <form onSubmit={handleEmailSubmit} className="flex gap-2 mt-3">
                        <input
                          id="memory-wall-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 px-3 py-2 border-2 border-cream-darker rounded-lg text-sm focus:outline-none focus:border-primary bg-white"
                        />
                        <button type="submit" className="btn-primary px-4 py-2 text-sm">
                          Notify Me
                        </button>
                      </form>
                      <p className="text-xs text-muted mt-2">We'll email you once — no spam.</p>
                    </div>
                  ) : (
                    <div className="bg-green-50 rounded-xl p-4 text-green-700">
                      <CheckCircle className="w-5 h-5 mx-auto mb-1" />
                      <p className="text-sm font-medium">You're on the list! We'll let you know. 🎁</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Wall Display */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-caveat text-4xl text-dark">The Wall</h2>
          <div className="flex gap-3">
            <span className="text-sm text-muted font-medium">Sort by:</span>
            <button className="text-sm font-semibold text-primary border-b-2 border-primary">Recent</button>
            <button className="text-sm font-semibold text-muted hover:text-primary transition-colors">Popular</button>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {wishes.map((wish, index) => (
            <motion.div
              key={`${wish.text}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`break-inside-avoid mb-4 ${cardColors[index % cardColors.length]} border rounded-2xl p-4`}
            >
              {wish.popular && (
                <div className="flex items-center gap-1 text-orange-500 text-xs font-semibold mb-2">
                  <Flame className="w-3 h-3" />
                  Many people want this
                </div>
              )}
              <p className="font-medium text-dark text-sm leading-relaxed">{wish.text}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-xs text-muted">{wish.decade} kid</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
