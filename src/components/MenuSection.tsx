"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type MenuCategory = "kimpap" | "bibimbap" | "ramen" | "soups" | "onigiri" | "snacks" | "salads";

const menuCategories: Record<MenuCategory, { label: string; items: { name: string; description: string; price: string; image: string }[] }> = {
  kimpap: { label: "Кимпаб", items: [{ name: "Кимпаб с курицей", description: "Рис, нори, курица, овощи, соус терияки", price: "₩6,500", image: "/images/Кимпаб с курицей.jpeg" }, { name: "Кимпаб с говядиной", description: "Маринованная говядина, рис, овощи, нори", price: "₩7,500", image: "/images/Кимпаб с говядиной.jpeg" }, { name: "Кимпаб с лососем", description: "Лосось, авокадо, огурец, рис, нори", price: "₩8,500", image: "/images/Кимпаб с лососем.jpeg" }] },
  bibimbap: { label: "Пибимпаб", items: [{ name: "Пибимпаб с говядиной", description: "Говядина, рис, овощи, яйцо, гочучанг", price: "₩9,000", image: "/images/Пибимпаб с говядиной.jpeg" }, { name: "Пибимпаб с овощами", description: "Сезонные овощи, рис, яйцо, соус", price: "₩7,500", image: "/images/Пибмпаб с овощами.jpeg" }, { name: "Пибимпаб с креветкой", description: "Креветки, рис, овощи, яйцо", price: "₩10,000", image: "/images/Пибимпаб с креветкой.jpeg" }] },
  ramen: { label: "Рамен", items: [{ name: "Рамен с курицей", description: "Бульон, лапша, курица, яйцо, нори", price: "₩7,000", image: "/images/Рамен с курицей.jpeg" }, { name: "Рамен с морепродуктами", description: "Креветки, мидии, бульон, лапша", price: "₩9,500", image: "/images/Рамен с креветкой.jpeg" }] },
  soups: { label: "Супы", items: [{ name: "Том Ям с креветкой", description: "Острый том ям с лимоном и травами", price: "₩6,000", image: "/images/Том ям с креветкой.jpeg" }, { name: "Кимчи Джудже", description: "Кимчи, тофу, свинина, рисовые кексы", price: "₩5,500", image: "/images/Кимчи.jpeg" }] },
  onigiri: { label: "Онигири", items: [{ name: "Онигири с лососем", description: "Рисовый шарик с лососем, нори", price: "₩4,500", image: "/images/Онигири с лососем.jpeg" }, { name: "Онигири с крабом", description: "Краб, рис, соевый соус", price: "₩5,000", image: "/images/Онигири с крабом.jpeg" }] },
  snacks: { label: "Закуски", items: [{ name: "Корейские панккекки", description: "Свежие панккекки с соусом", price: "₩3,500", image: "/images/Морковка по корейски.jpeg" }, { name: "Корейские блины", description: "Блины с начинкой из капусты", price: "₩3,000", image: "/images/Салат с грибами моэр.jpeg" }] },
  salads: { label: "Салаты", items: [{ name: "Салат с грибами моэр", description: "Грибы, шпинат, орехи, соус мисо", price: "₩5,000", image: "/images/Салат с грибами моэр.jpeg" }, { name: "Салат из моркови по-корейски", description: "Морковь, укроп, уксус, сахар", price: "₩2,800", image: "/images/Морковка по корейски.jpeg" }] },
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("kimpap");

  return (
    <section id="menu" className="py-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124]">Наше меню</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(menuCategories).map((key) => {
            const cat = key as MenuCategory;
            return (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-3 ${activeCategory === cat ? "bg-[#D4B98F] text-[#3A3124]" : "border-[#D4B98F]/30"}`}
              >
                {menuCategories[cat].label}
              </Button>
            );
          })}
        </div>

        {/* Сетка, которая гарантированно покажет все элементы */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuCategories[activeCategory].items.map((item) => (
            <Card key={item.name} className="rounded-3xl border-0 bg-white/60 backdrop-blur-sm shadow-xl">
              <div className="relative h-56 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-[#D4B98F] text-[#3A3124] px-3 py-1.5 rounded-full font-bold text-sm">{item.price}</div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2">{item.name}</h3>
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