"use client";

const AboutSection = () => {
  return (
    <section id="about" className="pt-20 pb-16 md:pt-24 md:pb-24 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 reveal">
          {/* Винный акцент на плашке */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#7A2828]/10 text-[#7A2828] text-sm font-bold uppercase tracking-wider mb-4 border border-[#7A2828]/20">
            История бренда
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#281C15] tracking-tight">
            ТОККИМ
          </h2>
          <p className="mt-6 text-lg md:text-xl font-medium text-[#423124] max-w-2xl mx-auto">
            Мы объединяем традиции корейской кулинарии с современным подходом к стрит-фуду, 
            создавая неповторимый вкус в каждом блюде
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <img
              src="/images/food-mix.jpg" 
              alt="Ассорти корейских блюд"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
          </div>
          <div className="space-y-6 reveal-delay-100">
            <h3 className="font-serif text-3xl font-bold text-[#281C15]">
              Наша философия
            </h3>
            <p className="text-[#423124] font-medium text-lg leading-relaxed">
              ТОККИМ начался с мечты о том, чтобы корейская кухня стала доступной 
              каждому, сохраняя при этом её высокое качество и глубину вкуса. 
              Мы выбрали Сеул как символ нашего пути, где 
              традиции встречаются с современностью.
            </p>
            <p className="text-[#423124] font-medium text-lg leading-relaxed">
              Каждое блюдо создается с заботой о деталей: от подбора 
              натуральных ингредиентов до подачи в стиле, в котором 
              корейский стрит-фуд становится искусством.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;