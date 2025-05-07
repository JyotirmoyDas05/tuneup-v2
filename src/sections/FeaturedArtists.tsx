"use client";

import React, { useEffect, useRef } from 'react';
import FlipCard from '@/components/animata/card/flip-card';
import Wrapper from '@/shared/wrapper';
import Link from 'next/link';
import { gsap, ScrollTrigger, staggerReveal } from '@/lib/animation/gsap';

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
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background elements animation
      if (backgroundRef.current) {
        gsap.from(backgroundRef.current, {
          opacity: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          }
        });
      }

      // Blobs parallax and fade-in
      [blob1Ref.current, blob2Ref.current].filter(Boolean).forEach((blob, index) => {
        if (blob) {
          gsap.from(blob, {
            opacity: 0,
            scale: 0.7,
            duration: 1.5,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            }
          });
          
          // Parallax effect on blobs
          gsap.to(blob, {
            y: (index + 1) * -30,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            }
          });
        }
      });

      // Heading and description animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          }
        });
      }

      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          }
        });
      }

      // Staggered animation for cards
      if (cardRefs.current.length > 0 && cardsRef.current) {
        const cards = cardRefs.current.filter(Boolean);
        if (cards.length > 0) {
          staggerReveal(cards, 0.15, 0, 0.8);
          
          // Create scroll trigger for cards
          ScrollTrigger.create({
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            onEnter: () => {
              gsap.to(cards, {
                y: 0,
                opacity: 1,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out"
              });
            },
            onLeave: () => {},
            onEnterBack: () => {},
            onLeaveBack: () => {
              gsap.to(cards, {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.in"
              });
            }
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Reset the cardRefs array when artists change
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, featuredArtists.length);
  }, [featuredArtists]);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Gradient Vector Background */}
      <div ref={backgroundRef} className="absolute inset-0 bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5" />
      <div ref={blob1Ref} className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[150px] opacity-10" />
      <div ref={blob2Ref} className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[120px] opacity-10" />
      
      <Wrapper>
        <div className="relative z-10">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center text-[#3674B5] mb-4">
            Featured Artists
          </h2>
          <p ref={descriptionRef} className="text-lg text-[#638AB2] text-center mb-12 max-w-2xl mx-auto">
            Meet some of our talented artists who are making waves in the music industry
          </p>
          
          <div ref={cardsRef} className="flex flex-wrap justify-center gap-8">
            {featuredArtists.map((artist, index) => (
              <Link 
                href={`/profile/${artist.name.toLowerCase().replace(' ', '-')}`} 
                key={artist.name}
                ref={el => cardRefs.current[index] = el}
                className="opacity-0 translate-y-8"
              >
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