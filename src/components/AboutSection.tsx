"use client";

import { useState, useEffect } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://31.57.47.98");

const AboutSection = () => {
  const [data, setData] = useState({
    subtitle: "Мы объединяем традиции корейской кулинарии с современным подходом к стрит-фуду, создавая неповторимый вкус в каждом блюде",
    title: "Наша философия",
    text: "<p>ТОККИМ начался с мечты о том, чтобы корейская кухня стала доступной каждому, сохраняя при этом её высокое качество и глубину вкуса. Мы выбрали Сеул как символ нашего пути, где традиции встречаются с современностью.</p><p>Каждое блюдо создается с заботой о деталей: от подбора натуральных ингредиентов до подачи в стиле, в котором корейский стрит-фуд становится искусством.</p>",
    image: "/images/food-mix.jpg"
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const records = await pb.collection("about_section").getList(1, 1);
        if (records.items.length > 0) {
          const d = records.items[0];
          setData({
            subtitle: d.subtitle || data.subtitle,
            title: d.title || data.title,
            text: d.text || data.text,
            // Если картинка загружена в базу, получаем на неё ссылку. Иначе оставляем старую картинку.
            image: d.image ? pb.files.getUrl(d, d.image) : data.image
          });
        }
      } catch (error) {
        console.error("Ошибка загрузки данных AboutSection:", error);
      }
    };

    fetchAbout();
  }, []);

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
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <img
              src={data.image}
              alt="Ассорти корейских блюд"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
          </div>
          <div className="space-y-6 reveal-delay-100">
            <h3 className="font-serif text-3xl font-bold text-[#281C15]">
              {data.title}
            </h3>
            {/* Обертка для Rich Editor, чтобы сохранить исходные стили параграфов */}
            <div 
              className="text-[#423124] font-medium text-lg leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: data.text }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;