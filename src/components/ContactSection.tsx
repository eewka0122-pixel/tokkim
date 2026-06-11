"use client";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
const contactDetails = [
  { icon: MapPin, label: "Адрес", value: "123 Корейская улица, Сеул, Южная Корея" },
  { icon: Clock, label: "Часы", value: "Пн‑Вс, 11:00 – 23:00" },
  { icon: Phone, label: "Телефон", value: "+7 (123) 456‑78‑90" },
  { icon: Mail, label: "Email", value: "reservations@tokkim.com" },
];
const ContactSection = () => {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 bg-stone-50">
      {/* Background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-amber-100/30 blur-3xl float reveal reveal-delay-100" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-stone-200/50 blur-3xl float reveal reveal-delay-200" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16 reveal reveal-delay-100">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-medium uppercase tracking-wider mb-4">
            Контакты
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-stone-900 tracking-tight mb-8">
            Свяжитесь с нами
          </h2>
        </div>
        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal reveal-delay-200">
          {/* Left Column */}
          <div className="bg-white/10 p-6 rounded-lg shadow-sm">
            <div className="space-y-6">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3 rounded-md bg-white/20 p-4 backdrop-blur reveal reveal-delay-300">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200/50 text-amber-400">
                    <detail.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-stone-700 font-semibold">{detail.label}</p>
                    <p className="mt-1 text-stone-500">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right Column */}
          <div className="bg-white/10 p-6 rounded-lg shadow-sm">
            <div className="relative h-64 w-64 rounded-full overflow-hidden reveal reveal-delay-300">
              <img
                src="/images/Кимпаб с курицей.jpeg"
                alt="Ресторан"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-stone-950/40" />
              <div className="absolute bottom-4 left-4 rounded-md bg-white/80 p-3 backdrop-blur">
                <h3 className="text-lg font-semibold text-stone-900">Частный зал</h3>
                <p className="mt-1 text-stone-400">Для мероприятий и частных ужинов</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;