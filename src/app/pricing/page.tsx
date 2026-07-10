'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CursorGlow from '@/components/ui/CursorGlow';
import Pricing from '@/components/sections/Pricing';

export default function PricingPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10 pt-24 lg:pt-32">
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
