"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-950 px-6 py-12 text-stone-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Column */}
        <div>
          <p className="font-semibold text-stone-50">ТОККИМ</p>
          <p className="mt-2 text-sm">
            Корейский стрит‑фуд в сердце Сеула
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 text-sm">
          <a            href="#signature"
            className="transition hover:text-amber-300"
          >
            Подписка
          </a>
          <a
            href="#menu"
            className="transition hover:text-amber-300"
          >
            Меню
          </a>
          <a
            href="#gallery"
            className="transition hover:text-amber-300"
          >
            Галерея
          </a>
          <a
            href="#contact"
            className="transition hover:text-amber-300"
          >
            Контакты
          </a>
        </nav>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="transition hover:text-amber-300"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="transition hover:text-amber-300"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="transition hover:text-amber-300"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-stone-700 pt-4 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} ТОККИМ. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;