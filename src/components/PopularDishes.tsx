"use client";

import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const popularDishes = [
  {
    id: 1,
    name: "Кимпаб с курицей",
    description: "Нежная курица, свежие овощи, рис, нори, соус терияки",
    price: "450₽",
    rating: 4.9,
    reviews: 234,
    image: "/images/Кимпаб с курицей.jpeg",
    badge: "Хит продаж",
    category: "Кимпаб",
  },
  {
    id: 2,
    name: "Пибимпаб с говядиной",
    description: "Маринованная говядина, рис, овощи, яйцо пашот, гочучанг",
    price: "580₽",
    rating: 4.8,
    reviews: 189,
    image: "/images/Пибимпаб с говядиной.jpeg",
    badge: "Новинка",
    category: "Пибимпаб",
  },
  {
    id: 3,
    name: "Рамен с курицей",
    description: "Наваристый бульон, курица, яйцо, водоросли, грибы, лапша",
    price: "520₽",
    rating: 4.9,
    reviews: 312,
    image: "/images/Рамен с курицей.jpeg",
    badge: "Любимец гостей",
    category: "Рамен",
  },
  {
    id: 4,
    name: "Кимпаб с лососем",
    description: "Свежий лосось, авокадо, огурец, рис, нори, унаги соус",
    price: "620₽",
    rating: 4.7,
    reviews: 156,
    image: "/images/Кимпаб с лососем.jpeg",
    badge: "Премиум",
    category: "Кимпаб",
  },
  {
    id: 5,
    name: "Суп Том Ям с креветкой",
    description: "Острый том ям с креветками, лимоном и свежими травами",
    price: "380₽",
    rating: 4.6,
    reviews: 98,
    image: "/images/Том ям с креветкой.jpeg",
    badge: "Острый",
    category: "Супы",
  },
  {
    id: 6,
    name: "Онигири с лососем",
    description: "Рисовые шарики с лососем, обёрнутые в нори",
    price: "350₽",
    rating: 4.5,
    reviews: 76,
    image: "/images/Онигири с лососем.jpeg",
    badge: "Классика",
    category: "Онигири",
  },
];

const PopularDishes = () => {
  return (
    <section
      id="popular"
      className="relative py-24 md:py-32 px-6 bg-stone-50"
    >
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl float reveal reveal-delay-100" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-stone-200/50 blur-3xl float reveal reveal-delay-200" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 reveal reveal-delay-100">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium uppercase tracking-wider mb-4">
            Популярные блюда
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-stone-900 tracking-tight mb-8">
            Наши хиты
          </h2>
        </div>

        {/* Grid of Dishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-white/10 p-6 rounded-lg shadow-sm hover:shadow-xl group reveal reveal-delay-200"
            >
              <div className="relative h-48 w-full rounded-md overflow-hidden mb-4">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badge */}
                <div className="absolute top-2 left-2 rounded-md bg-amber-400 text-amber-100 px-2 py-1 text-xs font-medium">
                  {dish.badge}
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>
                    <h3 className="text-lg font-semibold text-stone-800">{dish.name}</h3>
                  </CardTitle>
                  <span className="whitespace-nowrap rounded-full bg-amber-200/50 px-3 py-1 text-sm text-amber-800">
                    {dish.price}
                  </span>
                </div>
                <CardContent>
                  <p className="mt-2 text-sm text-stone-500">{dish.description}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(dish.rating.toFixed(1).split(".")[0])].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-300 text-yellow-300"
                      />
                    ))}
                    <span className="text-sm text-stone-500">
                      ({dish.reviews})
                    </span>
                  </div>
                </CardContent>
              </CardHeader>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-4">
                <Button
                  asChild
                  className="rounded-full bg-amber-200 px-5 py-2 text-sm font-medium text-stone-900 hover:bg-amber-100 transition-colors"
                >
                  Подробнее
                </Button>
                <Heart
                  className="h-5 w-5 text-red-400"
                  stroke="solid"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Animation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-stone-400 reveal reveal-delay-300">
          <span>Каждое блюдо — история вкуса</span>
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;