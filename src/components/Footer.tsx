"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";

const links = [
  { href: "#signature", label: "Signature" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reservation", label: "Reservations" },
];

const socialLinks = [
  {
    href: "#",
    label: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
  },
  {
    href: "#",
    label: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
  },
  {
    href: "#",
    label: "Facebook",
    icon: <Facebook className="h-5 w-5" />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-stone-950 px-4 py-12 text-stone-400 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-stone-50">Seoul Garden</p>
          <p className="mt-2 text-sm">
            Premium Korean dining in the heart of Seoul.
          </p>
        </div>

        <nav className="flex flex-wrap gap-5 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-amber-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              className="transition hover:text-amber-100"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;