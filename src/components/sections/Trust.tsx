'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';
import { Award, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

const PARTNERS = [
  { name: 'AMD', logo: 'AMD EPYC' },
  { name: 'Intel', logo: 'Intel Xeon' },
  { name: 'Cloudflare', logo: 'Cloudflare Peered' },
  { name: 'Equinix', logo: 'Equinix Tier 3' },
  { name: 'Pterodactyl', logo: 'Pterodactyl UI' },
];

export default function Trust() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Partners Banner */}
        <div className="mb-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-8">
            Peered and Built With Industry Leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-40">
            {PARTNERS.map((partner) => (
              <span
                key={partner.name}
                className="text-lg sm:text-xl font-black text-white hover:opacity-100 transition-opacity cursor-default duration-200"
              >
                {partner.logo}
              </span>
            ))}
          </div>
        </div>

        {/* Credentials and Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Tier-3 Datacenters',
              desc: 'High density racks with redundant power grid feeds and battery backups.',
              icon: Cpu,
            },
            {
              title: 'Enterprise SLAs',
              desc: 'Robust 99.99% uptime guarantee with premium response times.',
              icon: CheckCircle,
            },
            {
              title: 'ISO 27001 Certified',
              desc: 'Datacenters comply with strict international security guidelines.',
              icon: Award,
            },
            {
              title: 'DDoS Shield',
              desc: 'Inline real-time traffic mitigation protects you from network abuse.',
              icon: ShieldAlert,
            },
          ].map((cred, i) => {
            const Icon = cred.icon;
            return (
              <motion.div
                key={cred.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card p-6 rounded-2xl flex items-start gap-4 border-white/[0.04] hover:border-lime-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-lime-500/10 border border-lime-500/20 flex items-center justify-center text-lime-400 flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{cred.title}</h4>
                  <p className="text-xs text-white/35 leading-relaxed">{cred.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
