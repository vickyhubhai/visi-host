'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { NAV_LINKS, BRAND } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[#05070A]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_20px_40px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2.5 group"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-lime-500/20 group-hover:shadow-lime-500/40 transition-shadow duration-300">
                <span className="text-black font-black text-sm">V</span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-lime-300 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-black font-black text-sm">V</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {BRAND.name}
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-xl hover:bg-white/[0.05] transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`${BRAND.billingUrl}/register`}
                className="group px-5 py-2.5 text-sm font-bold text-black rounded-full bg-gradient-to-r from-lime-400 to-emerald-600 hover:from-lime-300 hover:to-emerald-500 shadow-lg shadow-lime-500/25 hover:shadow-lime-500/40 transition-all duration-300 flex items-center gap-1.5"
              >
                Get Started
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/[0.05] transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 left-4 right-4 z-[100] bg-[#0d1117]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-6 max-h-[calc(100dvh-6rem)] overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-4 py-3 text-base font-medium text-white/70 hover:text-white rounded-2xl hover:bg-white/[0.05] transition-all duration-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col gap-3">
                <a
                  href={`${BRAND.billingUrl}/register`}
                  className="w-full py-3 text-center text-sm font-bold text-black rounded-full bg-gradient-to-r from-lime-400 to-emerald-600 shadow-lg shadow-lime-500/25"
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
