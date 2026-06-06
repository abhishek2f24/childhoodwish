'use client';

import { motion } from 'framer-motion';

export function FounderStorySection() {
  return (
    <section className="bg-secondary py-20 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Quote — takes more space */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="text-6xl text-accent/30 font-serif leading-none mb-4">"</div>
            <blockquote className="font-caveat text-2xl sm:text-3xl lg:text-4xl text-white leading-relaxed space-y-4">
              <p>
                When I was 10, I wanted an RC helicopter. I used to stop at the toy store every day after school and look at it through the glass. We couldn't afford it.
              </p>
              <p>
                Twenty years later, I bought one for myself. I sat on the floor and flew it around my apartment for an hour.
              </p>
              <p className="text-accent font-bold">
                That feeling became ChildhoodWish.
              </p>
              <p>
                Every product here was something someone like you always wanted. We're just making sure the wish finally comes true.
              </p>
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-px bg-accent/50" />
              <span className="text-white/80 font-medium">— Abhishek, Founder</span>
            </div>
          </motion.div>

          {/* Founder Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative">
              {/* Founder avatar / placeholder */}
              <div className="w-64 h-80 rounded-3xl bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-7xl mb-4">👨‍💻</div>
                  <div className="font-fraunces text-white text-xl font-bold">Abhishek</div>
                  <div className="text-white/60 text-sm mt-1">Founder, ChildhoodWish</div>
                  <div className="text-white/40 text-xs mt-1">Vadodara, Gujarat</div>
                </div>
              </div>
              {/* Note card overlay */}
              <div className="absolute -bottom-6 -right-6 bg-cream rounded-2xl p-4 shadow-warm max-w-48 rotate-3">
                <p className="font-caveat text-dark text-sm italic">"I hope this brings back a memory worth keeping."</p>
                <p className="font-caveat text-primary text-sm font-bold mt-1">— Abhishek</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
