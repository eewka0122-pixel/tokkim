"use client";

import { Card, CardContent } from "@/components/ui/card";

const popularDishes = [
  { name: "Кимпаб с курицей", description: "Свежая куриная грудка, овощи, рис, нори", price: "₩6,500", image: "/images/Кимпаб с курицей.jpeg" },
  { name: "Пибимпаб с говядиной", description: "Маринованная говядина, рис, овощи, яйцо", price: "₩8,000", image: "/images/Пибимпаб с говядиной.jpeg" },
  { name: "Рамен с курицей", description: "Ароматный бульон, лапша, куриная печень", price: "₩7,000", image: "/images/Рамен с курицей.jpeg" },
];

const PopularDishes = () => {
  return (
    <section id="popular" className="py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            Популярные блюда
          </span>
          {/* Фича 4: Появление по словам с разной задержкой */}
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
            <span className="split-parent mr-3"><span className="split-child" style={{ animationDelay: "0.1s" }}>Наши</span></span>
            <span className="split-parent mr-3"><span className="split-child" style={{ animationDelay: "0.2s" }}>изысканные</span></span>
            <span className="split-parent"><span className="split-child" style={{ animationDelay: "0.3s" }}>блюда</span></span>
          </h2>
          <p className="mt-6 text-lg text-[#6B5E48] max-w-2xl mx-auto">
            Каждое блюдо создано с заботой о вкусе и представлении
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDishes.map((dish) => (
            <div key={dish.name} className="reveal h-full">
              <Card
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/20 backdrop-blur-md cursor-pointer h-full transition-all duration-300 ease-out shadow-lg hover:-translate-y-4 hover:shadow-[0_15px_40px_rgba(57,255,20,0.6)]"
              >
                <div className="absolute top-0 left-[-150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transition-all duration-700 ease-in-out group-hover:left-[100%] z-30 pointer-events-none" />

                <div className="relative h-64 overflow-hidden z-10">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#D4B98F] text-[#3A3124] px-4 py-2 rounded-full font-bold shadow-lg shadow-black/20">
                    {dish.price}
                  </div>
                  <div className="absolute bottom-4 left-4 text-[#F5F1E6]">
                    <h3 className="font-serif text-xl font-bold drop-shadow-md">{dish.name}</h3>
                  </div>
                </div>
                <CardContent className="p-6 relative z-10">
                  <p className="text-[#3A3124] font-medium leading-relaxed">{dish.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;