"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#3A3124] text-[#F5F1E6] px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-3xl font-bold">ТОККИМ</h3>
            <p className="text-[#D4B98F] text-sm uppercase tracking-wider">
              Корейский стрит-фуд нового поколения
            </p>
            <p className="text-[#9A8F7D] text-sm">
              Мы объединяем традиции корейской кулинарии с современным подходом
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-[#F5F1E6] mb-4">Меню</h4>
            <ul className="space-y-2 text-[#9A8F7D]">
              <li><a href="#popular" className="hover:text-[#D4B98F] transition-colors">Популярные блюда</a></li>
              <li><a href="#menu" className="hover:text-[#D4B98F] transition-colors">Полное меню</a></li>
              <li><a href="#gallery" className="hover:text-[#D4B98F] transition-colors">Галерея</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#F5F1E6] mb-4">Контакты</h4>
            <ul className="space-y-2 text-[#9A8F7D]">
              <li>+7 (123) 456-78-90</li>
              <li>reservations@tokkim.com</li>
              <li>123 Корейская улица, Сеул</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-[#F5F1E6] mb-4">Соцсети</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A453A] flex items-center justify-center hover:bg-[#D4B98F] hover:text-[#3A3124] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A453A] flex items-center justify-center hover:bg-[#D4B98F] hover:text-[#3A3124] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A453A] flex items-center justify-center hover:bg-[#D4B98F] hover:text-[#3A3124] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#4A453A] pt-8 text-center text-[#6B5E48]">
          <p>© {new Date().getFullYear()} Вячеслав Ким. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;