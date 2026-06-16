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
  
  // Состояние для полноэкранного меню навигации
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  // Состояние для отслеживания активного экрана (чтобы рисовать рамочку)
  const [activeSection, setActiveSection] = useState("");

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

  // Блокировка скролла всей страницы при открытом полноэкранном модуле
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

  // Инерционный скролл и точное отслеживание прогресса
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

    const handleScrollSync = () => {
      if (!isScrolling) {
        targetScrollY = window.scrollY;
        currentScrollY = window.scrollY;
        setScrollProgress(calculateProgress(window.scrollY));
        updateActiveSection(window.scrollY);
      }
    };

    // Функция для определения, какой блок сейчас на экране (для рамки вокруг ссылок)
    const updateActiveSection = (scrollY: number) => {
      const sections = ["about", "menu", "contacts"];
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Если верхняя граница блока пересекла середину экрана
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    setScrollProgress(calculateProgress(window.scrollY));
    updateActiveSection(window.scrollY);

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

  // Плавный скролл к якорям (ТЕПЕРЬ СТРОГО НА ВЕСЬ ЭКРАН)
  const scrollToSection = (id: string) => {
    setIsNavOpen(false); 
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      // ИСПРАВЛЕНИЕ: Отступ равен 0. Блок встает ровно по границе экрана.
      const yOffset = 0; 
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const bgPositionStyle = `calc(50% + ${mouseOffset.x * 30}px) calc(50% + ${mouseOffset.y * 30}px)`;

  // Точная одновременная интерполяция цветов для всех элементов шапки
  const r = Math.round(255 - (255 - 58) * scrollProgress);
  const g = Math.round(255 - (255 - 49) * scrollProgress);
  const b = Math.round(255 - (255 - 36) * scrollProgress);
  const syncColor = `rgb(${r}, ${g}, ${b})`;
  const syncShadow = `0 2px 8px rgba(0,0,0,${(1 - scrollProgress) * 0.6})`;

  const btnR = Math.round(255 - (255 - 212) * scrollProgress);
  const btnG = Math.round(255 - (255 - 185) * scrollProgress);
  const btnB = Math.round(255 - (255 - 143) * scrollProgress);
  const syncBtnBg = `rgba(${btnR}, ${btnG}, ${btnB}, ${0.1 + scrollProgress * 0.1})`;
  const syncBtnBorder = `rgba(${btnR}, ${btnG}, ${btnB}, ${0.2 + scrollProgress * 0.1})`;

  const navLinks = [
    { id: "about", label: "О нас" },
    { id: "menu", label: "Наше меню" },
    { id: "contacts", label: "Доставка" },
    { id: "contacts", label: "Контакты" },
    { id: "menu", label: "Акции и скидки" },
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
        
        {/* НАВИГАЦИЯ (Статичная фиксированная шапка) */}
        <nav className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex items-start justify-between pointer-events-none">
          
          {/* Левый блок: Логотип и список */}
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

            <div className="flex flex-col items-start gap-1 md:gap-1.5 -mt-2">
              {navLinks.map((link, idx) => (
                <button 
                  key={idx}
                  onClick={() => scrollToSection(link.id)} 
                  className={`text-left font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 border border-transparent px-2 py-1 -ml-2 rounded-sm ${
                    activeSection === link.id ? "!border-current" : "hover:opacity-60"
                  }`} 
                  style={{ color: syncColor, textShadow: syncShadow }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Правый блок: Кнопка вызова полноэкранного модуля */}
          <div className="pointer-events-auto">
            <button
              onClick={() => setIsNavOpen(true)}
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border shadow-lg transition-all hover:scale-105"
              style={{ backgroundColor: syncBtnBg, borderColor: syncBtnBorder, color: syncColor }}
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* СТРОГО ПОЛНОЭКРАННЫЙ МОДУЛЬ НАВИГАЦИИ (ГАМБУРГЕР) */}
        <div 
          className={`fixed inset-0 z-[110] bg-[#3A3124]/98 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-out ${
            isNavOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4 pointer-events-none'
          }`}
        >
          {/* Кнопка закрытия модуля */}
          <button
            onClick={() => setIsNavOpen(false)}
            className="absolute top-8 right-8 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20"
            aria-label="Закрыть меню"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Вертикальный список разделов строго по центру экрана */}
          <div className="flex flex-col items-center space-y-6 md:space-y-10">
            {navLinks.map((link, idx) => (
              <button 
                key={`fullscreen-${idx}`}
                onClick={() => scrollToSection(link.id)}
                className="font-serif text-4xl md:text-6xl font-bold text-white hover:text-[#D4B98F] transition-colors relative group tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-[#D4B98F] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </div>
        </div>

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