"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Poppins } from 'next/font/google';
import ShiningButton from "../ShiningButton";
import { cn } from "@/lib/utils";

const poppins = Poppins({ 
  weight: ['400', '600'],
  subsets: ['latin']
});

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Discover" },
  { href: "/collab", label: "Collab" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="h-auto z-20 sticky inset-0 bg-white/30 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/20">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className={`text-[#4A8CF7] text-4xl ${poppins.className} font-semibold`}>
            TuneUp
          </h1>
        </Link>

        {/* Navbar */}
        <nav>
          <ul className={`flex items-center space-x-8 ${poppins.className}`}>
            {navLinks.map((link) => (
              <li key={link.href} className="relative group">
                <Link 
                  href={link.href}
                  className={cn(
                    "cursor-pointer transition-all duration-300",
                    pathname === link.href 
                      ? "text-[#4A8CF7] font-medium" 
                      : "text-[#638AB2] hover:text-[#4A8CF7]"
                  )}
                >
                  {link.label}
                </Link>
                <div className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 bg-[#4A8CF7] transform origin-left transition-transform duration-300",
                  pathname === link.href 
                    ? "scale-x-100"
                    : "scale-x-0 group-hover:scale-x-100"
                )}/>
              </li>
            ))}
            <li>
              <ShiningButton 
                label="Sign In" 
                className={poppins.className}
                href="/login"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
