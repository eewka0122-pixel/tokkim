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
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4 border border-[#D4B98F]/30 backdrop-blur-sm">
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
              // Эффект стекла: прозрачный фон, размытие, белая рамка
              className="relative overflow-hidden group bg-white/30 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:bg-white/40 hover:shadow-xl reveal reveal-delay-200"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Анимация блика при наведении */}
              <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12 transition-all duration-700 ease-in-out group-hover:left-[200%] z-10" />

              <div className="relative z-20">
                <div className="w-14 h-14 rounded-2xl bg-[#D4B98F]/40 backdrop-blur-sm border border-white/50 flex items-center justify-center mb-4 shadow-sm">
                  <advantage.icon className="h-7 w-7 text-[#3A3124]" />
                </div>
                <h4 className="font-semibold text-[#3A3124] mb-2">{advantage.title}</h4>
                <p className="text-sm text-[#3A3124]/80 font-medium">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;