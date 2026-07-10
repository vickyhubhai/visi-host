'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';
import { FEATURES } from '@/lib/constants';
import {
  Zap, Cpu, ShieldCheck, Shield, Rocket, CloudUpload,
  Headphones, Globe, Terminal, Camera, Network, TrendingUp,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Zap, Cpu, ShieldCheck, Shield, Rocket, CloudUpload,
  Headphones, Globe, Terminal, Camera, Network, TrendingUp,
};

export default function Features() {
  const { ref, isInView } = useInView();

  return (
    <section id="features" ref={ref} className="relative section-padding overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-lime-500 opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Engineered for <span className="gradient-text">Performance</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Next-gen hardware meets intelligent automation. Every component optimized for speed, security, and reliability.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] || Zap;
            const isLarge = i === 0 || i === 3;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative glass-card p-7 rounded-2xl hover:border-lime-500/20 transition-all duration-500 ${
                  isLarge ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Mouse-follow glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 0%), rgba(163,230,53,0.04), transparent 40%)',
                  }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500/15 to-emerald-500/10 border border-lime-500/20 flex items-center justify-center mb-5 group-hover:border-lime-500/40 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-5.5 h-5.5 text-lime-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-lime-300 transition-colors duration-200">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-white/35 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
