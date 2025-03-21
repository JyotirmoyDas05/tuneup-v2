'use client';

import React from "react";
import Heroimage from "../../public/HeroImage.png";
import Image from "next/image";
import Wrapper from "@/shared/wrapper";
import { Inter, Poppins } from 'next/font/google'
import SlideArrowButton from "@/components/SlideArrowButton";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['500'],
  subsets: ['latin']
})

const Hero = () => {
  const router = useRouter();

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Gradient Vector Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3674B5] via-[#578FCA] to-[#A1E3F9] opacity-20" />
      <div className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[130px] opacity-30" />
      <div className="absolute left-10 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[100px] opacity-25" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#578FCA] blur-[120px] opacity-20" />
      
      <div className="relative flex items-center justify-center min-h-screen">
        <Wrapper>
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* left */}
            <div className="md:w-1/2 text-center md:text-left relative z-10">
              <div className="absolute -left-32 top-0 w-[200px] h-[200px] rounded-full bg-[#578FCA] blur-[80px] opacity-30" />
              <div className="absolute -left-20 bottom-0 w-[180px] h-[180px] rounded-full bg-[#A1E3F9] blur-[90px] opacity-25" />
              <h1 className="text-[75px] font-bold text-slate-700 mb-6 font-['Abyssinica_SIL'] text-center tracking-[-5px] relative">
                Where music meets Collaboration
              </h1>
              <p className={`text-lg text-slate-600 mb-8 ${inter.className} relative`}>
                Connect with singers, musicians, bands, and studios to create,
                collaborate, and amplify your sound.
              </p>
              <div className="flex justify-center relative">
                <SlideArrowButton 
                  text="Start your Journey" 
                  primaryColor="#3674B5"
                  className={poppins.className}
                  onClick={() => router.push('/signup')}
                />
              </div>
            </div>
            {/* right */}
            <div className="md:w-1/2 relative z-0">
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
