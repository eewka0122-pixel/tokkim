"use client";

import { ChefHat, Award, Clock, Users } from "lucide-react";

const AboutSection = () => {
  const advantages = [
    { icon: ChefHat, title: "Эксклюзивные рецепты", description: "Традиционные корейские блюда с современным фокусом" },
    { icon: Award, title: "Лучшее качество", description: "Только натуральные ингредиенты и свежие продукты" },
    { icon: Clock, title: "Быстрая доставка", description: "Еду доставляем за 30 минут с сохранением вкуса" },
    { icon: Users, title: "Гостеприимство", description: "Создаем атмосферу уюта и комфорта" },
  ];

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/40 text-[#4A3826] text-sm font-bold uppercase tracking-wider mb-4 drop-shadow-sm">
            История бренда
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2118] tracking-tight drop-shadow-md">
            ТОККИМ
          </h2>
          <p className="mt-6 text-lg md:text-xl font-medium text-[#3A2F22] max-w-2xl mx-auto drop-shadow-sm">
            Мы объединяем традиции корейской кулинарии с современным подходом к стрит-фуду, 
            создавая неповторимый вкус в каждом блюде
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="reveal">
            <img
              src="/images/food-mix.jpg" 
              alt="Ассорти корейских блюд"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
          </div>
          <div className="space-y-6 reveal-delay-100">
            <h3 className="font-serif text-3xl font-bold text-[#2A2118] drop-shadow-md">
              Наша философия
            </h3>
            <p className="text-[#3A2F22] font-medium text-lg leading-relaxed drop-shadow-sm">
              ТОККИМ начался с мечты о том, чтобы корейская кухня стала доступной 
              каждому, сохраняя при этом её высокое качество и глубину вкуса. 
              Мы выбрали Сеул  как символ нашего пути, где 
              традиции встречаются с современностью.
            </p>
            <p className="text-[#3A2F22] font-medium text-lg leading-relaxed drop-shadow-sm">
              Каждое блюдо создается с заботой о деталей: от подбора 
              натуральных ингредиентов до подачи в стиле, в котором 
              корейский стрит-фуд становится искусством.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={advantage.title}
              className="reveal h-full"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group h-full bg-lime-200/40 backdrop-blur-md rounded-2xl p-6 border border-lime-300/50 shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:bg-lime-200/60 hover:shadow-2xl hover:shadow-lime-400/40 hover:border-lime-300/80 cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-lime-300/50 flex items-center justify-center mb-4 border border-lime-300/60 transition-colors duration-300 group-hover:bg-lime-300/70">
                  <advantage.icon className="h-7 w-7 text-[#2A2118]" />
                </div>
                <h4 className="font-bold text-[#2A2118] mb-2">{advantage.title}</h4>
                <p className="text-sm font-medium text-[#3A2F22]">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;