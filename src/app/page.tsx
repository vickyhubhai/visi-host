'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import LoadingScreen from '@/components/effects/LoadingScreen';
import Hero from '@/components/sections/Hero';
import LiveStats from '@/components/sections/LiveStats';
import Products from '@/components/sections/Products';
import Features from '@/components/sections/Features';
import Locations from '@/components/sections/Locations';
import Performance from '@/components/sections/Performance';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import Trust from '@/components/sections/Trust';
import FAQ from '@/components/sections/FAQ';
import AEO from '@/components/sections/AEO';
import CursorGlow from '@/components/ui/CursorGlow';

export default function Home() {
  return (
    <>
      {/* Cinematic intro */}
      <LoadingScreen />

      {/* Global layouts and utilities */}
      <ScrollProgress />
      <CursorGlow />
      <Navbar />

      {/* Main page content sections */}
      <main className="relative z-10">
        <Hero />
        <LiveStats />
        <Products />
        <Features />
        <Locations />
        <Performance />
        <Pricing />
        <Testimonials />
        <Trust />
        <FAQ />
        <AEO />
      </main>

      <Footer />
    </>
  );
}
