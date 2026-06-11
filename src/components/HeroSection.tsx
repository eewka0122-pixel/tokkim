"use client";

import { ArrowDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video/Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555396279-76fa6242a621?auto=format&fit=crop&w=2200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A3124]/80 via-[#3A3124]/60 to-[#F5F1E6]" />
        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4B98F]/20 rounded-full blur-3xl float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#D4B98F]/30 rounded-full blur-3xl float" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 text-center text-[#F5F1E6]">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8 reveal">
            <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.03em] mb-4">
              TOKKIM
            </h1>
            <p className="text-lg md:text-xl opacity-90 tracking-widest uppercase">
              Корейский стрит-фуд нового поколения
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 reveal-delay-100">
            <Button
              size="lg"
              className="group px-10 py-5 rounded-full bg-[#D4B98F] text-[#3A3124] font-semibold text-base hover:bg-[#C1A67D] transition-all duration-300 shadow-2xl shadow-black/20"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Посмотреть меню
              <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group px-10 py-5 rounded-full border-[#D4B98F] text-[#D4B98F] font-semibold text-base hover:bg-[#D4B98F]/20 transition-all duration-300 backdrop-blur"
              onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Заказать доставку
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 reveal-delay-200">
        <ArrowDown className="h-7 w-7 text-[#F5F1E6]/60 bounce" />
      </div>
    </section>
  );
};

export default HeroSection;