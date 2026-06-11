"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=2200&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/95 via-stone-50/70 to-stone-100/40" />
        {/* Animated floating shapes */}
        <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl float reveal reveal-delay-100" />
        <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-stone-200/50 blur-3xl float reveal reveal-delay-200" />
      </div>

      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto text-center">
        {/* Badge with pulse and rotate */}
        <div className="inline-flex items-center gap-3 rounded-full bg-white/80 border border-stone-200 px-6 py-3 mb-8 backdrop-blur-sm shadow-sm pulse-rotate reveal reveal-delay-100">
          <Sparkles className="h-5 w-5 text-amber-600" />
          <span className="text-sm font-medium text-stone-700 uppercase tracking-wider">Новое меню 2024</span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-stone-900 tracking-tight leading-[1.05] mb-6 reveal reveal-delay-200">
          ТОККИМ
        </h1>

        <p className="text-lg md:text-xl text-stone-600 font-medium uppercase tracking-widest mb-12 max-w-2xl mx-auto reveal reveal-delay-300">
          Корейский стрит-фуд
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal reveal-delay-400">
          <Button
            size="lg"
            className="group w-full sm:w-auto px-10 py-4 rounded-full bg-stone-900 text-stone-50 font-medium text-base hover:bg-stone-700 transition-all duration-300 shadow-lg shadow-stone-900/20"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Посмотреть меню
            <ArrowDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group w-full sm:w-auto px-10 py-4 rounded-full border-stone-300 bg-white/80 text-stone-700 font-medium text-base hover:bg-stone-100 hover:border-stone-400 transition-all duration-300 backdrop-blur-sm"
            onClick={() => document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Заказать доставку
          </Button>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-12 text-sm text-stone-50 reveal reveal-delay-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Свежие ингредиенты</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Приготовлено на глазах</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Доставка за 30 мин</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 reveal reveal-delay-600">
          <ArrowDown className="h-6 w-6 bounce" />
          <span className="text-xs uppercase tracking-wider">Прокрутите вниз</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;