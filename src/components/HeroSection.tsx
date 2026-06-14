"use client";

import { ArrowDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновая картинка с легким светлым оверлеем для читаемости текста (БЕЗ РАЗМЫТИЯ) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/bg1.jpeg')", // Убедись, что путь к картинке верный
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-[#F5F1E6]/40" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-black uppercase tracking-[0.2em] mb-12 drop-shadow-sm">
          Корейский стрит-фуд<br className="md:hidden" /> нового поколения
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          {/* Плашка 1: Плотная, четкая, без блюра */}
          <Button 
            onClick={scrollToMenu}
            className="rounded-full px-8 py-6 bg-[#D4B98F] text-black font-bold text-lg border border-[#D4B98F] shadow-md hover:bg-[#C3A87E] hover:shadow-lg hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center gap-2"
          >
            Посмотреть меню
            <ArrowDown className="w-5 h-5" />
          </Button>
          
          {/* Плашка 2: Плотная светлая, четкая, без блюра */}
          <Button 
            variant="outline"
            className="rounded-full px-8 py-6 bg-[#F5F1E6] text-black font-bold text-lg border-2 border-[#D4B98F]/40 shadow-md hover:bg-white hover:border-[#D4B98F] hover:shadow-lg hover:-translate-y-1 transition-all w-full sm:w-auto flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Заказать доставку
          </Button>
        </div>
      </div>
      
      {/* Градиент для плавного перехода к следующей секции */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#F5F1E6] to-transparent z-10" />
    </section>
  );
};

export default HeroSection;