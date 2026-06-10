"use client";

import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { H3 } from "@/components/ui/h3";
import { P } from "@/components/ui/p";

const SignatureDishes = () => {
  const dishes = [
    {
      name: "Galbi",
      description: "Premium marinated short ribs",
      price: "$45",
      image: "https://source.unsplash.com/random/600x400?galbi",
    },
    {
      name: "Bibimbap",
      description: "Mixed rice bowl with assorted vegetables",
      price: "$28",
      image: "https://source.unsplash.com/random/600x400?bibimbap",
    },
    {
      name: "Samgyeopsal",
      description: "Grilled pork belly with ssamjang",
      price: "$35",
      image: "https://source.unsplash.com/random/600x400?samgyeopsal",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Signature Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dishes.map((dish) => (
            <Card key={dish.name} className="bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Image
                src={dish.image}
                alt={dish.name}
                className="rounded-t-xl w-full h-48 object-cover"
              />
              <div className="p-6">
                <H3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{dish.name}</H3>
                <P className="text-gray-600 dark:text-gray-400 mb-3">{dish.description}</P>
                <P className="text-indigo-600 font-medium">{dish.price}</P>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureDishes;