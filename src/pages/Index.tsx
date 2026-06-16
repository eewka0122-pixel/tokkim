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
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Единый источник правды для инерционного скролла, чтобы клик и колесо мыши не конфликтовали
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

  // Блокировка скролла при открытом бургере
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

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

    // Определение активной секции в меню
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
      if (isNavOpen) return;
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
  }, [loading, isNavOpen]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  // Скролл строго в край экрана (yOffset = 0, так как мы урезали отступы внутри компонентов)
  const scrollToSection = (id: string) => {
    setIsNavOpen(false); 
    
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
      const yOffset = 0; 
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

  const btnR = Math.round(255 - (255 - 212) * scrollProgress);
  const btnG = Math.round(255 - (255 - 185) * scrollProgress);
  const btnB = Math.round(255 - (255 - 143) * scrollProgress);
  const syncBtnBg = `rgba(${btnR}, ${btnG}, ${btnB}, ${0.1 + scrollProgress * 0.1})`;
  const syncBtnBorder = `rgba(${btnR}, ${btnG}, ${btnB}, ${0.2 + scrollProgress * 0.1})`;

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

          {/* Правый блок: Гамбургер */}
          <div className="pointer-events-auto relative mt-2">
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: syncBtnBg, borderColor: syncBtnBorder, color: syncColor }}
              aria-label="Меню"
            >
              {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Выпадающий список */}
            <div 
              className={`absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-2 flex flex-col transition-all duration-300 origin-top-right ${
                isNavOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'
              }`}
            >
              {navLinks.map((link, idx) => (
                <button 
                  key={`drop-${idx}`}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-5 py-3.5 rounded-xl font-bold text-[#3A3124] text-lg hover:bg-[#F5F1E6] hover:text-[#8C6D46] transition-colors"
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
            <AboutSection />
            <PopularDishes />
          </div>
        </div>

        {/* Блок 2: НАШЕ МЕНЮ */}
        <div id="module-menu" style={{ backgroundImage: "url('/images/bg2.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle, transition: "background-position 0.2s ease-out" }}>
          <div className="relative bg-[#F5F1E6]/60">
            <MenuSection />
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