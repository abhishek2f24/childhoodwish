'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const sampleWishes = [
  { text: 'RC helicopter 🚁', decade: '90s', color: 'bg-orange-50 border-orange-100' },
  { text: 'Nintendo GameBoy 🎮', decade: '90s', color: 'bg-blue-50 border-blue-100' },
  { text: 'Real cricket bat 🏏', decade: '90s', color: 'bg-green-50 border-green-100' },
  { text: 'Big cycle 🚲', decade: '80s', color: 'bg-purple-50 border-purple-100' },
  { text: 'Lego set 🧱', decade: '90s', color: 'bg-yellow-50 border-yellow-100' },
  { text: 'Remote control car 🚗', decade: '90s', color: 'bg-red-50 border-red-100' },
  { text: 'Video game console 🕹️', decade: '2000s', color: 'bg-indigo-50 border-indigo-100' },
  { text: 'Roller skates ⛸️', decade: '90s', color: 'bg-pink-50 border-pink-100' },
  { text: 'My own computer 💻', decade: '2000s', color: 'bg-teal-50 border-teal-100' },
  { text: 'Foosball table ⚽', decade: '90s', color: 'bg-amber-50 border-amber-100' },
  { text: 'Real telescope 🔭', decade: '90s', color: 'bg-sky-50 border-sky-100' },
  { text: 'Walkie-talkies 📻', decade: '90s', color: 'bg-lime-50 border-lime-100' },
];

export function MemoryWallPreview() {
  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-caveat text-5xl md:text-6xl text-dark mb-3">
            What did you never get?
          </h2>
          <p className="text-muted text-lg">
            8,432 people have told us their wish. Here are some of them.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {sampleWishes.map((wish, index) => (
            <motion.div
              key={wish.text}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`break-inside-avoid mb-4 ${wish.color} border rounded-2xl p-4 hover:shadow-card transition-shadow duration-200`}
            >
              <p className="font-medium text-dark text-sm leading-relaxed">{wish.text}</p>
              <div className="mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-xs text-muted">{wish.decade} kid</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/memory-wall" id="memory-wall-preview-cta" className="btn-secondary inline-flex">
            Share yours <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
