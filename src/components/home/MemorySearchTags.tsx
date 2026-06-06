'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const memoryTags = [
  { label: 'School Days', emoji: '✏️', href: '/shop?tag=school-days' },
  { label: 'Summer Vacations', emoji: '☀️', href: '/shop?tag=summer-vacation' },
  { label: 'Gully Cricket', emoji: '🏏', href: '/shop?tag=cricket' },
  { label: '90s Kid', emoji: '📼', href: '/shop?tag=90s-kid' },
  { label: 'Birthday Wishes', emoji: '🎂', href: '/shop?tag=birthday' },
  { label: 'Colony Games', emoji: '🏃', href: '/shop?tag=colony-games' },
  { label: 'Monsoon Fun', emoji: '🌧️', href: '/shop?tag=monsoon' },
  { label: 'Retro Vibes', emoji: '📻', href: '/shop?tag=retro' },
];

export function MemorySearchTags() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="font-fraunces text-3xl md:text-4xl font-bold text-dark mb-2">
            Browse by memory
          </h2>
          <p className="text-muted">What takes you back?</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {memoryTags.map((tag, index) => (
            <motion.div
              key={tag.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={tag.href}
                id={`memory-tag-${tag.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border-2 border-cream-darker text-dark font-medium hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm hover:shadow-warm"
              >
                <span>{tag.emoji}</span>
                <span>{tag.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
