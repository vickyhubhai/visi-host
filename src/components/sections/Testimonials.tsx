'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';
import { TESTIMONIALS } from '@/lib/constants';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Customer Stories
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Loved by <span className="gradient-text">Developers</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Join thousands of satisfied developers who trust VisiHost for their critical infrastructure.
          </p>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group glass-card p-6 rounded-2xl hover:border-lime-500/20 transition-all duration-500"
            >
              <Quote className="w-8 h-8 text-lime-500/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm text-white/50 leading-relaxed mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center text-black text-xs font-bold shadow-lg shadow-lime-500/20">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-white/35">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
