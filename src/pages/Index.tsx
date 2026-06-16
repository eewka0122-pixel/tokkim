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
  
  // Состояние для выпадающего меню навигации
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Микро-параллакс фона от мыши
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Инерционный скролл и точное отслеживание прогресса для логотипа и кнопки
  useEffect(() => {
    if (loading) return;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let isScrolling = false;

    const calculateProgress = (scrollY: number) => {
      const startFade = window.innerHeight * 0.70;
      const endFade = window.innerHeight * 0.90;

      if (scrollY <= startFade) return 0; // Строго белый
      if (scrollY >= endFade) return 1;   // Строго темный

      return (scrollY - startFade) / (endFade - startFade);
    };

    const handleWheel = (e: WheelEvent) => {
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

      if (Math.abs(targetScrollY - currentScrollY) > 0.3) {
        requestAnimationFrame(updateScroll);
      } else {
        isScrolling = false;
      }
    };

    const handleScrollSync = () => {
      if (!isScrolling) {
        targetScrollY = window.scrollY;
        currentScrollY = window.scrollY;
        setScrollProgress(calculateProgress(window.scrollY));
      }
    };

    setScrollProgress(calculateProgress(window.scrollY));

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

  // Плавный скролл к якорям
  const scrollToSection = (id: string) => {
    setIsNavOpen(false); // Закрываем меню при клике на ссылку
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -50; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const bgPositionStyle = `calc(50% + ${mouseOffset.x * 30}px) calc(50% + ${mouseOffset.y * 30}px)`;

  // Динамические стили для кнопки меню (инверсия цвета)
  const menuButtonStyle = {
    backgroundColor: scrollProgress > 0.5 ? 'rgba(212, 185, 143, 0.2)' : 'rgba(255, 255, 255, 0.1)',
    color: scrollProgress > 0.5 ? '#3A3124' : '#FFFFFF',
    borderColor: scrollProgress > 0.5 ? 'rgba(212, 185, 143, 0.3)' : 'rgba(255, 255, 255, 0.2)'
  };

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
        
        {/* НАВИГАЦИЯ (Шапка) */}
        <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-center justify-between pointer-events-none">
          {/* Логотип-кнопка (на главную) */}
          <div 
            className="pointer-events-auto relative flex items-center h-32 md:h-40 cursor-pointer transition-transform hover:scale-105"
            onClick={() => scrollToSection("top")}
          >
            {/* Темный логотип */}
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className="h-full w-auto object-contain drop-shadow-md" 
              style={{ opacity: scrollProgress }}
            />
            {/* Белый логотип */}
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className="absolute top-0 left-0 h-full w-auto object-contain drop-shadow-md brightness-0 invert" 
              style={{ opacity: 1 - scrollProgress }}
            />
          </div>

          {/* Контейнер для Кнопки и Выпадающего меню */}
          <div className="pointer-events-auto relative">
            {/* Кнопка Гамбургер */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-all hover:scale-105"
              style={menuButtonStyle}
              aria-label="Меню"
            >
              {isNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Выпадающее меню (Dropdown) */}
            <div 
              className={`absolute top-full right-0 mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-gray-100 p-2 flex flex-col transition-all duration-300 origin-top-right ${
                isNavOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
              }`}
            >
              <button 
                onClick={() => scrollToSection("menu")}
                className="text-left px-5 py-3.5 rounded-xl font-bold text-[#3A3124] text-lg hover:bg-[#F5F1E6] hover:text-[#8C6D46] transition-colors"
              >
                Меню
              </button>
              <button 
                onClick={() => scrollToSection("about")}
                className="text-left px-5 py-3.5 rounded-xl font-bold text-[#3A3124] text-lg hover:bg-[#F5F1E6] hover:text-[#8C6D46] transition-colors"
              >
                О нас
              </button>
              <button 
                onClick={() => scrollToSection("contacts")}
                className="text-left px-5 py-3.5 rounded-xl font-bold text-[#3A3124] text-lg hover:bg-[#F5F1E6] hover:text-[#8C6D46] transition-colors"
              >
                Контакты
              </button>
            </div>
          </div>
        </nav>

        <HeroSection />

        {/* Блок 1 */}
        <div style={{ backgroundImage: "url('/images/bg1.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle, transition: "background-position 0.2s ease-out" }}>
          <div className="relative bg-[#F5F1E6]/60">
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
            <AboutSection />
            <PopularDishes />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
          </div>
        </div>

        {/* Блок 2 */}
        <div style={{ backgroundImage: "url('/images/bg2.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle, transition: "background-position 0.2s ease-out" }}>
          <div className="relative bg-[#F5F1E6]/60">
            <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
            <MenuSection />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
          </div>
        </div>
        
        {/* Блок 3: Контакты и Футер */}
        <div className="bg-[#F5F1E6] relative z-20">
          <ReservationSection />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;