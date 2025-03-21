"use client";

import React, { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribing email:', email);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-[#3674B5] mb-4">
          Stay in Tune
        </h2>
        <p className={`text-[#638AB2] mb-8 max-w-2xl mx-auto ${inter.className}`}>
          Subscribe to our newsletter for the latest updates on music collaborations, events, and community news.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3674B5] focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="bg-[#3674B5] text-white px-6 py-2 rounded-lg hover:bg-[#4A8CF7] transition-colors duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
} 