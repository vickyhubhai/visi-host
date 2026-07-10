'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { BRAND, FOOTER_LINKS } from '@/lib/constants';

// Custom inline SVG icons for brands since they are missing in the installed Lucide version
const TwitterIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.67 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.18 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.18 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000d01] border-t border-white/[0.04]">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Newsletter + Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-lime-500/20">
                <span className="text-black font-black text-base">V</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {BRAND.name}
              </span>
            </div>
            <p className="text-white/40 text-base leading-relaxed max-w-md mb-8">
              Enterprise-grade cloud hosting with NVMe SSDs, AMD EPYC processors, and
              global infrastructure. Built for developers who demand the best.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: DiscordIcon, href: '#', label: 'Discord' },
                { icon: TwitterIcon, href: '#', label: 'Twitter' },
                { icon: GithubIcon, href: '#', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:flex lg:flex-col lg:items-end lg:justify-center">
            <div className="max-w-md lg:ml-auto">
              <h3 className="text-lg font-semibold text-white mb-3">
                Stay in the loop
              </h3>
              <p className="text-white/40 text-sm mb-5">
                Get notified about new features, infrastructure updates, and exclusive offers.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3 bg-white/[0.04] border border-white/[0.08] rounded-full text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/20 transition-all duration-200"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-600 text-black text-sm font-bold rounded-full hover:from-lime-300 hover:to-emerald-500 shadow-lg shadow-lime-500/25 transition-all duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 mb-20">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group text-sm text-white/35 hover:text-white/80 transition-colors duration-200 flex items-center gap-1"
                    >
                      {link.label}
                      {link.href.startsWith('http') && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-60 -translate-y-0.5 transition-all duration-200" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/25 flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-red-400" /> for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
