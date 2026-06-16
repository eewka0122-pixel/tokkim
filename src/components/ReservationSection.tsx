"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ReservationSection = () => {
  return (
    <section id="contacts" className="py-24 px-6 bg-transparent">
      <div className="max-w-3xl mx-auto">
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
                {/* Адрес синхронизирован с тем, что мы указали в доставке */}
                <p className="text-[#6B5E48]">г. Раменское, ул. Бронницкая, д. 19а</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#3A3124] text-lg mb-1">Телефон</h3>
                <p className="text-[#6B5E48]">+7 (123) 456-78-90</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#3A3124] text-lg mb-1">Email</h3>
                <p className="text-[#6B5E48]">reservations@tokkim.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-[#F5F1E6] rounded-full flex items-center justify-center text-[#8C6D46] shrink-0 transition-transform hover:scale-110">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-[#3A3124] text-lg mb-1">Часы работы</h3>
                <p className="text-[#6B5E48]">Пн-Вс: 11:00 — 23:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;