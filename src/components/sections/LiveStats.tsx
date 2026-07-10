'use client';

import { motion } from 'framer-motion';
import { useInView, useAnimatedCounter } from '@/hooks/useAnimations';
import { STATS } from '@/lib/constants';
import { Server, Users, Rocket, Shield, MessageSquare, Globe } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Server, Users, Rocket, Shield, MessageSquare, Globe,
};

function StatCard({ stat, index }: { stat: (typeof STATS)[number]; index: number }) {
  const { ref, isInView } = useInView();
  const count = useAnimatedCounter(
    stat.value,
    2000 + index * 200,
    isInView
  );
  const Icon = ICON_MAP[stat.icon] || Server;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group text-center p-6 sm:p-8"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-500/10 to-emerald-500/10 border border-lime-500/20 mb-4 group-hover:border-lime-500/40 transition-colors duration-300">
        <Icon className="w-5 h-5 text-lime-400" />
      </div>
      <div className="text-3xl sm:text-4xl font-black text-white mb-2 tabular-nums">
        {stat.value % 1 !== 0
          ? (count / 100).toFixed(2)
          : count.toLocaleString()}
        <span className="text-lime-400">{stat.suffix}</span>
      </div>
      <p className="text-sm text-white/40 font-medium">{stat.label}</p>
    </motion.div>
  );
}

export default function LiveStats() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-500/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Live Platform Statistics
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Our infrastructure powers thousands of projects worldwide with enterprise-grade reliability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden border border-white/[0.06]">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#05070A] hover:bg-white/[0.02] transition-colors duration-300"
            >
              <StatCard stat={stat} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
