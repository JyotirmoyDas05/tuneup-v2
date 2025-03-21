"use client";

import React from 'react';
import FlipCard from '@/components/animata/card/flip-card';
import Wrapper from '@/shared/wrapper';
import Link from 'next/link';

const featuredArtists = [
  {
    name: "Arijit Singh",
    role: "Vocalist",
    image: "/artists/arijit-singh.jpg",
    description: "Award-winning vocalist specializing in jazz and contemporary R&B. Known for powerful performances and emotional depth.",
  },
  {
    name: "Papon",
    role: "Singer",
    image: "/artists/papon.jpg",
    description: "Papon is a renowned Indian playback singer and composer from Assam. Known for his versatility in singing across multiple languages including Hindi, Bengali, Tamil and Marathi.",
  },
  {
    name: "A.R Rahman",
    role: "Producer",
    image: "/artists/a-r-rahman.jpg",
    description: "Multi-platinum producer known for innovative sound design and genre-bending productions. Worked with top industry artists.",
  },
  {
    name: "Zubeen",
    role: "Lyricist,Singer",
    image: "/artists/Zubeen-Garg.jpg",
    description: "Zubeen Garg is a versatile Indian artist known for his work as a singer, composer, and music director. He has made significant contributions to Assamese, Bengali and Hindi music industries through his multi-faceted talents.",
  }
];

export default function FeaturedArtists() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Vector Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5" />
      <div className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[150px] opacity-10" />
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[120px] opacity-10" />
      
      <Wrapper>
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#3674B5] mb-4">
            Featured Artists
          </h2>
          <p className="text-lg text-[#638AB2] text-center mb-12 max-w-2xl mx-auto">
            Meet some of our talented artists who are making waves in the music industry
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            {featuredArtists.map((artist) => (
              <Link href={`/profile/${artist.name.toLowerCase().replace(' ', '-')}`} key={artist.name}>
                <FlipCard
                  image={artist.image}
                  title={artist.name}
                  subtitle={artist.role}
                  description={artist.description}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </Wrapper>
    </section>
  );
} 