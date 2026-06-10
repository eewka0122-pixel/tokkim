"use client";

import { useState } from "react";
import { ChefHat, UtensilsCrossed, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";

type MenuItem = {
  name: string;
  description: string;
  price: string;
};

type MenuCategory = "tasting" | "a-la-carte" | "wine";

const menuCategories = [
  { id: "tasting", label: "Tasting", icon: ChefHat },
  { id: "a-la-carte", label: "A la carte", icon: UtensilsCrossed },
  { id: "wine", label: "Wine & Soju", icon: Wine },
] as const;

const menuItems: Record<MenuCategory, MenuItem[]> = {
  tasting: [
    {
      name: "Royal Court Course",
      description:
        "Nine seasonal courses inspired by Joseon-era banquet traditions.",
      price: "₩180,000",
    },
    {
      name: "Han River Omakase",
      description:
        "Chef-selected seafood, beef, banchan, and a warm finishing stew.",
      price: "₩220,000",
    },
    {
      name: "Vegetal Temple Course",
      description:
        "Plant-forward Korean temple cuisine with mushrooms, greens, and grains.",
      price: "₩130,000",
    },
  ],
  "a-la-carte": [
    {
      name: "Charcoal Galbi",
      description:
        "Marinated short ribs grilled tableside with seasonal ssam.",
      price: "₩72,000",
    },
    {
      name: "Jeonju Bibimbap",
      description:
        "Stone bowl rice with heirloom vegetables, gochujang, and egg yolk.",
      price: "₩34,000",
    },
    {
      name: "Seafood Haemul Pajeon",
      description:
        "Crisp scallion pancake with squid, shrimp, and dipping soy.",
      price: "₩38,000",
    },
  ],
  wine: [
    {
      name: "Korean Soju Pairing",
      description:
        "Three premium soju selections paired with banchan and grilled dishes.",
      price: "₩58,000",
    },
    {
      name: "Sommelier Wine Pairing",
      description:
        "Five glasses selected for spice, umami, fermentation, and richness.",
      price: "₩95,000",
    },
    {
      name: "Makgeolli Flight",
      description:
        "Traditional rice wine served chilled, sparkling, and aged.",
      price: "₩48,000",
    },
  ],
};

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("tasting");

  return (
    <section
      id="menu"
      className="bg-stone-900 px-4 py-24 text-stone-50 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-200">
            Menu
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            A menu shaped by season, fire, and fermentation.
          </h2>
          <p className="mt-4 text-lg leading-8 text-stone-400">
            Explore refined tasting courses, premium grill selections, and
            curated Korean beverage pairings.
          </p>
        </div>

        <div className="reveal reveal-delay-100 mt-10 flex flex-wrap justify-center gap-3">
          {menuCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-6 ${
                  activeCategory === category.id
                    ? "bg-amber-200 text-stone-950 hover:bg-amber-100"
                    : "border-stone-700 text-stone-200 hover:bg-stone-800 hover:text-white"
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        <div className="reveal reveal-delay-200 mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2">
          {menuItems[activeCategory].map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-stone-50">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-stone-400">{item.description}</p>
                </div>
                <span className="whitespace-nowrap text-amber-100">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;