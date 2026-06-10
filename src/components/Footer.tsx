"use client";

import { Link } from "react";
import { Icon } from "@/components/ui/icon";
import { Twitter, Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Seoul Garden. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Icon as={Twitter} className="text-gray-400 hover:text-white" />
          <Icon as={Instagram} className="text-gray-400 hover:text-white" />
          <Icon as={Facebook} className="text-gray-400 hover:text-white" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;