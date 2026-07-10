// ═══════════════════════════════════════════════════
// VISIHOST — BRAND CONSTANTS & DATA
// ═══════════════════════════════════════════════════

export const BRAND = {
  name: 'VisiHost',
  tagline: 'Premium Cloud Infrastructure Built For Developers',
  description:
    'Enterprise-grade hosting with NVMe SSDs, AMD EPYC processors, 99.99% uptime guarantee, and 24/7 expert support. Deploy globally in seconds.',
  billingUrl: 'https://billing.visihost.in',
  supportUrl: 'https://billing.visihost.in/tickets',
  statusUrl: 'https://status.visihost.in',
  domain: 'visihost.in',
} as const;

export const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Locations', href: '/locations' },
  { label: 'FAQ', href: '/faq' },
] as const;

export const STATS = [
  { label: 'Active Servers', value: 250, suffix: '+', icon: 'Server' },
  { label: 'Happy Clients', value: 5000, suffix: '+', icon: 'Users' },
  { label: 'Deployments', value: 15000, suffix: '+', icon: 'Rocket' },
  { label: 'Uptime', value: 99.99, suffix: '%', icon: 'Shield' },
  { label: 'Tickets Resolved', value: 10000, suffix: '+', icon: 'MessageSquare' },
  { label: 'Global Locations', value: 10, suffix: '', icon: 'Globe' },
] as const;

export interface Product {
  slug: string;
  name: string;
  description: string;
  icon: string;
  gradient: string;
  href: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'discord-bot-hosting',
    name: 'Discord Bot Hosting',
    description: '24/7 uptime for your Discord bots with Node.js, Python & JDA support.',
    icon: 'Bot',
    gradient: 'from-indigo-500 to-purple-600',
    href: `${BRAND.billingUrl}/products/discord-bots`,
  },
  {
    slug: 'minecraft-hosting',
    name: 'Minecraft Hosting',
    description: 'Java & Bedrock servers with instant setup, mod support, and unlimited slots.',
    icon: 'Gamepad2',
    gradient: 'from-emerald-500 to-green-600',
    href: `${BRAND.billingUrl}/products/minecraft-java`,
  },
  {
    slug: 'vps-hosting',
    name: 'VPS Hosting',
    description: 'Full root access with NVMe SSDs, AMD EPYC CPUs, and DDoS protection.',
    icon: 'Server',
    gradient: 'from-blue-500 to-cyan-600',
    href: `${BRAND.billingUrl}/products`,
  },
  {
    slug: 'dedicated-servers',
    name: 'Dedicated Servers',
    description: 'Bare-metal performance with dedicated hardware and premium bandwidth.',
    icon: 'HardDrive',
    gradient: 'from-orange-500 to-amber-600',
    href: `${BRAND.billingUrl}/products`,
  },
  {
    slug: 'web-hosting',
    name: 'Web Hosting',
    description: 'Lightning-fast web hosting with cPanel, free SSL, and daily backups.',
    icon: 'Globe',
    gradient: 'from-cyan-500 to-blue-600',
    href: `${BRAND.billingUrl}/products`,
  },
  {
    slug: 'game-hosting',
    name: 'Game Hosting',
    description: 'High-performance game servers for Minecraft, Hytale, Terraria, and more.',
    icon: 'Joystick',
    gradient: 'from-red-500 to-pink-600',
    href: `${BRAND.billingUrl}/products/game-servers`,
  },
  {
    slug: 'lavalink-hosting',
    name: 'Lavalink Hosting',
    description: 'Ultra-low latency audio streaming for Discord music bots.',
    icon: 'Music',
    gradient: 'from-violet-500 to-purple-600',
    href: `${BRAND.billingUrl}/products/voice-servers`,
  },
  {
    slug: 'telegram-bot-hosting',
    name: 'Telegram Bot Hosting',
    description: 'Deploy Telegram bots with webhook support and instant scaling.',
    icon: 'Send',
    gradient: 'from-sky-500 to-blue-600',
    href: `${BRAND.billingUrl}/products/telegram-bots`,
  },
  {
    slug: 'database-hosting',
    name: 'Database Hosting',
    description: 'Managed MySQL, PostgreSQL, MongoDB, and Redis with automatic backups.',
    icon: 'Database',
    gradient: 'from-teal-500 to-emerald-600',
    href: `${BRAND.billingUrl}/products`,
  },
  {
    slug: 'voice-hosting',
    name: 'Voice Server Hosting',
    description: 'Mumble and TeamSpeak servers with crystal-clear audio quality.',
    icon: 'Mic',
    gradient: 'from-fuchsia-500 to-pink-600',
    href: `${BRAND.billingUrl}/products/voice-servers`,
  },
  {
    slug: 'reseller-hosting',
    name: 'Reseller Hosting',
    description: 'Start your own hosting business with white-label solutions.',
    icon: 'Store',
    gradient: 'from-amber-500 to-orange-600',
    href: `${BRAND.billingUrl}/products`,
  },
];

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export const FEATURES: Feature[] = [
  {
    title: 'NVMe SSD Storage',
    description: 'Enterprise-grade NVMe SSDs delivering up to 7,000 MB/s read speeds for blazing-fast I/O performance.',
    icon: 'Zap',
  },
  {
    title: 'AMD Ryzen & EPYC',
    description: 'Latest-generation AMD processors with high single-thread performance and massive multi-core throughput.',
    icon: 'Cpu',
  },
  {
    title: '99.99% Uptime SLA',
    description: 'Industry-leading uptime guarantee backed by redundant infrastructure and automated failover systems.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Enterprise DDoS Shield',
    description: '480 Gbps automated DDoS mitigation filtering malicious traffic in real-time without affecting legitimate users.',
    icon: 'Shield',
  },
  {
    title: 'Instant Deployment',
    description: 'Automated provisioning deploys your services in under 60 seconds with pre-configured environments.',
    icon: 'Rocket',
  },
  {
    title: 'Daily Backups',
    description: 'Automated daily snapshots with 7-day retention. One-click restore ensures your data is always protected.',
    icon: 'CloudUpload',
  },
  {
    title: '24/7 Expert Support',
    description: 'Round-the-clock support from certified engineers with average response times under 15 minutes.',
    icon: 'Headphones',
  },
  {
    title: 'Global Network',
    description: '10 strategic data center locations worldwide ensuring sub-50ms latency for 95% of global users.',
    icon: 'Globe',
  },
  {
    title: 'Full Root Access',
    description: 'Complete administrative control over your server with SSH access and custom configuration support.',
    icon: 'Terminal',
  },
  {
    title: 'Instant Snapshots',
    description: 'Create instant point-in-time snapshots for easy rollback and disaster recovery at no extra cost.',
    icon: 'Camera',
  },
  {
    title: 'Premium Network',
    description: 'Multi-homed premium transit with tier-1 carrier peering delivering 10 Gbps uplinks per node.',
    icon: 'Network',
  },
  {
    title: 'Auto Scaling',
    description: 'Dynamic resource allocation automatically adjusts CPU, RAM, and bandwidth based on real-time demand.',
    icon: 'TrendingUp',
  },
];

