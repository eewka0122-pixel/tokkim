"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PopularDishes from "@/components/PopularDishes";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  
  // НОВОЕ: Теперь здесь хранится точное значение от 0 до 1
  // 0 - мы на самом верху, 1 - мы проскроллили первый экран
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Инерционный скролл и точное отслеживание прогресса для логотипа
  useEffect(() => {
    if (loading) return;

    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let isScrolling = false;

    const calculateProgress = (scrollY: number) => {
      // Рассчитываем процент скролла (от 0 до 1) относительно 85% первого экрана
      return Math.min(1, Math.max(0, scrollY / (window.innerHeight * 0.85)));
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

      // Обновляем прогресс плавно каждый кадр (60 FPS)
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
        // Обновляем прогресс, если пользователь тянет ползунок скролла мышкой
        setScrollProgress(calculateProgress(window.scrollY));
      }
    };

    // Задаем начальное значение при загрузке
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

  const bgPositionStyle = `calc(50% + ${mouseOffset.x * 30}px) calc(50% + ${mouseOffset.y * 30}px)`;

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
        /* ВОЗВРАЩАЕМ РЕЗКОСТЬ: Включаем чистое сглаживание без 3D-искажений */
        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }
        /* Анимация появления заголовков */
        @keyframes splitTextReveal {
          0% { transform: translateY(115%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .split-parent {
          overflow: hidden;
          display: inline-block;
          vertical-align: bottom;
        }
        .split-child {
          display: inline-block;
          animation: splitTextReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />

      <main className="min-h-screen text-[#3A3124]">
        <nav className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex items-center justify-between pointer-events-none">
          {/* ИЗМЕНЕНИЯ ЗДЕСЬ: Блок логотипа с идеальным наложением */}
          <div className="pointer-events-auto relative flex items-center h-32 md:h-40">
            {/* 1. Оригинальный (темный) логотип. 
                Проявляется от 0 до 100% при скролле вниз */}
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className="h-full w-auto object-contain drop-shadow-md" 
              style={{ opacity: scrollProgress }}
            />
            {/* 2. Белый логотип (с фильтром). 
                Исчезает при скролле вниз. Лежит ровно поверх первого. */}
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className="absolute top-0 left-0 h-full w-auto object-contain drop-shadow-md brightness-0 invert" 
              style={{ opacity: (1 - scrollProgress) * 0.9 }}
            />
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
            <GallerySection />
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-10" />
          </div>
        </div>
        
        <div className="bg-[#F5F1E6] relative z-20">
          <ReservationSection />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;