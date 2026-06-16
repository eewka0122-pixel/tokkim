"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  // Функция, которая перехватывает клик и отправляет его в наш идеальный алгоритм скролла из Index.tsx
  const scrollToModule = (id: string) => {
    if (typeof window !== "undefined" && typeof (window as any).customScrollTo === "function") {
      (window as any).customScrollTo(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section relative flex items-center justify-center overflow-hidden min-h-screen">
      
      {/* Видео на фоне */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-[50%_100%] z-0"
        poster="/images/hero-bg.jpg"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Киноэффект — Блюр по краям */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none backdrop-blur-[12px]"
        style={{
          // Радиальная маска: 50% в центре - прозрачно (без блюра), к краям плавно размывается
          maskImage: "radial-gradient(circle, transparent 50%, black 100%)",
          WebkitMaskImage: "radial-gradient(circle, transparent 50%, black 100%)"
        }}
      />
      
      {/* Легкое затемнение по углам (виньетка) для глубины кадра */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.3)_100%)]" />

      {/* 100% прозрачный слой (основной) */}
      <div className="absolute inset-0 bg-transparent z-0 pointer-events-none" />
      
      <div className="relative z-10 px-6 text-center text-[#3A3124] w-full">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-6 reveal flex flex-col items-center w-full">
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className="w-full max-w-[350px] md:max-w-[600px] lg:max-w-[700px] object-contain mb-4 drop-shadow-2xl mx-auto transform translate-x-16 md:translate-x-32"
            />
            <p className="text-xl md:text-2xl font-bold opacity-90 tracking-[0.2em] uppercase text-[#3A3124] drop-shadow-sm">
              Корейский стрит-фуд нового поколения
            </p>
          </div>
          
          {/* Блок с кнопкой */}
          <div className="flex flex-col sm:flex-row items-center justify-center mt-10 reveal-delay-100">
            <Button 
              size="lg" 
              className="group px-10 py-6 rounded-full bg-[#D4B98F]/60 border border-white/50 text-[#3A3124] font-bold text-lg hover:bg-[#D4B98F]/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105" 
              onClick={() => scrollToModule("module-menu")}
            >
              Посмотреть меню
              <ArrowDown className="ml-2 h-6 w-6 transition-transform group-hover:translate-y-1" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 reveal-delay-200 z-10 pointer-events-none">
        <ArrowDown className="h-8 w-8 text-[#3A3124]/80 bounce" />
      </div>

      {/* Нижний градиент (Дымка) - ИСПРАВЛЕНО: Сделал ее ниже (h-24 вместо h-48) */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F5F1E6] to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;