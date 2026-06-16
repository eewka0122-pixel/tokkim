"use client";

import { useEffect, useState, useRef } from "react";
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

  // Единый источник правды для инерционного скролла
  const scrollState = useRef({
    targetY: 0,
    currentY: 0,
    isScrolling: false
  });

  // Микро-параллакс фона
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Функция плавной анимации скролла
  const updateScroll = () => {
    const state = scrollState.current;
    state.currentY += (state.targetY - state.currentY) * 0.08;
    
    window.scrollTo(0, state.currentY);

    // Подсчет прогресса для изменения цвета шапки
    const startFade = window.innerHeight * 0.70;
    const endFade = window.innerHeight * 0.90;
    let progress = 0;
    if (state.currentY > startFade) {
      progress = state.currentY >= endFade ? 1 : (state.currentY - startFade) / (endFade - startFade);
    }
    setScrollProgress(progress);

    // Определение активной секции
    const sections = ["module-about", "module-menu", "module-contacts"];
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

    // Продолжаем анимацию, пока не достигнем цели
    if (Math.abs(state.targetY - state.currentY) > 0.5) {
      requestAnimationFrame(updateScroll);
    } else {
      state.isScrolling = false;
    }
  };

  // Скролл колесом мыши
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
    };

    // Инициализация при старте
    scrollState.current.targetY = window.scrollY;
    scrollState.current.currentY = window.scrollY;

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScrollSync);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScrollSync);
    };
  }, [loading]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  // СКРОЛЛ ПО КЛИКУ: Соединяем красную линию с красной точкой
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

  const bgPositionStyle = `calc(50% + ${mouseOffset.x * 30}px) calc(50% + ${mouseOffset.y * 30}px)`;

  // Интерполяция цвета шапки и меню
  const r = Math.round(255 - (255 - 58) * scrollProgress);
  const g = Math.round(255 - (255 - 49) * scrollProgress);
  const b = Math.round(255 - (255 - 36) * scrollProgress);
  const syncColor = `rgb(${r}, ${g}, ${b})`;
  const syncShadow = scrollProgress < 0.5 ? "0 2px 8px rgba(0,0,0,0.5)" : "none";

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
    { id: "module-menu", label: "Акции и скидки" },
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

      <main className="min-h-screen text-[#3A3124]">

        {/* НАВИГАЦИЯ */}
        <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-start justify-between pointer-events-none">
          
          {/* Левый блок: Логотип и меню */}
          <div className="flex flex-col items-start pointer-events-auto">
            <div 
              className="relative flex items-center h-20 md:h-24 cursor-pointer transition-transform hover:scale-105 origin-left z-10"
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

            {/* Ссылки с обводкой активного пункта */}
            <div className="flex flex-col items-start gap-1 md:gap-1.5 mt-2 pl-1">
              {navLinks.map((link, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollToSection(link.id)} 
                  className={`text-left font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 px-2 py-0.5 -ml-2 rounded-sm ${
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

        {/* ГЛАВНЫЙ ЭКРАН С ВИДЕО-ФОНОМ */}
        <div className="relative w-full min-h-screen">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="/hero.mp4" type="video/mp4" />
            <source src="/video.mp4" type="video/mp4" />
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          
          <div className="relative z-10 w-full h-full">
            <HeroSection />
          </div>
        </div>

        {/* Блок 1: О НАС */}
        <div id="module-about" style={{ backgroundImage: "url('/images/bg1.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle, transition: "background-position 0.2s ease-out" }}>
          <div className="relative bg-[#F5F1E6]/60">
            {/* Идеальный блюр стыка: короткий и строго ПОД контентом (z-0) */}
            <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#F5F1E6] via-[#F5F1E6]/90 to-transparent pointer-events-none z-0" />
            <div className="relative z-10">
              <AboutSection />
              <PopularDishes />
            </div>
          </div>
        </div>

        {/* Блок 2: НАШЕ МЕНЮ */}
        <div id="module-menu" style={{ backgroundImage: "url('/images/bg2.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle, transition: "background-position 0.2s ease-out" }}>
          <div className="relative bg-[#F5F1E6]/60">
            {/* Идеальный блюр стыка: короткий и строго ПОД контентом (z-0) */}
            <div className="absolute top-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-[#F5F1E6] via-[#F5F1E6]/90 to-transparent pointer-events-none z-0" />
            <div className="relative z-10">
              <MenuSection />
            </div>
          </div>
        </div>
        
        {/* Блок 3: КОНТАКТЫ И ДОСТАВКА */}
        <div id="module-contacts" className="bg-[#F5F1E6] relative z-20 pt-10 pb-10">
          <ReservationSection />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;