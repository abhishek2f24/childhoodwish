'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function QuizCTASection() {
  return (
    <section className="py-20 overflow-hidden relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Icon */}
          <div className="text-6xl mb-6">🎯</div>

          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Not sure what to gift?
          </h2>
          <p className="font-caveat text-2xl text-white/90 mb-8">
            Answer 5 questions. Get the perfect nostalgia gift in 60 seconds.
          </p>
          <p className="text-white/70 text-base mb-10 max-w-lg mx-auto">
            People who complete the quiz find something they love. We promise it's more fun than browsing randomly.
          </p>

          <Link
            href="/find-a-gift"
            id="quiz-cta-btn"
            className="inline-flex items-center gap-3 bg-white text-primary font-bold text-lg px-8 py-4 rounded-2xl hover:bg-cream transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Take the Quiz <ArrowRight className="w-6 h-6" />
          </Link>

          <p className="text-white/50 text-sm mt-6">No signup required · Takes 60 seconds</p>
        </motion.div>
      </div>
    </section>
  );
}
