"use client";

import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const popularDishes = [
  {
    name: "Кимпаб с курицей",
    description: "Рис, нори, курица, овощи, соус терияки",
    price: "₩450",
    rating: 4.5,
    reviews: 34,
  },
  {
    name: "Пибимпаб с говядиной",
    description: "Говядина, рис, овощи, яйцо, гочучанг",
    price: "₩580",
    rating: 4.7,
    reviews: 27,
  },
  {
    name: "Рамен с морепродуктами",
    description: "Бульон, лапша, креветки, мидии, овощи",
    price: "₩650",
    rating: 4.6,
    reviews: 19,
  },
];

const PopularDishes = () => {
  return (
    <section id="popular" className="relative py-24 md:py-32 px-6 bg-stone-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 reveal">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-stone-900">
            Популярные блюда
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Лучшие позиции, выбранные нашими гостями
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularDishes.map((dish) => (
            <Card
              key={dish.name}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl hover:shadow-xl transition-shadow"
            >
              <CardHeader className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>
                    <h3 className="text-lg font-semibold text-stone-800">
                      {dish.name}
                    </h3>
                  </CardTitle>
                  <span className="whitespace-nowrap rounded-full bg-amber-200/50 px-3 py-1 text-sm text-amber-800">
                    {dish.price}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <p className="text-sm text-stone-500">{dish.description}</p>
                <div className="mt-3 flex items-center gap-1">
                  {[...Array(Math.floor(dish.rating))].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  {dish.rating % 1 >= 0.5 && (
                    <Star
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                      style={{ clipPath: "inset(0 50% 0 0)" }}
                    />
                  )}
                  <span className="ml-2 text-sm text-stone-500">
                    ({dish.reviews})
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;