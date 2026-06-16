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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isNavOpen]);

  useEffect(() => {
    if (loading) return;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let isScrolling = false;

    const calculateProgress = (scrollY: number) => {
      const startFade = window.innerHeight * 0.70;
      const endFade = window.innerHeight * 0.90;
      if (scrollY <= startFade) return 0;
      if (scrollY >= endFade) return 1;
      return (scrollY - startFade) / (endFade - startFade);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavOpen) return;
      e.preventDefault();
      targetScrollY += e.deltaY * 0.55;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.documentElement.scrollHeight - window.innerHeight));
      
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
    };

    const updateScroll = () => {
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      window.scrollTo(0, currentScrollY);
      setScrollProgress(calculateProgress(currentScrollY));
      updateActiveSection(currentScrollY);
      if (Math.abs(targetScrollY - currentScrollY) > 0.3) {
        requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
      }
    };

    const updateActiveSection = (scrollY: number) => {
      const sections = ["module-about", "module-menu", "module-contacts"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 10) current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [loading, isNavOpen]);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  const scrollToSection = (id: string) => {
    setIsNavOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const bgPositionStyle = `calc(50% + ${mouseOffset.x * 30}px) calc(50% + ${mouseOffset.y * 30}px)`;
  const syncColor = scrollProgress > 0.5 ? '#3A3124' : '#FFFFFF';
  const syncShadow = scrollProgress < 0.5 ? "0 2px 8px rgba(0,0,0,0.5)" : "none";
  const syncBtnBg = scrollProgress > 0.5 ? 'rgba(212, 185, 143, 0.2)' : 'rgba(255, 255, 255, 0.1)';

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
    { id: "module-menu", label: "Акции и скидки" },
  ];

  return (
    <main className="min-h-screen text-[#3A3124]">
      {/* Навигация */}
      <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-start justify-between pointer-events-none">
        <div className="flex flex-col items-start pointer-events-auto">
          <div className="relative flex items-center h-20 md:h-24 cursor-pointer z-10" onClick={() => scrollToSection("top")}>
             <img src="/images/logo (4).png" alt="ТОККИМ" className="h-full w-auto object-contain" />
          </div>
          <div className="flex flex-col items-start gap-1.5 mt-2 pl-1">
            {navLinks.map((link, idx) => (
              <button key={idx} onClick={() => scrollToSection(link.id)} className={`text-left font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 ${activeSection === link.id ? "opacity-100" : "opacity-70 hover:opacity-100"}`} style={{ color: syncColor, textShadow: syncShadow }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
        <div className="pointer-events-auto relative mt-2">
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg" style={{ backgroundColor: syncBtnBg, color: syncColor }}>
            {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className={`absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-2xl p-2 flex flex-col transition-all ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            {navLinks.map((link, idx) => (
              <button key={idx} onClick={() => scrollToSection(link.id)} className="px-5 py-3 font-bold hover:bg-[#F5F1E6] rounded-xl text-left">{link.label}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero с видео */}
      <div className="relative w-full min-h-screen">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 w-full h-full"><HeroSection /></div>
      </div>

      {/* Блоки без градиентов */}
      <div id="module-about" style={{ backgroundImage: "url('/images/bg1.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle }}>
        <div className="bg-[#F5F1E6]/60"><AboutSection /><PopularDishes /></div>
      </div>

      <div id="module-menu" style={{ backgroundImage: "url('/images/bg2.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle }}>
        <div className="bg-[#F5F1E6]/60"><MenuSection /></div>
      </div>
      
      <div id="module-contacts" className="bg-[#F5F1E6] pt-10 pb-10"><ReservationSection /><Footer /></div>
    </main>
  );
};

export default Index;