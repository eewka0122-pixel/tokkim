"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PopularDishes from "@/components/PopularDishes";
import MenuSection from "@/components/MenuSection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // ИСПРАВЛЕНО: Цвет меняется только когда прокрутили почти весь первый экран (высота окна минус 100px для плавности)
      setIsScrolled(window.scrollY > window.innerHeight - 100);

      // Логика подсветки активной кнопки
      const sections = ["module-about", "module-promos", "module-menu", "module-contacts"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Вызываем один раз при монтировании, чтобы сразу задать правильный цвет
    handleScroll(); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-promos", label: "Акции и скидки" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
  ];

  return (
    <main className="min-h-screen text-[#3A3124] scroll-smooth">
      {/* НАВИГАЦИЯ */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col items-start pointer-events-auto">
          {/* Логотип */}
          <div className="relative flex items-center h-20 md:h-24 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className={`h-full w-auto object-contain transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} 
            />
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className={`absolute top-0 left-0 h-full w-auto object-contain brightness-0 invert transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`} 
            />
          </div>
          
          {/* Кнопки меню */}
          <div className="flex flex-col items-start gap-1.5 mt-2 pl-1">
            {navLinks.map((link, idx) => (
              <button 
                key={idx} 
                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`text-left font-bold text-sm md:text-base uppercase tracking-wider px-2 py-0.5 rounded-sm transition-all duration-300 ${
                  activeSection === link.id ? "border border-[#7A2828]" : "border border-transparent"
                }`} 
                style={{ color: isScrolled ? "#1F241E" : "#FFFFFF" }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ГЕРОЙ */}
      <div className="relative w-full min-h-screen">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full h-full"><HeroSection /></div>
      </div>

      {/* КОНТЕНТ С ФОНОВЫМИ КАРТИНКАМИ И ПАРАЛЛАКСОМ */}
      <div 
        id="module-about" 
        className="bg-cover bg-fixed bg-center relative" 
        style={{ backgroundImage: "url('/images/bg1.jpeg')" }}
      >
        <div className="relative bg-[#F5F1E6]/60 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5F1E6] via-[#F5F1E6]/90 to-transparent pointer-events-none z-0" />
          <div className="relative z-10">
            <AboutSection />
            <PopularDishes /> {/* Здесь id="module-promos" */}
          </div>
        </div>
      </div>

      <div 
        id="module-menu" 
        className="bg-cover bg-fixed bg-center relative" 
        style={{ backgroundImage: "url('/images/bg2.jpeg')" }}
      >
        <div className="relative bg-[#F5F1E6]/60 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#F5F1E6] via-[#F5F1E6]/90 to-transparent pointer-events-none z-0" />
          <div className="relative z-10">
            <MenuSection />
          </div>
        </div>
      </div>
      
      <div id="module-contacts" className="bg-[#F5F1E6] pt-10 pb-10 relative z-20">
        <ReservationSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;