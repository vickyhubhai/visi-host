import type { Metadata } from 'next';
import './globals.css';
import { BRAND } from '@/lib/constants';

export const metadata: Metadata = {
  title: `${BRAND.name} | Premium Cloud Infrastructure Built For Developers`,
  description: BRAND.description,
  keywords: [
    'hosting',
    'discord bot hosting',
    'minecraft server hosting',
    'vps hosting',
    'dedicated servers',
    'game server hosting',
    'lavalink nodes',
    'amd epyc hosting',
    'high performance cloud',
    'developer cloud infrastructure',
  ],
  metadataBase: new URL(`https://${BRAND.domain}`),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${BRAND.name} | Premium Cloud Infrastructure`,
    description: BRAND.description,
    url: `https://${BRAND.domain}`,
    siteName: BRAND.name,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: `${BRAND.name} Infrastructure`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${BRAND.name} | Premium Cloud Infrastructure`,
    description: BRAND.description,
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `https://${BRAND.domain}/#organization`,
        'name': BRAND.name,
        'url': `https://${BRAND.domain}`,
        'logo': `https://${BRAND.domain}/logo.png`,
        'sameAs': [
          'https://twitter.com/visihost',
          'https://github.com/visihost',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `https://${BRAND.domain}/#website`,
        'url': `https://${BRAND.domain}`,
        'name': BRAND.name,
        'publisher': {
          '@id': `https://${BRAND.domain}/#organization`,
        },
      },
      {
        '@type': 'HostingService',
        '@id': `https://${BRAND.domain}/#hosting`,
        'name': 'Cloud Hosting Services',
        'provider': {
          '@id': `https://${BRAND.domain}/#organization`,
        },
        'description': BRAND.description,
        'areaServed': 'Worldwide',
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased selection:bg-blue-500/30 selection:text-white">
        {/* Global ambient background details */}
        <div className="aurora" />
        <div className="noise-overlay" />

        {children}
      </body>
    </html>
  );
}
