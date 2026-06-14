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
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            История бренда
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-[#3A3124] tracking-tight">
            ТОККИМ
          </h2>
          <p className="mt-6 text-lg text-[#6B5E48] max-w-2xl mx-auto">
            Мы объединяем традиции корейской кулинарии с современным подходом к стрит-фуду, 
            создавая неповторимый вкус в каждом блюде
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="reveal">
            <img
              src="/images/Кимчи.jpeg"
              alt="Кимчи"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
          </div>
          <div className="space-y-6 reveal-delay-100">
            <h3 className="font-serif text-3xl font-medium text-[#3A3124]">
              Наша философия
            </h3>
            <p className="text-[#6B5E48] leading-relaxed">
              ТОККИМ начался с мечты о том, чтобы корейская кухня стала доступной 
              каждому, сохраняя при этом её высокое качество и глубину вкуса. 
              Мы выбрали Сеул и Токио как символы нашего пути — города, где 
              традиции встречаются с современностью.
            </p>
            <p className="text-[#6B5E48] leading-relaxed">
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
              className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-[#D4B98F]/20 reveal reveal-delay-200"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#D4B98F]/20 flex items-center justify-center mb-4">
                <advantage.icon className="h-7 w-7 text-[#8C6D46]" />
              </div>
              <h4 className="font-semibold text-[#3A3124] mb-2">{advantage.title}</h4>
              <p className="text-sm text-[#6B5E48]">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;