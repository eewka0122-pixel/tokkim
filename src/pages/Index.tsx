"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PopularDishes from "@/components/PopularDishes";
import MenuSection from "@/components/MenuSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Следим за скроллом только для подсветки активного меню
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["module-about", "module-menu", "module-contacts"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  // Плавный стандартный скролл
  const scrollToSection = (id: string) => {
    setIsNavOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = 0;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
    { id: "module-menu", label: "Акции и скидки" },
  ];

  return (
    <main className="min-h-screen text-[#3A3124] bg-[#F5F1E6]">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-start justify-between">
        <div className="flex flex-col items-start">
          <div className="relative flex items-center h-20 md:h-24 cursor-pointer z-10" onClick={() => scrollToSection("top")}>
             <img src="/images/logo (4).png" alt="ТОККИМ" className="h-full w-auto object-contain" />
          </div>
          <div className="flex flex-col items-start gap-1.5 mt-2 pl-1">
            {navLinks.map((link, idx) => (
              <button key={idx} onClick={() => scrollToSection(link.id)} className={`text-left font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 ${activeSection === link.id ? "border border-[#3A3124]" : "hover:opacity-60"}`}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="relative mt-2">
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-[#3A3124]/20 bg-white/10">
            {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className={`absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-2xl p-2 flex flex-col transition-all ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            {navLinks.map((link, idx) => (
              <button key={idx} onClick={() => scrollToSection(link.id)} className="px-5 py-3 font-bold hover:bg-[#F5F1E6] rounded-xl text-left">{link.label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative w-full min-h-screen">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full h-full"><HeroSection /></div>
      </div>

      {/* Блоки контента */}
      <div id="module-about" className="relative bg-[#F5F1E6]"><AboutSection /><PopularDishes /></div>
      <div id="module-menu" className="relative bg-[#F5F1E6]"><MenuSection /></div>
      <div id="module-contacts" className="bg-[#F5F1E6] pt-10 pb-10"><ReservationSection /><Footer /></div>
    </main>
  );
};

export default Index;