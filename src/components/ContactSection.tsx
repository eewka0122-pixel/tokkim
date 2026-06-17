"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Mail, Truck, CreditCard } from "lucide-react";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://31.57.47.98");

const ContactSection = () => {
  const [data, setData] = useState({
    address: "Загрузка...",
    work_hours: "Загрузка...",
    phone: "Загрузка...",
    email: "reservations@tokkim.com",
    delivery_info: "Информация о доставке загружается...",
    payment_info: "Информация об оплате загружается..."
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const records = await pb.collection("settings").getList(1, 1);
        if (records.items.length > 0) {
          const d = records.items[0];
          setData({
            address: d.address || "Адрес не указан",
            work_hours: d.work_hours || "Часы не указаны",
            phone: d.phone || "Телефон не указан",
            email: "reservations@tokkim.com",
            // Подтягиваем новые поля, если ты их создал в базе
            delivery_info: d.delivery_info || "Условия доставки уточняйте у оператора.",
            payment_info: d.payment_info || "Оплата наличными или картой курьеру."
          });
        }
      } catch (e) {
        console.error("Ошибка загрузки из PocketBase:", e);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 bg-stone-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-stone-200/50 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Левая колонка: Контакты */}
          <div className="bg-white/50 p-8 rounded-[2rem] shadow-sm border border-stone-100">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">Свяжитесь с нами</h2>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Адрес", val: data.address },
                { icon: Phone, label: "Телефон", val: data.phone },
                { icon: Mail, label: "Email", val: data.email },
                { icon: Clock, label: "Часы работы", val: data.work_hours },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <span className="p-2 bg-amber-100 rounded-full text-amber-600"><item.icon className="h-5 w-5" /></span>
                  <div>
                    <p className="font-semibold text-stone-900">{item.label}</p>
                    <p className="text-stone-600">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка: Доставка и Оплата */}
          <div className="bg-white/50 p-8 rounded-[2rem] shadow-sm border border-stone-100">
            <h3 className="font-serif text-3xl font-bold text-stone-900 mb-8">Оплата и доставка</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <Truck className="h-6 w-6 text-amber-600 shrink-0" />
                <div>
                  <p className="font-bold text-stone-900 mb-1">Стоимость доставки</p>
                  <p className="text-stone-600 text-sm leading-relaxed">{data.delivery_info}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CreditCard className="h-6 w-6 text-amber-600 shrink-0" />
                <div>
                  <p className="font-bold text-stone-900 mb-1">Способы оплаты</p>
                  <p className="text-stone-600 text-sm leading-relaxed">{data.payment_info}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;