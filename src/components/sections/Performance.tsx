'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';
import { Cpu, Database, HardDrive, Activity } from 'lucide-react';

export default function Performance() {
  const { ref, isInView } = useInView();
  const [metrics, setMetrics] = useState({
    cpu: 18,
    ram: 34,
    disk: 42,
    bandwidth: 12.4,
    latency: 1.8,
  });

  // Simulate real-time metric fluctuations
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.max(10, Math.min(90, Math.floor(prev.cpu + (Math.random() * 10 - 5)))),
        ram: Math.max(30, Math.min(80, Math.floor(prev.ram + (Math.random() * 4 - 2)))),
        disk: Math.max(40, Math.min(45, parseFloat((prev.disk + (Math.random() * 0.1 - 0.05)).toFixed(1)))),
        bandwidth: Math.max(8, Math.min(25, parseFloat((prev.bandwidth + (Math.random() * 2 - 1)).toFixed(1)))),
        latency: Math.max(1.2, Math.min(2.8, parseFloat((prev.latency + (Math.random() * 0.4 - 0.2)).toFixed(2)))),
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Light sweep backgrounds */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                Live Node Status
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Real-time Platform <span className="gradient-text">Telemetry</span>
            </h2>
            <p className="text-lg text-white/45 leading-relaxed">
              We don&apos;t hide behind averages. Monitor the actual status of our core host systems, memory load, bandwidth utilization, and disk speeds in real time.
            </p>
          </motion.div>

          {/* Performance Dashboard Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 right-0 h-12 bg-white/[0.02] border-b border-white/[0.04] flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
                node-sg-09.visihost.in
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {/* CPU Dial */}
              <div className="bg-[#000d01] rounded-2xl p-5 border border-white/[0.04] flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#a3e635"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * metrics.cpu) / 100}
                      transition={{ type: 'spring', stiffness: 60 }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-black text-white">{metrics.cpu}%</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">CPU</span>
                  </div>
                </div>
              </div>

              {/* RAM Dial */}
              <div className="bg-[#000d01] rounded-2xl p-5 border border-white/[0.04] flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#10b981"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * metrics.ram) / 100}
                      transition={{ type: 'spring', stiffness: 60 }}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-black text-white">{metrics.ram}%</span>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold">RAM</span>
                  </div>
                </div>
              </div>

              {/* Stats lists */}
              <div className="col-span-2 grid grid-cols-3 gap-3">
                <div className="bg-[#000d01] rounded-xl p-4 border border-white/[0.04]">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">
                    Disk I/O
                  </p>
                  <p className="text-base font-bold text-white flex items-center gap-1.5">
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    {metrics.disk} GB/s
                  </p>
                </div>
                <div className="bg-[#000d01] rounded-xl p-4 border border-white/[0.04]">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">
                    Bandwidth
                  </p>
                  <p className="text-base font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-lime-400" />
                    {metrics.bandwidth} Gbps
                  </p>
                </div>
                <div className="bg-[#000d01] rounded-xl p-4 border border-white/[0.04]">
                  <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">
                    Latency
                  </p>
                  <p className="text-base font-bold text-white flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    {metrics.latency} ms
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
