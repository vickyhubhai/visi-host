'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';
import { PRODUCTS } from '@/lib/constants';
import {
  Bot, Gamepad2, Server, HardDrive, Globe, Joystick,
  Music, Send, Database, Mic, Store, ArrowUpRight,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Bot, Gamepad2, Server, HardDrive, Globe, Joystick,
  Music, Send, Database, Mic, Store,
};

export default function Products() {
  const { ref, isInView } = useInView();

  return (
    <section id="products" ref={ref} className="relative section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Built for <span className="gradient-text">Every Workload</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            From Discord bots to game servers and enterprise VPS — deploy anything with blazing-fast infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {PRODUCTS.map((product, i) => {
            const Icon = ICON_MAP[product.icon] || Server;
            return (
              <motion.a
                key={product.slug}
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative glass-card-glow p-6 rounded-2xl cursor-pointer hover:translate-y-[-4px] hover:scale-[1.02] transition-all duration-500"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at 50% 0%, rgba(59,130,246,0.06), transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    style={{
                      boxShadow: `0 8px 20px -6px rgba(163,230,53,0.2)`,
                    }}
                  >
                    <Icon className="w-5.5 h-5.5 text-white" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-lime-400 transition-colors duration-200 flex items-center gap-2">
                    {product.name}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-y-0.5 group-hover:translate-y-0 transition-all duration-200" />
                  </h3>

                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
