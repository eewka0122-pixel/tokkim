"use client";

import { Instagram, Send } from "lucide-react";

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
              <li><a href="#contacts" className="hover:text-[#D4B98F] transition-colors">Контакты</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#F5F1E6] mb-4">Контакты</h4>
            <ul className="space-y-2 text-[#9A8F7D]">
              <li>+7 (123) 456-78-90</li>
              <li>reservations@tokkim.com</li>
              <li>г. Раменское, ул. Бронницкая, д. 19а</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-[#F5F1E6] mb-4">Соцсети</h4>
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A453A] flex items-center justify-center hover:bg-[#D4B98F] hover:text-[#3A3124] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              
              {/* VK */}
              <a 
                href="https://vk.com/club238902574" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#4A453A] flex items-center justify-center hover:bg-[#D4B98F] hover:text-[#3A3124] transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.447-2.672-2.779-4.153-1.076-1.181-1.053-1.555-.024-2.904 1.944-2.546 2.64-4.153 2.64-5.382 0-.26-.259-.58-.853-.58h-3.201c-.538 0-.734.151-.927.531-1.282 2.536-3.158 5.613-3.693 5.613-.241 0-.39-.175-.39-.814V5.88c0-.609-.152-.857-.864-.857H9.72c-.53 0-.814.331-.814.739 0 .739 1.065.922 1.065 3.84v3.204c0 .882-.161 1.036-.401 1.036-.665 0-2.399-2.903-3.412-5.945-.259-.766-.528-1.036-1.126-1.036H1.833C1 4.861 1 5.318 1 5.866c0 .814 1.064 4.882 4.966 10.237C8.563 19.78 12.016 18.994 13.162 18.994z"/>
                </svg>
              </a>

              {/* Telegram */}
              <a href="#" className="w-10 h-10 rounded-full bg-[#4A453A] flex items-center justify-center hover:bg-[#D4B98F] hover:text-[#3A3124] transition-colors">
                <Send className="h-5 w-5 -ml-0.5 mt-0.5" />
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