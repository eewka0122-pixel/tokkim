"use client";

import { ArrowDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section 
      className="hero-section relative flex items-center justify-center overflow-hidden min-h-screen" 
      style={{ 
        backgroundImage: "url('/images/hero-bg.jpg')", 
        backgroundSize: "cover", 
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat" 
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-white/5" />
      
      <div className="relative z-10 px-6 text-center text-[#3A3124] w-full">
        <div className="max-w-5xl mx-auto w-full">
          <div className="mb-6 reveal flex flex-col items-center w-full">
            <img 
              src="/images/logo (4).png" 
              alt="ТОККИМ" 
              className="w-full max-w-[350px] md:max-w-[600px] lg:max-w-[700px] object-contain mb-4 drop-shadow-2xl mx-auto relative left-6 md:left-12"
            />
            <p className="text-xl md:text-2xl font-bold opacity-90 tracking-[0.2em] uppercase text-[#3A3124] drop-shadow-sm">
              Корейский стрит-фуд нового поколения
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 reveal-delay-100">
            <Button 
              size="lg" 
              className="group px-10 py-6 rounded-full bg-[#D4B98F]/40 backdrop-blur-md border border-white/50 text-[#3A3124] font-bold text-lg hover:bg-[#D4B98F]/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105" 
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
            >
              Посмотреть меню
              <ArrowDown className="ml-2 h-6 w-6 transition-transform group-hover:translate-y-1" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-10 py-6 rounded-full bg-white/20 backdrop-blur-md border border-white/60 text-[#3A3124] font-bold text-lg hover:bg-white/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105" 
              onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Calendar className="mr-2 h-6 w-6" />
              Заказать доставку
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 reveal-delay-200">
        <ArrowDown className="h-8 w-8 text-[#3A3124]/80 bounce" />
      </div>

      {/* НОВЫЙ СЛОЙ: Мягкий градиент для плавного растворения картинки в бежевый цвет */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#F5F1E6] to-[#F5F1E6]/0 pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;