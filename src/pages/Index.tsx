"use client";

import HeroSection from "@/components/HeroSection";
import SignatureDishes from "@/components/SignatureDishes";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import ReservationForm from "@/components/ReservationForm";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <HeroSection />
      <SignatureDishes />
      <MenuSection />
      <Gallery />
      <Reviews />
      <ReservationForm />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;