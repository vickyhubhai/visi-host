'use client';

import { motion } from 'framer-motion';

export default function ServerViz() {
  return (
    <div className="relative w-full max-w-sm aspect-[4/3] bg-gradient-to-br from-lime-500/10 to-emerald-500/10 border border-white/5 rounded-3xl p-6 overflow-hidden flex flex-col justify-between group shadow-2xl">
      {/* Aurora glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/20 blur-2xl rounded-full opacity-40 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/20 blur-2xl rounded-full opacity-40 pointer-events-none group-hover:scale-125 transition-transform duration-500" />

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-white/55">vh-sg-host-01</span>
        </div>
        <span className="text-[10px] font-mono bg-lime-500/10 border border-lime-500/20 px-2 py-0.5 rounded-full text-lime-400 font-bold uppercase tracking-wider">
          active
        </span>
      </div>

      {/* Racks */}
      <div className="flex-1 flex flex-col justify-center gap-3 my-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-10 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-between px-4 relative overflow-hidden group-hover:border-lime-500/20 transition-all duration-300"
          >
            {/* LED Lights */}
            <div className="flex items-center gap-1.5 relative z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-white/40">bay-{i + 1}</span>
            </div>

            {/* Status bars */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 rounded-full bg-lime-500/80 animate-pulse" />
                <span className="w-1 h-3 rounded-full bg-lime-500/80 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-1 h-3 rounded-full bg-lime-500/30" />
              </div>
              <span className="text-[10px] font-mono text-white/50">99.9%</span>
            </div>

            {/* Hover light sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lime-500/5 to-transparent -translate-x-full group-hover:animate-[server-scan_2s_infinite]" />
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div className="border-t border-white/[0.06] pt-4 flex items-center justify-between text-[10px] font-mono text-white/30">
        <span>Uptime: 345d 12h</span>
        <span>Temp: 32°C</span>
      </div>

      <style>{`
        @keyframes server-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
