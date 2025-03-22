"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Discover', href: '/discover' },
    { label: 'Collaboration', href: '/collab' },
    { label: 'Community', href: '/community' },
    { label: 'Events', href: '/events' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Copyright', href: '/copyright' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1E4B7C] text-white py-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">TuneUp</h2>
            <p className="text-sm text-gray-300">
              Connecting musicians and creators worldwide to collaborate and amplify their sound.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            © 2025 TuneUp. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 