"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Truck, CreditCard } from "lucide-react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://31.57.47.98");

// Описываем структуру данных для зоны доставки
interface DeliveryZone {
  id: string;
  city: string;
  min_order: string;
  delivery_cost: string;
  free_order: string;
}

const ReservationSection = () => {
  // Состояние для основных настроек (контакты и оплата)
  const [data, setData] = useState({
    address: "Загрузка...",
    phone: "Загрузка...",
    email: "reservations@tokkim.com",
    work_hours: "Загрузка...",
    payment_info: "Информация об оплате загружается..."
  });

  // Состояние для зон доставки
  // Оставляем пустой массив, чтобы пока данные грузятся, ничего лишнего не выводилось
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loadingZones, setLoadingZones] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Получаем основные настройки из коллекции settings
        const settingsRecords = await pb.collection("settings").getList(1, 1);
        if (settingsRecords.items.length > 0) {
          const d = settingsRecords.items[0];
          setData({
            address: d.address || "Адрес не указан",
            phone: d.phone || "Телефон не указан",
            email: "reservations@tokkim.com",
            work_hours: d.work_hours || "Часы не указаны",
            payment_info: d.payment_info || "Способы оплаты не указаны"
          });
        }

        // 2. Получаем зоны доставки из коллекции delivery_zones
        const zonesRecords = await pb.collection("delivery_zones").getFullList({
          sort: 'created', // Сортируем по порядку создания
        });
        
        if (zonesRecords.length > 0) {
          const mappedZones = zonesRecords.map(r => ({
            id: r.id,
            city: r.city || "",
            min_order: r.min_order || "",
            delivery_cost: r.delivery_cost || "",
            free_order: r.free_order || ""
          }));
          setZones(mappedZones);
        }
      } catch (e) {
        console.error("Ошибка загрузки данных из PocketBase:", e);
      } finally {
        setLoadingZones(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <section id="contacts" className="pt-20 pb-16 md:pt-24 md:pb-24 px-6 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* БЛОК 1: Контакты */}
          <div className="bg-[#FAF8F3] p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#D4B98F]/20">
            <h2 className="font-serif text-3xl font-bold text-[#3A3124] mb-10">
              Свяжитесь с нами
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3A3124] text-lg mb-1">Адрес</h3>
                  <p className="text-[#6B5E48]">{data.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3A3124] text-lg mb-1">Телефон</h3>
                  <p className="text-[#6B5E48]">{data.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3A3124] text-lg mb-1">Email</h3>
                  <p className="text-[#6B5E48]">{data.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-[#3A3124] text-lg mb-1">Часы работы</h3>
                  <p className="text-[#6B5E48]">{data.work_hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* БЛОК 2: Оплата и доставка */}
          <div className="bg-[#FAF8F3] p-8 md:p-12 rounded-[2rem] shadow-sm border border-[#D4B98F]/20">
            <h2 className="font-serif text-3xl font-bold text-[#3A3124] mb-10">
              Оплата и доставка
            </h2>
            
            <div className="space-y-8">
              
              {/* Стоимость доставки (Динамический вывод из базы) */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110 mt-1">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h3 className="font-bold text-[#3A3124] text-lg mb-3">Стоимость доставки</h3>
                  
                  {loadingZones ? (
                    <p className="text-[#6B5E48]">Загрузка информации о доставке...</p>
                  ) : zones.length > 0 ? (
                    <ul className="space-y-4 text-[#6B5E48]">
                      {zones.map((zone) => (
                        <li key={zone.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                          {/* Город */}
                          {zone.city && (
                            <span className="font-bold text-[#3A3124] block mb-1">{zone.city}</span>
                          )}
                          
                          {/* Минимальный заказ и стоимость доставки (на одной строке) */}
                          {zone.min_order} 
                          {zone.delivery_cost && (
                            <span className="text-[#8C6D46] font-medium ml-1">{zone.delivery_cost}</span>
                          )}
                          
                          {/* Бесплатная доставка (с новой строки, если есть) */}
                          {zone.free_order && (
                            <>
                              <br />
                              {zone.free_order} <span className="text-green-600 font-bold">(бесплатно)</span>
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[#6B5E48]">Информация о доставке временно недоступна.</p>
                  )}
                </div>
              </div>

              {/* Способы оплаты (из коллекции settings) */}
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h3 className="font-bold text-[#3A3124] text-lg mb-1">Способы оплаты</h3>
                  <div 
                    className="text-[#6B5E48] leading-relaxed prose prose-sm prose-stone max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.payment_info }}
                  />
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ReservationSection;