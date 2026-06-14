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
    <main className="min-h-screen text-[#3A3124]">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <img src="/images/logo (4).png" alt="ТОККИМ" className="h-20 md:h-28 w-auto object-contain drop-shadow-md" />
        </div>
      </nav>

      <HeroSection />

      {/* Блок 1: Фон bg1 */}
      <div style={{ backgroundImage: "url('/images/bg1.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative bg-[#F5F1E6]/60">
          {/* Плавное проявление из сплошного бежевого в прозрачность 60% */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
          
          <AboutSection />
          <PopularDishes />

          {/* Плавное затухание обратно в сплошной бежевый */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
        </div>
      </div>

      {/* Блок 2: Фон bg2 */}
      <div style={{ backgroundImage: "url('/images/bg2.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="relative bg-[#F5F1E6]/60">
          {/* Плавное проявление из сплошного бежевого в прозрачность 60% */}
          <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
          
          <MenuSection />
          <GallerySection />

          {/* Плавное затухание в сплошной бежевый перед футером */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
        </div>
      </div>
      
      {/* Подвал */}
      <div className="bg-[#F5F1E6] relative z-20">
        <ReservationSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;