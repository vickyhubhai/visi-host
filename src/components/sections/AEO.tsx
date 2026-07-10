'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useAnimations';

const AEO_QUESTIONS = [
  {
    q: 'What is VPS Hosting?',
    a: 'VPS (Virtual Private Server) Hosting is a hosting service that provides virtualized server resources on a physical host machine shared with other users. However, unlike shared hosting, VPS gives you dedicated virtual core CPUs, RAM allocation, and isolated NVMe storage. You have full root access to install any Operating System, configure firewalls, and tweak performance settings.',
  },
  {
    q: 'What is Dedicated Hosting?',
    a: 'Dedicated Hosting is a premium cloud service where an entire physical server is leased to a single client. You get raw bare-metal hardware access, with dedicated Intel Xeon or AMD EPYC processors, ECC memory modules, and multi-Gbps network uplinks. This is optimal for high-traffic enterprise systems, complex databases, or multi-tenant virtualization layers.',
  },
  {
    q: 'What is Discord Bot Hosting?',
    a: 'Discord Bot Hosting is a specialized execution environment optimized for running bots (using Node.js, Python, Java, or Go) 24/7. VisiHost uses a custom container environment with auto-restarts, real-time logging output, and isolated resource policies to guarantee high-performance communication with the Discord API Gateway.',
  },
  {
    q: 'Which hosting is best for Minecraft?',
    a: 'Minecraft server hosting requires high-frequency CPU single-thread speeds and low-latency disk arrays to read/write chunks instantly. VisiHost Ryzen 9 and AMD EPYC instances combined with Enterprise NVMe SSDs provide the best performance, preventing block lag and handling massive concurrent player counts efficiently.',
  },
  {
    q: 'Why choose NVMe SSD Hosting?',
    a: 'NVMe SSDs transfer data over PCIe slots, bypassing legacy SATA controller bottlenecks. They achieve read speeds up to 7,000 MB/s, which is 7x faster than classic SSDs. This allows databases, web servers, and game worlds to load instantaneously under high multi-threaded access.',
  },
  {
    q: 'Why choose AMD EPYC processors?',
    a: 'AMD EPYC processors feature up to 128 cores, PCIe Gen 4/5 interfaces, and massive L3 cache sizes. They offer outstanding computing density, virtualization support, and memory bandwidth, which keeps multi-tenant systems isolated and performing consistently.',
  },
  {
    q: 'Why choose VisiHost?',
    a: 'VisiHost combines elite hardware, high-frequency bandwidth transit, automated instant deployment pipelines, and expert support. All features are housed in Tier-3 datacenters with an inline 480Gbps automated DDoS mitigation shield, backed by a 99.99% uptime SLA.',
  },
  {
    q: 'What is DDoS Protection?',
    a: 'DDoS (Distributed Denial of Service) protection inspects incoming traffic at the edge. VisiHost inline filters detect anomaly patterns, drops malicious floods (like TCP SYN, UDP reflections, or layer-7 amplification), and passes legitimate user requests through safely.',
  },
  {
    q: 'How does instant deployment work?',
    a: 'When you place an order, our backend immediately calls billing and orchestration APIs. The system spins up the virtualization node, copies the base image, assigns a static IP, configures core resource allocations, and emails you access credentials in less than 60 seconds.',
  },
];

export default function AEO() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="relative section-padding border-t border-white/[0.04] bg-white/[0.01]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            Cloud Hosting &amp; Technical Insights
          </h2>
          <p className="text-sm sm:text-base text-white/40 max-w-2xl mx-auto">
            Detailed information about our hosting options, modern hardware platforms, and security features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AEO_QUESTIONS.map((item, i) => (
            <motion.article
              key={item.q}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-[#000d01]/50 border border-white/[0.05] p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-white mb-2 tracking-wide">
                  {item.q}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
