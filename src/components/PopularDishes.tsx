"use client";

import { useState, useEffect } from "react";
import { Percent, Gift, Clock, LucideIcon } from "lucide-react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://31.57.47.98");

type PromotionItem = {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  mediaUrl: string;
  isVideo: boolean;
};

const PopularDishes = () => {
  const [promos, setPromos] = useState<PromotionItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPromoMetadata = (title: string, index: number) => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes("самовывоз") || lowerTitle.includes("скидк") || lowerTitle.includes("%")) {
      return { icon: Percent, badge: "-10%" };
    }
    if (lowerTitle.includes("час") || lowerTitle.includes("время") || lowerTitle.includes("будн")) {
      return { icon: Clock, badge: "12:00 - 16:00" };
    }
    if (lowerTitle.includes("подарок") || lowerTitle.includes("дарим") || lowerTitle.includes("бесплат")) {
      return { icon: Gift, badge: "Подарок" };
    }
    
    const fallbacks = [
      { icon: Percent, badge: "Акция" },
      { icon: Clock, badge: "Ограничено" },
      { icon: Gift, badge: "Бонус" }
    ];
    return fallbacks[index % fallbacks.length];
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const records = await pb.collection("promotions").getFullList({
          sort: "created",
        });

        const formattedPromos = records.map((record, index) => {
          const fileName = record.media || "";
          const isVideo = /\.(mp4|webm|mov|avi)$/i.test(fileName);
          
          const mediaUrl = fileName 
            ? pb.files.getUrl(record, fileName)
            : "/images/Кимпаб с говядиной.jpeg"; 

          const metadata = getPromoMetadata(record.title, index);

          return {
            id: record.id,
            title: record.title,
            description: record.description,
            badge: metadata.badge,
            icon: metadata.icon,
            mediaUrl: mediaUrl,
            isVideo: isVideo
          };
        });

        setPromos(formattedPromos);
      } catch (error) {
        console.error("Ошибка при загрузке акций из PocketBase:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPromotions();
  }, []);

  if (isLoading) {
    return (
      <section id="module-promos" className="pt-12 pb-24 px-6 bg-transparent relative z-10 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#7A2828]/20 border-t-[#7A2828] rounded-full animate-spin mb-4"></div>
        <p className="text-[#5C4D42] font-medium">Загружаем специальные предложения...</p>
      </section>
    );
  }

  return (
    <section id="module-promos" className="pt-12 pb-24 px-6 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Заголовок */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#7A2828]/10 text-[#7A2828] text-sm font-bold uppercase tracking-wider mb-4 border border-[#7A2828]/20">
            Специальные предложения
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2A2118] tracking-tight">
            Акции и скидки
          </h2>
          <p className="mt-4 text-lg font-medium text-[#5C4D42] max-w-2xl mx-auto">
            Радуем вас не только аутентичным вкусом, но и приятными бонусами
          </p>
        </div>

        {/* Карточки акций */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.length === 0 ? (
            <p className="text-center text-[#5C4D42] col-span-1 md:col-span-3">На данный момент нет действующих акций.</p>
          ) : (
            promos.map((promo) => (
              <div 
                key={promo.id} 
                className="relative group rounded-[2rem] overflow-hidden bg-[#2A1616] shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] hover:-translate-y-3 transition-all duration-500 h-[380px] md:h-[420px] cursor-pointer"
              >
                {/* 100% Яркие картинки и видео без opacity-90 */}
                {promo.isVideo ? (
                  <video 
                    src={promo.mediaUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <img 
                    src={promo.mediaUrl} 
                    alt={promo.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                {/* Плашка Винный акцент */}
                <div className="absolute top-5 right-5 bg-[#7A2828]/95 backdrop-blur-sm text-[#F5F1E6] font-extrabold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
                  <promo.icon className="w-4 h-4 stroke-[3]" />
                  <span>{promo.badge}</span>
                </div>

                {/* Текст с легкой тенью для читаемости на любых фонах */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {promo.title}
                  </h3>
                  <p className="text-white/95 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {promo.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;