"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ChefHat, UtensilsCrossed, Wine } from "lucide-react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
};

type MenuCategory = "kimpap" | "bibimbap" | "ramen" | "soups" | "onigiri" | "snacks" | "salads";

const menuCategories: Record<MenuCategory, { label: string; icon: any; items: MenuItem[] }> = {
  kimpap: {
    label: "Кимпаб",
    icon: <ChefHat className="h-6 w-6" />,
    items: [
      {
        name: "Кимпаб с курицей",
        description: "Рис, нори, курица, овощи, соус терияки",
        price: "450₽",
      },
      {
        name: "Кимпаб с говядиной",
        description: "Маринованная говядина, рис, овощи, нори",
        price: "500₽",
      },
      {
        name: "Кимпаб с лососем",
        description: "Лосось, авокадо, огурец, рис, нори",
        price: "620₽",
      },
    ],
  },
  bibimbap: {
    label: "Пибимпаб",
    icon: <UtensilsCrossed className="h-6 w-6" />,
    items: [
      {
        name: "Пибимпаб с говядиной",
        description: "Говядина, рис, овощи, яйцо, гочучанг",
        price: "580₽",
      },
      {
        name: "Пибимпаб с овощами",
        description: "Сезонные овощи, рис, яйцо, соус",
        price: "480₽",
      },
    ],
  },
  ramen: {
    label: "Рамен",
    icon: <Wine className="h-6 w-6" />,
    items: [
      {
        name: "Рамен с курицей",
        description: "Бульон, лапша, курица, яйцо, нори",
        price: "520₽",
      },
      {
        name: "Рамен с морепродуктами",
        description: "Креветки, мидии, бульон, лапша",
        price: "650₽",
      },
    ],
  },
  soups: {
    label: "Супы",
    icon: () => <ChefHat className="h-6 w-6" />,
    items: [
      {
        name: "Том Ям с креветкой",
        description: "Острый том ям с лимоном и травами",
        price: "380₽",
      },
      {
        name: "Кимчи Джудже",
        description: "Кимчи, тофу, свинина, рисовые кексы",
        price: "350₽",
      },
    ],
  },
  onigiri: {
    label: "Онигири",
    icon: () => <ChefHat className="h-6 w-6" />,
    items: [
      {
        name: "Онигири с лососем",
        description: "Рисовый шарик с лососем, нори",
        price: "350₽",
      },
      {
        name: "Онигири с тунцом",
        description: "Тунец, рис, соевый соус",
        price: "340₽",
      },
    ],
  },
  snacks: {
    label: "Закуски",
    icon: () => <ChefHat className="h-6 w-6" />,
    items: [
      {
        name: "Корейские панккекки",
        description: "Свежие панккекки с соусом",
        price: "250₽",
      },
      {
        name: "Корейские блины",
        description: "Блины с начинкой из капусты",
        price: "230₽",
      },
    ],
  },
  salads: {
    label: "Салаты",
    icon: () => <ChefHat className="h-6 w-6" />,
    items: [
      {
        name: "Салат с грибами моэр",
        description: "Грибы, шпинат, орехи, соус мисо",
        price: "320₽",
      },
      {
        name: "Салат из моркови по-корейски",
        description: "Морковь, укроп, уксус, сахар",
        price: "280₽",
      },
    ],
  },
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("kimpap");

  return (
    <section
      id="menu"
      className="relative py-24 md:py-32 px-6 bg-stone-50"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-stone-200/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium uppercase tracking-wider mb-4">
            Полное меню
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-stone-900 tracking-tight mb-8">
            Меню
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {[Object.keys(menuCategories).map((key) => {
            const cat = key as MenuCategory;
            return (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-6 py-3 text-sm font-medium text-stone-700 ${
                  activeCategory === cat
                    ? "bg-amber-200 text-stone-900 hover:bg-amber-100"
                    : "border-stone-300 text-stone-200 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {menuCategories[cat].icon}
                <span className="ml-2">{menuCategories[cat].label}</span>
              </Button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuCategories[activeCategory].items.map((item) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white/10 p-6 rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-stone-800">{item.name}</h3>
                  <p className="mt-1 text-sm text-stone-500">{item.description}</p>
                </div>
                <span className="whitespace-nowrap rounded-full bg-amber-200/50 px-3 py-1 text-sm text-amber-800">
                  {item.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;