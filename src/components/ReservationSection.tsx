"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Truck, CreditCard } from "lucide-react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://31.57.47.98");

const ReservationSection = () => {
  const [data, setData] = useState({
    address: "г. Раменское, ул. Бронницкая, д. 19а",
    phone: "+7 (123) 456-78-90",
    email: "reservations@tokkim.com",
    work_hours: "Пн-Вс: 11:00 — 23:00",
    delivery_info: "Информация о доставке загружается...",
    payment_info: "Оплатить заказ можно наличными или банковской картой курьеру при получении."
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const records = await pb.collection("settings").getList(1, 1);
        if (records.items.length > 0) {
          const d = records.items[0];
          setData({
            address: d.address || data.address,
            phone: d.phone || data.phone,
            email: "reservations@tokkim.com",
            work_hours: d.work_hours || data.work_hours,
            delivery_info: d.delivery_info || data.delivery_info,
            payment_info: d.payment_info || data.payment_info,
          });
        }
      } catch (e) {
        console.error("Ошибка загрузки из PocketBase:", e);
      }
    };
    fetchSettings();
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
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110 mt-1">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="w-full">
                  <h3 className="font-bold text-[#3A3124] text-lg mb-3">Стоимость доставки</h3>
                  <div 
                    className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm text-[#6B5E48] leading-relaxed prose prose-sm prose-stone max-w-none"
                    dangerouslySetInnerHTML={{ __html: data.delivery_info }}
                  />
                </div>
              </div>

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