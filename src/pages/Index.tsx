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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  
  // По умолчанию ставим false, но useEffect быстро это исправит
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollState = useRef({
    targetY: 0,
    currentY: 0,
    isScrolling: false
  });

  // Жесткое определение устройства сразу при загрузке
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice(); // Проверяем сразу
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const updateScroll = () => {
    const state = scrollState.current;
    state.currentY += (state.targetY - state.currentY) * 0.08;
    
    window.scrollTo(0, state.currentY);
    setScrollProgress(state.currentY > window.innerHeight - 100 ? 1 : 0);

    const sections = ["module-about", "module-promos", "module-menu", "module-contacts"];
    let current = "";
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          current = section;
        }
      }
    }
    setActiveSection(current);

    if (Math.abs(state.targetY - state.currentY) > 0.5) {
      requestAnimationFrame(updateScroll);
    } else {
      state.isScrolling = false;
    }
  };

  const scrollToSection = (id: string) => {
    if (id === "top") {
      scrollState.current.targetY = 0;
      if (!scrollState.current.isScrolling) {
        scrollState.current.isScrolling = true;
        requestAnimationFrame(updateScroll);
      }
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      const yOffset = window.innerWidth >= 768 ? 96 : 80; 
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

    const handleScrollSync = () => {
      if (!scrollState.current.isScrolling) {
        scrollState.current.targetY = window.scrollY;
        scrollState.current.currentY = window.scrollY;
      }
      setScrollProgress(window.scrollY > window.innerHeight - 100 ? 1 : 0);
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          const id = href.substring(1);
          if (document.getElementById(id)) {
            e.preventDefault(); 
            scrollToSection(id); 
          }
        }
      }
    };

    (window as any).customScrollTo = scrollToSection;

    scrollState.current.targetY = window.scrollY;
    scrollState.current.currentY = window.scrollY;
    handleScrollSync();

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScrollSync);
    document.addEventListener("click", handleGlobalClick);
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScrollSync);
      document.removeEventListener("click", handleGlobalClick);
      delete (window as any).customScrollTo;
    };
  }, [loading]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  const bgPositionStyle = isMobile ? "center" : `calc(50% + ${mouseOffset.x * 30}px) calc(50% + ${mouseOffset.y * 30}px)`;

  const r = Math.round(255 - (255 - 58) * scrollProgress);
  const g = Math.round(255 - (255 - 49) * scrollProgress);
  const b = Math.round(255 - (255 - 36) * scrollProgress);
  const syncColor = `rgb(${r}, ${g}, ${b})`;
  const syncShadow = scrollProgress < 0.5 ? "0 2px 8px rgba(0,0,0,0.5)" : "none";

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-promos", label: "Акции и скидки" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        html {
          scrollbar-gutter: stable;
          scroll-behavior: auto !important;
        }
        body[data-scroll-locked] {
          padding-right: 0 !important;
          margin-right: 0 !important;
        }
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
      `}} />

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#F5F1E6] flex flex-col items-center justify-center animate-in fade-in duration-200"
          style={{ zIndex: 999999 }}
        >
          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(false)} 
            className="absolute top-6 right-6 text-[#3A3124] p-3 bg-white rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <X className="w-8 h-8" />
          </button>
          
          <img src="/images/logo (4).png" alt="ТОККИМ" className="h-28 w-auto mb-12 object-contain drop-shadow-sm" />
          
          <div className="flex flex-col items-center gap-8">
            {navLinks.map((link, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => scrollToSection(link.id), 100);
                }} 
                className={`font-serif text-3xl font-bold uppercase tracking-widest transition-colors ${
                  activeSection === link.id ? "text-[#D4B98F]" : "text-[#3A3124]"
                }`} 
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div 
        className="md:hidden fixed top-0 left-0 w-full p-4 flex justify-between items-start"
        style={{ zIndex: 99999 }} 
      >
        <div 
          className="cursor-pointer transition-transform hover:scale-105 active:scale-95 bg-white/10 p-2 rounded-xl backdrop-blur-sm"
          onClick={() => scrollToSection("top")}
        >
          <img 
            src="/images/logo (4).png" 
            alt="ТОККИМ" 
            className="h-12 w-auto object-contain drop-shadow-md invert brightness-0" 
          />
        </div>

        <button 
          type="button"
          className="p-3 bg-black/40 backdrop-blur-md rounded-xl shadow-lg active:scale-95 transition-transform"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(true);
          }}
          onTouchEnd={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(true);
          }}
        >
          <Menu className="w-8 h-8 text-white" />
        </button>
      </div>

      <main className="min-h-screen text-[#3A3124]">

        <nav className="hidden md:flex fixed top-0 left-0 w-full z-[100] p-8 items-start justify-between pointer-events-none">
          <div className="flex flex-col items-start pointer-events-auto">
            <div 
              className="relative flex items-center h-24 cursor-pointer transition-transform hover:scale-105 origin-left z-10"
              onClick={() => scrollToSection("top")}
            >
              <img 
                src="/images/logo (4).png" 
                alt="ТОККИМ" 
                className="h-full w-auto object-contain drop-shadow-md" 
                style={{ opacity: scrollProgress }}
              />
              <img 
                src="/images/logo (4).png" 
                alt="ТОККИМ" 
                className="absolute top-0 left-0 h-full w-auto object-contain drop-shadow-md brightness-0 invert" 
                style={{ opacity: 1 - scrollProgress }}
              />
            </div>

            <div className="flex flex-col items-start gap-1.5 mt-2 pl-1">
              {navLinks.map((link, idx) => (
                <button 
                  key={idx}
                  type="button"
                  onClick={() => scrollToSection(link.id)} 
                  className={`text-left font-bold text-base uppercase tracking-wider transition-all duration-200 px-2 py-0.5 -ml-2 rounded-sm ${
                    activeSection === link.id ? "border border-[#3A3124]" : "border border-transparent hover:opacity-60"
                  }`} 
                  style={{ color: syncColor, textShadow: syncShadow }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ГЛАВНЫЙ ЭКРАН С ЖЕЛЕЗОБЕТОННЫМ ПЕРЕКЛЮЧЕНИЕМ ВИДЕО ЧЕРЕЗ REACT */}
        <div className="relative w-full h-[100dvh] overflow-hidden bg-black flex items-center">
          
          <video 
            key={isMobile ? "mobile-video" : "desktop-video"} // Это заставит React ПЕРЕЗАГРУЗИТЬ плеер
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
          >
            {/* Меняем ссылку физически, а не прячем блоки */}
            <source src={isMobile ? "/videos/hero-mobile.mp4" : "/videos/hero-video.mp4"} type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-black/20 z-0" />
          
          <div className="relative z-10 w-full flex flex-col justify-center pt-16 md:pt-0">
            <HeroSection />
          </div>
        </div>

        <div 
          id="module-about" 
          style={{ 
            backgroundImage: "url('/images/bg1.jpeg')", 
            backgroundAttachment: isMobile ? "scroll" : "fixed", 
            backgroundSize: "cover", 
            backgroundPosition: bgPositionStyle 
          }}
        >
          <div className="relative bg-[#F5F1E6]/95 md:bg-[#F5F1E6]/75">
            <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#F5F1E6] via-[#F5F1E6]/90 to-transparent pointer-events-none z-0" />
            <div className="relative z-10">
              <AboutSection />
              <PopularDishes />
            </div>
          </div>
        </div>

        <div 
          id="module-menu" 
          style={{ 
            backgroundImage: "url('/images/bg2.jpeg')", 
            backgroundAttachment: isMobile ? "scroll" : "fixed", 
            backgroundSize: "cover", 
            backgroundPosition: bgPositionStyle 
          }}
        >
          <div className="relative bg-[#F5F1E6]/95 md:bg-[#F5F1E6]/75">
            <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#F5F1E6] via-[#F5F1E6]/90 to-transparent pointer-events-none z-0" />
            <div className="relative z-10">
              <MenuSection />
            </div>
          </div>
        </div>
        
        <div id="module-contacts" className="bg-[#F5F1E6] relative z-20 pt-10 pb-10">
          <ReservationSection />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;