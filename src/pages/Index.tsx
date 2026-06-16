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
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Исходный микро-параллакс фона
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMouseOffset({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Логика скролла (Смена цвета и активной секции)
  useEffect(() => {
    const handleScroll = () => {
      // ИСПРАВЛЕНО: Цвет меняется только когда прокрутили видео (минус 100px для плавности)
      setIsScrolled(window.scrollY > window.innerHeight - 100);

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
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Чтобы цвет сразу стал правильным при загрузке
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  // Плавный скролл до нужного блока
  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      // Учитываем отступ под боковое меню на разных экранах
      const yOffset = window.innerWidth >= 768 ? 96 : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - yOffset, behavior: "smooth" });
    }
  };

  const bgPositionStyle = `calc(50% + ${mouseOffset.x * 30}px) calc(50% + ${mouseOffset.y * 30}px)`;

  const navLinks = [
    { id: "module-about", label: "О нас" },
    { id: "module-promos", label: "Акции и скидки" },
    { id: "module-menu", label: "Наше меню" },
    { id: "module-contacts", label: "Доставка" },
    { id: "module-contacts", label: "Контакты" },
  ];

  return (
    <>
      {/* Исходные системные стили, которые я по тупости удалил */}
      <style dangerouslySetInnerHTML={{__html: `
        html {
          scrollbar-gutter: stable;
          scroll-behavior: smooth !important;
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
          <div className="flex flex-col items-start pointer-events-auto">
            <div
              className="relative flex items-center h-20 md:h-24 cursor-pointer transition-transform hover:scale-105 origin-left z-10"
              onClick={() => scrollToSection("top")}
            >
              <img
                src="/images/logo (4).png"
                alt="ТОККИМ"
                className={`h-full w-auto object-contain drop-shadow-md transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
              />
              <img
                src="/images/logo (4).png"
                alt="ТОККИМ"
                className={`absolute top-0 left-0 h-full w-auto object-contain drop-shadow-md brightness-0 invert transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
              />
            </div>

            {/* Ссылки меню */}
            <div className="flex flex-col items-start gap-1 md:gap-1.5 mt-2 pl-1">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left font-bold text-sm md:text-base uppercase tracking-wider transition-all duration-200 px-2 py-0.5 -ml-2 rounded-sm ${
                    activeSection === link.id ? "border border-[#3A3124]" : "border border-transparent hover:opacity-60"
                  }`}
                  style={{
                    color: isScrolled ? "#2A2118" : "#FFFFFF",
                    textShadow: isScrolled ? "none" : "0 2px 8px rgba(0,0,0,0.5)"
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* ГЛАВНЫЙ ЭКРАН С ВИДЕО-ФОНОМ (Вернул все видео-сурсы) */}
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

        {/* Блок 1: О НАС И АКЦИИ (Строгая старая верстка без лишних w-full h-full) */}
        <div id="module-about" style={{ backgroundImage: "url('/images/bg1.jpeg')", backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: bgPositionStyle, transition: "background-position 0.2s ease-out" }}>
          <div className="relative bg-[#F5F1E6]/60">
            {/* Идеальный блюр стыка: короткий и строго ПОД контентом */}
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