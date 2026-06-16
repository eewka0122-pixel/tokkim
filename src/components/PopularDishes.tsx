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
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#4A0E0E]/90 text-[#D4B98F] text-sm font-bold uppercase tracking-wider mb-4 shadow-lg border border-[#8A2525]/30">
            Специальные предложения
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2A2118] tracking-tight drop-shadow-md">
            Акции и скидки
          </h2>
          <p className="mt-4 text-lg font-medium text-[#3A2F22] max-w-2xl mx-auto drop-shadow-sm">
            Радуем вас не только аутентичным вкусом, но и премиальной подачей
          </p>
        </div>

        {/* Карточки акций в стиле красного глянцевого дерева */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo) => (
            <div 
              key={promo.id} 
              className="relative group rounded-[2rem] p-2.5 sm:p-3 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-500 h-[380px] md:h-[420px] cursor-pointer bg-[linear-gradient(145deg,#8A2525_0%,#4A0E0E_45%,#1A0303_80%,#3A0A0A_100%)] border border-[#2A0505]"
            >
              {/* Глянцевый лакированный блик на самой деревянной раме */}
              <div className="absolute inset-0 rounded-[2rem] pointer-events-none shadow-[inset_0_2px_8px_rgba(255,150,150,0.25)] bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]" />

              {/* Внутренний контейнер с картинкой (утоплен в дерево) */}
              <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
                
                {/* Картинка еды */}
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Градиентное затемнение снизу для читаемости (черное) */}
                <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

                {/* Плашка (Бейдж) в правом верхнем углу - стилизована под дерево и золото */}
                <div className="absolute top-4 right-4 bg-[#1A0303]/80 border border-[#8A2525]/60 backdrop-blur-md text-[#D4B98F] font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 z-20 transition-transform group-hover:scale-105">
                  <promo.icon className="w-4 h-4 stroke-[2.5]" />
                  <span className="text-sm tracking-wide">{promo.badge}</span>
                </div>

                {/* Текст снизу */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F5F1E6] mb-3 drop-shadow-md">
                    {promo.title}
                  </h3>
                  <p className="text-[#D4B98F] text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
                    {promo.description}
                  </p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;