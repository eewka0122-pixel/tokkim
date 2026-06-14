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
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-[#3A3124] text-sm font-bold uppercase tracking-wider mb-4 border border-white/50 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
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
              // Чистое премиальное стекло с легкой хроматической аберрацией по краям
              className="relative overflow-hidden group rounded-3xl p-6 transition-all duration-500 ease-out hover:-translate-y-2
              bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg backdrop-saturate-[150%]
              border border-white/30 border-t-white/80 border-l-white/60
              shadow-[0_10px_30px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.8),inset_-3px_0_15px_rgba(255,0,128,0.1),inset_3px_0_15px_rgba(0,255,255,0.1)]
              hover:shadow-[0_20px_40px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.9),inset_-4px_0_20px_rgba(255,0,128,0.15),inset_4px_0_20px_rgba(0,255,255,0.15)]
              reveal reveal-delay-200"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Чистый, яркий блик, который скользит только при наведении */}
              <div className="absolute top-0 left-[-100%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 transition-all duration-1000 ease-in-out group-hover:left-[100%] z-10 pointer-events-none" />

              <div className="relative z-20">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/50 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8)] flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                  <advantage.icon className="h-7 w-7 text-[#3A3124]" />
                </div>
                <h4 className="font-bold text-[#3A3124] mb-2">{advantage.title}</h4>
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