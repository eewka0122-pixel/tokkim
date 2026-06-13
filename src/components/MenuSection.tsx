"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ... (оставь тот же массив menuCategories, который у тебя был) ...
// (я сократил здесь для краткости, но ты оставь свой массив целиком)

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("kimpap");

  return (
    // ВАЖНО: здесь bg-transparent, чтобы фон из Index.tsx просвечивал
    <section id="menu" className="py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            Полное меню
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
            Наше меню
          </h2>
          <p className="mt-6 text-lg text-[#6B5E48] max-w-2xl mx-auto">
            Познакомьтесь с нашими блюдами, созданными с заботой о деталях
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 reveal">
          {Object.keys(menuCategories).map((key) => {
            const cat = key as MenuCategory;
            return (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#D4B98F] text-[#3A3124] border-[#D4B98F] shadow-lg shadow-[#D4B98F]/30"
                    : "border-[#D4B98F]/30 text-[#6B5E48] hover:bg-[#D4B98F]/10"
                }`}
              >
                {menuCategories[cat].label}
              </Button>
            );
          })}
        </div>