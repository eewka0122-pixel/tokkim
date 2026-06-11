"use client";

import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added CardTitle import

const popularDishes = [
  // ... existing data
];

const PopularDishes = () => {
  return (
    <section
      id="popular"
      className="relative py-24 md:py-32 px-6 bg-stone-50"
    >
      {/* ... existing JSX */}
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
      {/* ... rest of the component */}
    </section>
  );
};

export default PopularDishes;