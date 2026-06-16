"use client";

import { Percent, Gift, Clock } from "lucide-react";

const promos = [
  {
    id: 1,
    title: "Скидка на самовывоз",
    description: "Оформите заказ с собой и получите приятную скидку 10% на весь чек. Заходите к нам в гости!",
    badge: "-10%",
    icon: Percent,
    image: "/images/Кимпаб с говядиной.jpeg", 
  },
  {
    id: 2,
    title: "Счастливые часы",
    description: "Каждый будний день с 12:00 до 16:00 действует скидка 15% на все супы и горячие блюда вок.",
    badge: "12:00 - 16:00",
    icon: Clock,
    image: "/images/Рамен с морепродуктами.jpeg",
  },
  {
    id: 3,
    title: "Подарок к заказу",
    description: "При заказе доставки на сумму от 2000 ₽ дарим порцию хрустящих эноки с беконом.",
    badge: "Подарок",
    icon: Gift,
    image: "/images/Эноки с беконом.jpeg",
  }
];

const PopularDishes = () => {
  return (
    <section id="module-promos" className="pt-12 pb-24 px-6 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Заголовок */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/40 text-[#4A3826] text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-sm">
            Специальные предложения
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2A2118] tracking-tight drop-shadow-md">
            Акции и скидки
          </h2>
          <p className="mt-4 text-lg font-medium text-[#3A2F22] max-w-2xl mx-auto drop-shadow-sm">
            Радуем вас не только аутентичным вкусом, но и приятными бонусами
          </p>
        </div>

        {/* Карточки акций (БЕЗ рамок, только объем и тень) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo) => (
            <div 
              key={promo.id} 
              className="relative group rounded-[2rem] overflow-hidden bg-[#1A1410] shadow-[0_15px_35px_rgba(0,0,0,0.25)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)] hover:-translate-y-3 transition-all duration-500 h-[380px] md:h-[420px] cursor-pointer"
            >
              {/* Картинка еды на всю ширину и высоту */}
              <img 
                src={promo.image} 
                alt={promo.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100"
              />
              
              {/* Мягкий градиент снизу только для читаемости текста */}
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1A1410]/95 via-[#1A1410]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Плашка (Бейдж) в правом верхнем углу */}
              <div className="absolute top-5 right-5 bg-[#D4B98F]/95 backdrop-blur-sm text-[#2A2118] font-extrabold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
                <promo.icon className="w-4 h-4 stroke-[3]" />
                <span>{promo.badge}</span>
              </div>

              {/* Текст снизу */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-md">
                  {promo.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                  {promo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;