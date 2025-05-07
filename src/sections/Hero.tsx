'use client';

import React, { useEffect, useRef } from "react";
import Heroimage from "../../public/HeroImage.png";
import Image from "next/image";
import Wrapper from "@/shared/wrapper";
import { Inter, Poppins } from 'next/font/google'
import SlideArrowButton from "@/components/SlideArrowButton";
import { useRouter } from "next/navigation";
import { gsap, fadeIn, slideInLeft, slideInRight, createParallax } from "@/lib/animation/gsap";

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['500'],
  subsets: ['latin']
})

const Hero = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animations when component mounts
    const ctx = gsap.context(() => {
      // Animate gradient and blobs with slight delay for visual interest
      if (gradientRef.current) {
        gsap.from(gradientRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.out"
        });
      }
      
      // Group blobs and check if they exist
      const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current].filter(Boolean);
      if (blobs.length > 0) {
        gsap.from(blobs, {
          opacity: 0,
          scale: 0.8,
          duration: 1.8,
          stagger: 0.2,
          ease: "power2.out"
        });
      }
      
      // Animate content with null checks
      if (headingRef.current) slideInLeft(headingRef.current, 0.3, 1.2);
      if (paragraphRef.current) fadeIn(paragraphRef.current, 0.6, 1);
      if (buttonRef.current) fadeIn(buttonRef.current, 0.9, 1);
      if (imageRef.current) slideInRight(imageRef.current, 0.5, 1.2);
      
      // Add parallax effects on scroll
      if (blob1Ref.current) createParallax(blob1Ref.current, 0.3);
      if (blob2Ref.current) createParallax(blob2Ref.current, 0.4);
      if (blob3Ref.current) createParallax(blob3Ref.current, 0.2);
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen relative overflow-hidden">
      {/* Gradient Vector Background */}
      <div ref={gradientRef} className="absolute inset-0 bg-gradient-to-br from-[#3674B5] via-[#578FCA] to-[#A1E3F9] opacity-20" />
      <div ref={blob1Ref} className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[130px] opacity-30" />
      <div ref={blob2Ref} className="absolute left-10 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[100px] opacity-25" />
      <div ref={blob3Ref} className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#578FCA] blur-[120px] opacity-20" />
      
      <div className="relative flex items-center justify-center min-h-screen">
        <Wrapper>
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* left */}
            <div className="md:w-1/2 text-center md:text-left relative z-10">
              <div className="absolute -left-32 top-0 w-[200px] h-[200px] rounded-full bg-[#578FCA] blur-[80px] opacity-30" />
              <div className="absolute -left-20 bottom-0 w-[180px] h-[180px] rounded-full bg-[#A1E3F9] blur-[90px] opacity-25" />
              <h1 ref={headingRef} className="text-[75px] font-bold text-slate-700 mb-6 font-['Abyssinica_SIL'] text-center tracking-[-5px] relative">
                Where music meets Collaboration
              </h1>
              <p ref={paragraphRef} className={`text-lg text-slate-600 mb-8 ${inter.className} relative`}>
                Connect with singers, musicians, bands, and studios to create,
                collaborate, and amplify your sound.
              </p>
              <div ref={buttonRef} className="flex justify-center relative">
                <SlideArrowButton 
                  text="Start your Journey" 
                  primaryColor="#3674B5"
                  className={poppins.className}
                  onClick={() => router.push('/signup')}
                />
              </div>
            </div>
            {/* right */}
            <div ref={imageRef} className="md:w-1/2 relative z-0">
              <Image 
                src={Heroimage} 
                alt="Hero Image"
                className="relative z-10"
              />
              <div className="absolute right-0 top-1/2 w-[300px] h-[300px] rounded-full bg-[#D1F8EF] blur-[100px] opacity-15" />
            </div>
          </div>
        </Wrapper>
      </div>
    </section>
  );
};

export default Hero;
