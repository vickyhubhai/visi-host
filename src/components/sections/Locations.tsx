'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';
import { LOCATIONS } from '@/lib/constants';
import Globe from '@/components/ui/Globe';
import { Map, RotateCw } from 'lucide-react';
import { isLand } from '@/lib/mapData';

export default function Locations() {
  const { ref, isInView } = useInView();
  const [viewMode, setViewMode] = useState<'map' | 'globe'>('globe');

  // Convert lat/lng to SVG coordinates (simple equirectangular projection)
  const toSVG = (lat: number, lng: number) => ({
    x: ((lng + 180) / 360) * 800,
    y: ((90 - lat) / 180) * 400,
  });

  // Pre-calculate dot positions representing actual Earth continents
  const mapDots = useMemo(() => {
    const dots: { x: number; y: number }[] = [];
    const step = 8;
    for (let x = 4; x < 800; x += step) {
      for (let y = 4; y < 400; y += step) {
        const lng = (x / 800) * 360 - 180;
        const lat = 90 - (y / 400) * 180;
        if (isLand(lng, lat)) {
          dots.push({ x, y });
        }
      }
    }
    return dots;
  }, []);

  return (
    <section id="locations" ref={ref} className="relative section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
              Global Infrastructure
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            <span className="gradient-text">10 Locations</span>, Zero Latency
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Deploy close to your users with data centers strategically positioned across the globe.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] p-1 rounded-full">
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${
                viewMode === 'map' ? 'bg-white text-black' : 'text-white/55 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              Flat Map
            </button>
            <button
              onClick={() => setViewMode('globe')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-200 ${
                viewMode === 'globe' ? 'bg-white text-black' : 'text-white/55 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              3D Globe
            </button>
          </div>
        </div>

        {/* Display Map or Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-4 sm:p-8 mb-12 min-h-[380px] flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {viewMode === 'globe' ? (
              <motion.div
                key="globe"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Globe />
              </motion.div>
            ) : (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative w-full aspect-[2/1] max-w-4xl mx-auto"
              >
                <svg viewBox="0 0 800 400" className="w-full h-full" aria-label="World map showing VisiHost data center locations">
                  <defs>
                    <pattern id="dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.08)" />
                    </pattern>
                    <radialGradient id="ping-gradient" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(163,230,53,0.6)" />
                      <stop offset="100%" stopColor="rgba(163,230,53,0)" />
                    </radialGradient>
                  </defs>

                  {/* Procedural Landmass dots */}
                  {mapDots.map((dot, idx) => (
                    <circle
                      key={idx}
                      cx={dot.x}
                      cy={dot.y}
                      r="1.5"
                      fill="rgba(163, 230, 53, 0.08)"
                    />
                  ))}

                  {/* Connection lines */}
                  {LOCATIONS.slice(1).map((loc, i) => {
                    const from = toSVG(LOCATIONS[0].lat, LOCATIONS[0].lng); // Mumbai as hub
                    const to = toSVG(loc.lat, loc.lng);
                    return (
                      <motion.line
                        key={`line-${i}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="rgba(163,230,53,0.12)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      />
                    );
                  })}

                  {/* Location pins */}
                  {LOCATIONS.map((loc, i) => {
                    const pos = toSVG(loc.lat, loc.lng);
                    return (
                      <g key={loc.name}>
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="12"
                          fill="none"
                          stroke="rgba(163,230,53,0.3)"
                          strokeWidth="1"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={
                            isInView
                              ? {
                                  scale: [1, 2, 1],
                                  opacity: [0.4, 0, 0.4],
                                }
                              : {}
                          }
                          transition={{
                            delay: 0.8 + i * 0.1,
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeOut',
                          }}
                        />
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="4"
                          fill="#a3e635"
                          initial={{ scale: 0 }}
                          animate={isInView ? { scale: 1 } : {}}
                          transition={{
                            delay: 0.6 + i * 0.08,
                            type: 'spring',
                            stiffness: 300,
                            damping: 15,
                          }}
                          className="drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]"
                        />
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="6"
                          fill="url(#ping-gradient)"
                          opacity="0.5"
                        />
                      </g>
                    );
                  })}
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Location cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.4 }}
              className="glass-card p-4 rounded-xl text-center hover:border-lime-500/20 transition-all duration-300 group"
            >
              <span className="text-2xl mb-2 block">{loc.flag}</span>
              <p className="text-sm font-semibold text-white mb-0.5">{loc.name}</p>
              <p className="text-xs text-white/30">{loc.country}</p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-semibold text-emerald-400">{loc.ping}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

