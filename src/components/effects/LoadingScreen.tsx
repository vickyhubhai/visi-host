'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_MESSAGES = [
  'Initializing Infrastructure',
  'Connecting Global Network',
  'Optimizing Performance',
  'Preparing Cloud Resources',
  'Launching Experience',
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2800;
    const start = Date.now();

    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.floor(eased * 100));

      const msgIdx = Math.min(
        Math.floor(eased * LOADING_MESSAGES.length),
        LOADING_MESSAGES.length - 1
      );
      setMessageIndex(msgIdx);

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setIsComplete(true), 300);
        setTimeout(() => setIsVisible(false), 800);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-[#000d01] flex items-center justify-center"
        >
          {/* Aurora glow behind */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(163,230,53,0.15) 0%, transparent 70%)',
              }}
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-600 flex items-center justify-center shadow-2xl shadow-lime-500/30">
                <span className="text-black font-black text-3xl">V</span>
              </div>
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-3 rounded-2xl border border-lime-500/20"
                style={{
                  borderImage: 'linear-gradient(135deg, rgba(163,230,53,0.4), transparent, rgba(16,185,129,0.4), transparent) 1',
                }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold tracking-tight text-white"
            >
              VisiHost
            </motion.h1>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="h-1 bg-white/[0.06] rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Status text */}
            <div className="flex flex-col items-center gap-2">
              <motion.span
                key={messageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-medium text-white/50 tracking-wider uppercase"
              >
                {LOADING_MESSAGES[messageIndex]}
              </motion.span>
              <span className="text-xs font-mono text-white/30">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
