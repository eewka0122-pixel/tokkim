"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PopularDishes from "@/components/PopularDishes";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <main className="min-h-screen text-[#3A3124] transition-colors bg-[#F5F1E6]">
      <nav className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <img 
            src="/images/logo (4).png" 
            alt="ТОККИМ" 
            className="h-20 md:h-28 w-auto object-contain drop-shadow-md"
          />
        </div>
      </nav>

      <HeroSection />
      
      {/* Слой с bg1.jpeg */}
      <div style={{ backgroundImage: "url('/images/bg1.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
        <div className="bg-[#F5F1E6]/80">
          <AboutSection />
          <PopularDishes />
        </div>
      </div>

      {/* Слой с bg2.jpeg */}
      <div style={{ backgroundImage: "url('/images/bg2.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover" }}>
        <div className="bg-[#F5F1E6]/80">
          <MenuSection />
          <GallerySection />
        </div>
      </div>
      
      <div className="bg-[#F5F1E6]">
        <ReservationSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;