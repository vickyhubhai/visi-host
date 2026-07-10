'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import CursorGlow from '@/components/ui/CursorGlow';
import Locations from '@/components/sections/Locations';

export default function LocationsPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10 pt-24 lg:pt-32">
        <Locations />
      </main>
      <Footer />
    </>
  );
}
