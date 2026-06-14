"use client";

import { ArrowDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Возвращен твой исходный фон */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/bg1.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Возвращен твой исходный логотип в навигации */}
      <nav className="fixed top-0 left-0 w-full z-40 p-6 md:p-8 flex items-center justify-between">
        <img src="/images/logo (4).png" alt="ТОККИМ" className="h-20 md:h-28 w-auto object-contain drop-shadow-md" />
      </nav>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-black uppercase tracking-[0.05em] mb-12 drop-shadow-sm leading-tight">
          Корейский стрит-фуд<br /> нового поколения
        </h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <Button 
            onClick={scrollToMenu}
            className="rounded-full px-8 py-6 bg-[#D4B98F] text-black font-bold text-lg border border-[#D4B98F] shadow-md hover:bg-[#C3A87E] transition-all w-full sm:w-auto flex items-center gap-2"
          >
            Посмотреть меню
            <ArrowDown className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline"
            className="rounded-full px-8 py-6 bg-[#F5F1E6] text-black font-bold text-lg border border-[#D4B98F]/40 shadow-md hover:bg-white transition-all w-full sm:w-auto flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Заказать доставку
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F5F1E6] to-transparent z-10" />
    </section>
  );
};

export default HeroSection;