"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import PopularDishes from "@/components/PopularDishes";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <main className="min-h-screen bg-stone-50 text-stone-950 transition-colors">
      <HeroSection />
      <PopularDishes />
      <MenuSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;