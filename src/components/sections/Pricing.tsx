'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';
import { ScrapedPlan } from '@/lib/pricing';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { key: 'discord-bot', label: 'Discord Bot' },
  { key: 'minecraft-java', label: 'Minecraft Java' },
  { key: 'minecraft-bedrock', label: 'Minecraft Bedrock' },
  { key: 'vps', label: 'VPS Servers' },
  { key: 'dedicated', label: 'Dedicated' },
  { key: 'lavalink', label: 'Lavalink' },
];

export default function Pricing() {
  const { ref, isInView } = useInView();
  const [activeTab, setActiveTab] = useState('discord-bot');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [plans, setPlans] = useState<ScrapedPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/pricing?category=${activeTab}`);
        const data = await res.json();
        if (data.success && data.plans) {
          setPlans(data.plans);
        }
      } catch (err) {
        console.error('Failed to load plans:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlans();
  }, [activeTab]);

  const getPrice = (basePrice: string) => {
    // If price text does not contain digits, return as is
    const match = basePrice.match(/([^\d]*)([\d,.]+)/);
    if (!match) return basePrice;

    const symbol = match[1];
    const rawVal = parseFloat(match[2].replace(/,/g, ''));

    if (billingPeriod === 'yearly') {
      // Apply 20% discount for yearly
      const discountedVal = Math.floor(rawVal * 12 * 0.8);
      return `${symbol}${discountedVal}`;
    }
    return `${symbol}${Math.floor(rawVal)}`;
  };

  return (
    <section id="pricing" ref={ref} className="relative section-padding overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-lime-500 opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-emerald-500 opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Pricing Options
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Dynamic, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Synced automatically with our billing panel. Get the resources you need without lock-ins.
          </p>
        </motion.div>

        {/* Controls: Category Tabs + Billing Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white/[0.03] border border-white/[0.06] p-1.5 rounded-2xl w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === cat.key
                    ? 'bg-lime-500 text-black shadow-lg shadow-lime-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] p-1 rounded-full">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-black'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`relative px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-black'
                  : 'text-white/55 hover:text-white'
              }`}
            >
              Yearly
              <span className="absolute -top-3 -right-2 bg-lime-500 text-black text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-[#000d01] uppercase tracking-wide">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-10 h-10 rounded-full border-2 border-lime-500/20 border-t-lime-500 animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {plans.map((plan, i) => {
                  const isPopular = i === 1; // Middle card highlight
                  return (
                    <div
                      key={plan.name}
                      className={`relative glass-card p-8 rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.01] ${
                        isPopular
                          ? 'border-lime-500/30 bg-gradient-to-b from-lime-500/[0.04] to-transparent shadow-[0_20px_50px_rgba(163,230,53,0.1)]'
                          : ''
                      }`}
                    >
                      {/* Popular tag */}
                      {isPopular && (
                        <div className="absolute top-4 right-4 flex items-center gap-1 bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg shadow-lime-500/20">
                          <Sparkles className="w-3 h-3" />
                          Most Popular
                        </div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-xs text-white/30 tracking-wider uppercase font-bold">
                          Starting at
                        </p>
                        <div className="flex items-baseline mt-1">
                          <span className="text-4xl font-black text-white tracking-tight">
                            {getPrice(plan.price)}
                          </span>
                          <span className="text-sm font-semibold text-white/40 ml-1">
                            /{billingPeriod === 'yearly' ? 'year' : 'mo'}
                          </span>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-white/[0.06] mb-6" />

                      {/* Features */}
                      <ul className="space-y-3.5 mb-8 flex-1">
                        {plan.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2.5 text-sm text-white/60">
                            <Check className="w-4.5 h-4.5 text-lime-400 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Checkout Action Button */}
                      <a
                        href={plan.checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                          isPopular
                            ? 'bg-lime-500 text-black hover:bg-lime-400 shadow-lg shadow-lime-500/25'
                            : 'bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/10'
                        }`}
                      >
                        Order Plan
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