export interface Location {
  name: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  ping: string;
}

export const LOCATIONS: Location[] = [
  { name: 'Mumbai', country: 'India', flag: '🇮🇳', lat: 19.08, lng: 72.88, ping: '2ms' },
  { name: 'Singapore', country: 'Singapore', flag: '🇸🇬', lat: 1.35, lng: 103.82, ping: '45ms' },
  { name: 'Frankfurt', country: 'Germany', flag: '🇩🇪', lat: 50.11, lng: 8.68, ping: '120ms' },
  { name: 'New York', country: 'USA', flag: '🇺🇸', lat: 40.71, lng: -74.01, ping: '180ms' },
  { name: 'London', country: 'UK', flag: '🇬🇧', lat: 51.51, lng: -0.13, ping: '130ms' },
  { name: 'Paris', country: 'France', flag: '🇫🇷', lat: 48.86, lng: 2.35, ping: '125ms' },
  { name: 'Toronto', country: 'Canada', flag: '🇨🇦', lat: 43.65, lng: -79.38, ping: '175ms' },
  { name: 'Sydney', country: 'Australia', flag: '🇦🇺', lat: -33.87, lng: 151.21, ping: '200ms' },
  { name: 'Amsterdam', country: 'Netherlands', flag: '🇳🇱', lat: 52.37, lng: 4.90, ping: '118ms' },
  { name: 'Tokyo', country: 'Japan', flag: '🇯🇵', lat: 35.68, lng: 139.69, ping: '85ms' },
];

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Arjun Mehta',
    role: 'Discord Bot Developer',
    content: 'VisiHost transformed our bot infrastructure. Zero downtime since we migrated, and the NVMe performance is insane. Best hosting I\'ve ever used.',
    avatar: 'AM',
    rating: 5,
  },
  {
    name: 'Sarah Chen',
    role: 'Minecraft Server Owner',
    content: 'Running 3 Minecraft servers with 200+ players each. The Ryzen CPUs handle everything smoothly. Support team is incredibly fast.',
    avatar: 'SC',
    rating: 5,
  },
  {
    name: 'Viktor Petrov',
    role: 'SaaS Founder',
    content: 'We moved our production databases to VisiHost VPS. The EPYC processors and NVMe storage cut our query times by 60%. Remarkable.',
    avatar: 'VP',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Full-Stack Developer',
    content: 'The global coverage is fantastic. Our users in India, EU, and US all experience sub-100ms latency. Couldn\'t ask for more.',
    avatar: 'PS',
    rating: 5,
  },
  {
    name: 'James Wright',
    role: 'Game Server Administrator',
    content: 'DDoS protection saved us during multiple attacks. Not a single second of downtime. The Enterprise Shield is worth every penny.',
    avatar: 'JW',
    rating: 5,
  },
  {
    name: 'Ravi Kumar',
    role: 'Telegram Bot Developer',
    content: 'Instant setup, zero cold starts, and the webhook support is flawless. VisiHost understands what bot developers need.',
    avatar: 'RK',
    rating: 5,
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is VPS Hosting?',
    answer: 'VPS (Virtual Private Server) hosting gives you dedicated resources on a virtual machine. Unlike shared hosting, your CPU, RAM, and storage are exclusively yours, providing better performance, security, and full root access to configure your server environment.',
  },
  {
    question: 'What is Discord Bot Hosting?',
    answer: 'Discord bot hosting is a specialized service that keeps your Discord bot running 24/7 without interruption. VisiHost provides optimized environments for Node.js, Python, and Java bots with automatic restarts, real-time logs, and enterprise DDoS protection.',
  },
  {
    question: 'Which hosting is best for Minecraft servers?',
    answer: 'For Minecraft servers, you need high single-thread CPU performance and fast NVMe storage. VisiHost uses AMD Ryzen 9 processors and enterprise NVMe SSDs, delivering smooth gameplay even with 200+ players and heavy modpacks like RLCraft or All The Mods.',
  },
  {
    question: 'Why choose NVMe SSD Hosting?',
    answer: 'NVMe SSDs are up to 7x faster than traditional SATA SSDs and 35x faster than HDDs. This translates to faster application load times, quicker database queries, and near-instant file I/O — critical for high-performance hosting workloads.',
  },
  {
    question: 'Why choose AMD EPYC processors?',
    answer: 'AMD EPYC processors offer exceptional multi-threaded performance with up to 128 cores per socket. They feature advanced security, larger caches, and better memory bandwidth compared to competitors, making them ideal for enterprise hosting workloads.',
  },
  {
    question: 'What is DDoS Protection and how does it work?',
    answer: 'DDoS (Distributed Denial of Service) protection shields your server from malicious traffic floods. VisiHost\'s Enterprise DDoS Shield provides 480 Gbps of mitigation capacity, automatically detecting and filtering attacks in real-time without affecting legitimate traffic.',
  },
  {
    question: 'How fast is instant deployment?',
    answer: 'VisiHost\'s automated provisioning system deploys your server in under 60 seconds. Simply choose your plan, complete payment, and your service is live with your chosen OS and pre-configured environment ready to use.',
  },
  {
    question: 'What uptime guarantee does VisiHost offer?',
    answer: 'VisiHost guarantees 99.99% uptime backed by our SLA. Our infrastructure features redundant power, networking, and storage with automated failover. In the rare event of downtime exceeding our SLA, eligible customers receive service credits.',
  },
  {
    question: 'Do you offer 24/7 customer support?',
    answer: 'Yes, our expert support team is available 24 hours a day, 7 days a week, 365 days a year. Average response time is under 15 minutes. Contact us via support tickets, Discord, or email for any technical assistance.',
  },
  {
    question: 'What is Lavalink Hosting?',
    answer: 'Lavalink is a standalone audio sending node for Discord music bots. VisiHost provides optimized Lavalink hosting with ultra-low latency, zero buffering, and managed updates — perfect for high-quality Discord music bot deployments.',
  },
];

export const FOOTER_LINKS = {
  products: [
    { label: 'Discord Bot Hosting', href: `${BRAND.billingUrl}/products/discord-bots` },
    { label: 'Minecraft Hosting', href: `${BRAND.billingUrl}/products/game-servers` },
    { label: 'VPS Hosting', href: `${BRAND.billingUrl}/products` },
    { label: 'Lavalink Hosting', href: `${BRAND.billingUrl}/products/voice-servers` },
    { label: 'Game Hosting', href: `${BRAND.billingUrl}/products/game-servers` },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Partners', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: BRAND.billingUrl },
    { label: 'Support Tickets', href: BRAND.supportUrl },
    { label: 'System Status', href: BRAND.statusUrl ?? '#' },
    { label: 'Billing Portal', href: BRAND.billingUrl },
    { label: 'Discord Server', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'SLA Agreement', href: '#' },
    { label: 'Acceptable Use Policy', href: '#' },
    { label: 'GDPR Compliance', href: '#' },
  ],
} as const;
