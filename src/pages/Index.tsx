"use client";

import { useEffect, useState, useRef } from "react";
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

  // Используем useRef для синхронизации скролла, чтобы избежать конфликтов
  const scrollState = useRef({
    targetY: 0,
    currentY: 0,
    isScrolling: false
  });

  const updateScroll = () => {
    const state = scrollState.current;
    state.currentY += (state.targetY - state.currentY) * 0.08;
    
    window.scrollTo(0, state.currentY);

    if (Math.abs(state.targetY - state.currentY) > 0.5) {
      requestAnimationFrame(updateScroll);
    } else {
      state.isScrolling = false;
    }
  };

  useEffect(() => {
    if (loading) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollState.current.targetY += e.deltaY * 0.55;
      scrollState.current.targetY = Math.max(0, Math.min(scrollState.current.targetY, document.documentElement.scrollHeight - window.innerHeight));
      
      if (!scrollState.current.isScrolling) {
        scrollState.current.isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [loading]);

  const scrollToSection = (id: string) => {
    setIsNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // yOffset = -120 обеспечивает остановку контента ровно под шапкой
      const yOffset = -120; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition + yOffset;

      scrollState.current.targetY = offsetPosition;
      
      if (!scrollState.current.isScrolling) {
        scrollState.current.isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
      setActiveSection(id);
    }
  };

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
    { id: "module-menu", label: "Акции и скидки" },
  ];

  return (
    <main className="min-h-screen text-[#3A3124] bg-[#F5F1E6]">
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-start justify-between">
        {/* Логотип и меню */}
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
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border border-[#3A3124]/20">
            {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative w-full min-h-screen">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full h-full"><HeroSection /></div>
      </div>

      {/* Секции */}
      <div id="module-about" className="relative bg-[#F5F1E6]"><AboutSection /><PopularDishes /></div>
      <div id="module-menu" className="relative bg-[#F5F1E6]"><MenuSection /></div>
      <div id="module-contacts" className="bg-[#F5F1E6] pt-10 pb-10"><ReservationSection /><Footer /></div>
    </main>
  );
};

export default Index;