'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function Hero() {
  const headingWords = 'Premium Cloud Infrastructure Built For Developers'.split(' ');

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <div
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full opacity-[0.12] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(163,230,53,0.5) 0%, transparent 70%)',
            animation: 'aurora-drift 20s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full opacity-[0.10] blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.45) 0%, transparent 70%)',
            animation: 'aurora-drift 25s ease-in-out infinite alternate-reverse',
          }}
        />
        <div
          className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] rounded-full opacity-[0.06] blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
            animation: 'aurora-drift 22s ease-in-out infinite alternate',
            animationDelay: '-8s',
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Next-Gen Cloud Infrastructure
            </span>
          </motion.div>

          {/* Heading with word-by-word animation */}
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-[1.05] mb-8">
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-[0.3em] ${
                  ['Premium', 'Cloud', 'Infrastructure'].includes(word)
                    ? 'gradient-text-shimmer'
                    : 'text-white'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-lg sm:text-xl text-white/50 font-medium leading-relaxed max-w-2xl mx-auto mb-12"
          >
            {BRAND.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={`${BRAND.billingUrl}/register`}
              className="group btn-primary text-base px-8 py-4"
            >
              Get Started
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a href="#pricing" className="btn-secondary text-base px-8 py-4">
              <Play className="w-4 h-4" />
              View Pricing
            </a>
          </motion.div>

          {/* Floating dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 relative"
          >
            <div className="relative glass-card p-6 sm:p-8 rounded-3xl max-w-3xl mx-auto overflow-hidden">
              {/* Glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent" />
              
              {/* Dashboard mock */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'CPU Usage', value: '23%', color: 'from-lime-500 to-emerald-500' },
                  { label: 'Memory', value: '4.2 GB', color: 'from-emerald-500 to-teal-500' },
                  { label: 'Bandwidth', value: '1.8 TB', color: 'from-teal-500 to-cyan-500' },
                  { label: 'Storage', value: '120 GB', color: 'from-cyan-500 to-lime-500' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                    className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.04]"
                  >
                    <p className="text-xs text-white/40 mb-2">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${30 + Math.random() * 50}%` }}
                        transition={{ delay: 2 + i * 0.1, duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Live network animation */}
              <div className="mt-6 h-24 sm:h-32 bg-white/[0.02] rounded-2xl border border-white/[0.04] flex items-center justify-center overflow-hidden relative">
                <svg className="w-full h-full absolute inset-0" viewBox="0 0 800 120" preserveAspectRatio="none">
                  <motion.path
                    d="M0,60 Q100,20 200,50 T400,40 T600,55 T800,30"
                    fill="none"
                    stroke="rgba(163,230,53,0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2.2, duration: 1.5, ease: 'easeInOut' }}
                  />
                  <motion.path
                    d="M0,80 Q150,50 300,70 T600,45 T800,65"
                    fill="none"
                    stroke="rgba(16,185,129,0.2)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2.5, duration: 1.5, ease: 'easeInOut' }}
                  />
                </svg>
                <span className="relative text-xs text-white/30 font-mono">Network Activity — Live</span>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 sm:right-8 w-16 h-16 glass rounded-2xl flex items-center justify-center animate-float shadow-lg shadow-lime-500/10 hidden sm:flex">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="absolute -bottom-4 -left-4 sm:left-12 w-14 h-14 glass rounded-2xl flex items-center justify-center animate-float-slow shadow-lg shadow-emerald-500/10 hidden sm:flex" style={{ animationDelay: '-3s' }}>
              <span className="text-xl">⚡</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000d01] to-transparent pointer-events-none" />
    </section>
  );
}
