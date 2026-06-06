'use client';

import { motion } from 'framer-motion';

const pillars = [
  {
    emoji: '🎁',
    title: 'Gifts with soul',
    description: 'Not generic. Every product has a memory attached to it — curated to make someone feel something real.',
  },
  {
    emoji: '🕰️',
    title: 'Nostalgia, curated',
    description: "Things that were hard to find, now in one place. Each item passes our emotional resonance test before it makes it to the shelf.",
  },
  {
    emoji: '💌',
    title: 'Packed with love',
    description: "Handwritten founder note in every order. Because the unboxing should feel as special as the wish coming true.",
  },
];

export function BrandStripSection() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center text-white"
            >
              <div className="text-5xl mb-4">{pillar.emoji}</div>
              <h3 className="font-fraunces text-2xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-white/80 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
