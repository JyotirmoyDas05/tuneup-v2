"use client";

import React from 'react';
import { Inter } from 'next/font/google';
import { Music } from 'lucide-react';
import ShinyCard from '@/components/animata/card/github-card-shiny';

const inter = Inter({ subsets: ['latin'] });

export default function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden pt-20 bg-slate-50/30">
      {/* Gradient Vector Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5" />
      <div className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[150px] opacity-10" />
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[120px] opacity-10" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#578FCA] blur-[140px] opacity-10" />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <h1 className="text-6xl font-bold text-center text-[#3674B5] mb-16 drop-shadow-sm">
          About Us
        </h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ShinyCard
            title="Who We Are"
            emoji="🧑‍🤝‍🧑"
            content={
              <p className={inter.className}>
                We are a team of passionate innovators—Prajnan Kumar Sarma, Garima Devi, Tanmoy Kalita, and Jyotirmoy Das—
                from the departments of IT, ECE, CSE, and CSE respectively, currently in our 2nd semester. Combining our love for
                technology and music, we&apos;ve built this platform to empower artists, creators, and industry professionals.
              </p>
            }
          />

          <ShinyCard
            title="Our Mission"
            emoji="🎯"
            content={
              <p className={inter.className}>
                Our goal is simple: to create a vibrant space where singers, musicians, bands, and studios can find each
                other effortlessly. Whether you&apos;re looking for a vocalist for your track, a guitarist for your band, or a producer for your
                next album, this platform is built to help you discover and collaborate with the right people.
              </p>
            }
          />

          <ShinyCard
            title="Why We Built This?"
            emoji="🤔"
            content={
              <ul className={`space-y-4 ${inter.className}`}>
                <li><strong>Finding collaborators shouldn&apos;t be hard</strong>—we wanted to build a place where artists can connect instantly.</li>
                <li><strong>Music is meant to be shared</strong>—this platform allows artists to showcase their talent and get discovered.</li>
                <li><strong>Community matters</strong>—we believe in supporting and uplifting musicians through a strong, like-minded community.</li>
              </ul>
            }
          />

          <ShinyCard
            title="Join Us!"
            emoji="🤝"
            content={
              <div className={inter.className}>
                <p className="mb-4">
                  Be a part of a growing network of artists and turn your musical ideas into reality. Whether you&apos;re a solo singer, an
                  instrumentalist, a band, or a studio—this is your space to create, collaborate, and shine!
                </p>
                <p className="text-[#3674B5] font-semibold flex items-center gap-2">
                  Let&apos;s make music happen, together! <Music className="inline-block" />
                </p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
} 