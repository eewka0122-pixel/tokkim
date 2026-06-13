"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ... (оставь здесь свой объект menuCategories без изменений)

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("kimpap");

  return (
    // bg-transparent позволяет видеть картинку фона, которую мы поставим в Index.tsx
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuCategories[activeCategory].items.map((item) => (
            <Card
              key={item.name}
              className="group overflow-hidden rounded-3xl border-0 bg-white/60 backdrop-blur-sm shadow-xl shadow-[#D4B98F]/10 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-[#D4B98F] text-[#3A3124] px-3 py-1.5 rounded-full font-bold text-sm">
                  {item.price}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold text-[#3A3124] mb-2">
                  {item.name}
                </h3>
                <p className="text-[#6B5E48] text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;