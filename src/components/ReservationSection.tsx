"use client";

import { FormEvent, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { showSuccess } from "@/utils/toast";

const ReservationSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;

    setTimeout(() => {
      showSuccess("Спасибо за заявку! Мы свяжемся с вами в ближайшее время.");
      form.reset();
      setLoading(false);
    }, 600);
  };

  return (
    <section id="reservation" className="py-24 md:py-32 px-6 bg-[#F5F1E6]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 reveal">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4B98F]/20 text-[#8C6D46] text-sm font-medium uppercase tracking-wider mb-4">
            Бронирование
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-[#3A3124] tracking-tight">
            Забронируйте стол
          </h2>
          <p className="mt-6 text-lg text-[#6B5E48] max-w-2xl mx-auto">
            Мы будем рады провести ужин для вас и вашей группы
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 reveal">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#D4B98F]/20">
              <h3 className="font-serif text-2xl font-medium text-[#3A3124] mb-6">
                Свяжитесь с нами
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4B98F]/20 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-[#8C6D46]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A3124]">Адрес</p>
                    <p className="text-[#6B5E48] mt-1">123 Корейская улица, Сеул, Южная Корея</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4B98F]/20 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#8C6D46]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A3124]">Телефон</p>
                    <p className="text-[#6B5E48] mt-1">+7 (123) 456-78-90</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4B98F]/20 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#8C6D46]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A3124]">Email</p>
                    <p className="text-[#6B5E48] mt-1">reservations@tokkim.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4B98F]/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-[#8C6D46]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#3A3124]">Часы работы</p>
                    <p className="text-[#6B5E48] mt-1">Пн‑Вс: 11:00 – 23:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border border-[#D4B98F]/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.920859714735!2d127.0246!3d37.6547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568a2b5d5b5b5b5%3A0x5e9c5a5e5a5e5a5e!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Reservation Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-[#D4B98F]/20 reveal-delay-100">
            <h3 className="font-serif text-2xl font-medium text-[#3A3124] mb-6">
              Форма бронирования
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-[#3A3124]">
                    Имя
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ваше имя"
                    required
                    className="mt-2 rounded-2xl border-[#D4B98F]/30 bg-white/50 text-[#3A3124] placeholder:text-[#9A8F7D] focus:border-[#D4B98F] focus:ring-[#D4B98F]/40"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#3A3124]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="mt-2 rounded-2xl border-[#D4B98F]/30 bg-white/50 text-[#3A3124] placeholder:text-[#9A8F7D] focus:border-[#D4B98F] focus:ring-[#D4B98F]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-[#3A3124]">
                    Дата
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="mt-2 rounded-2xl border-[#D4B98F]/30 bg-white/50 text-[#3A3124] focus:border-[#D4B98F] focus:ring-[#D4B98F]/40"
                  />
                </div>
                <div>
                  <Label htmlFor="guests" className="text-[#3A3124]">
                    Гости
                  </Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="20"
                    placeholder="2"
                    required
                    className="mt-2 rounded-2xl border-[#D4B98F]/30 bg-white/50 text-[#3A3124] focus:border-[#D4B98F] focus:ring-[#D4B98F]/40"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-[#3A3124]">
                  Пожелания
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Диетические ограничения, пожелания по столику..."
                  className="mt-2 rounded-2xl border-[#D4B98F]/30 bg-white/50 text-[#3A3124] placeholder:text-[#9A8F7D] focus:border-[#D4B98F] focus:ring-[#D4B98F]/40"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#D4B98F] text-[#3A3124] font-semibold py-6 hover:bg-[#C1A67D] transition-colors disabled:opacity-60"
              >
                {loading ? "Отправка..." : "Забронировать стол"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;