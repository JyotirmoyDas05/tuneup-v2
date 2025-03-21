"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// This would typically come from an API or database
const musiciansData = [
  {
    id: "zakir-hussain",
    name: "Zakir Hussain",
    image: "/images/musicians/zakir.jpg",
    instruments: ["Tabla", "Percussion"],
    description: "Legendary tabla maestro known for his virtuosic performances and cross-cultural collaborations.",
    experience: "40+ years",
    location: "Mumbai, Maharashtra",
    expertise: "Classical"
  },
  {
    id: "vishwa-mohan",
    name: "Vishwa Mohan Bhatt",
    image: "/images/musicians/vishwa.jpg",
    instruments: ["Mohan Veena", "Guitar"],
    description: "Grammy-winning musician known for his innovative fusion of Hindustani classical music with western guitar.",
    experience: "35+ years",
    location: "Jaipur, Rajasthan",
    expertise: "Classical, Fusion"
  },
  {
    id: "rahul-sharma",
    name: "Rahul Sharma",
    image: "/images/musicians/rahul.jpg",
    instruments: ["Santoor"],
    description: "Renowned santoor player known for his melodious compositions and contemporary interpretations.",
    experience: "25+ years",
    location: "Mumbai, Maharashtra",
    expertise: "Classical, Contemporary"
  },
  {
    id: "karan-kumar",
    name: "Karan Kumar",
    image: "/images/musicians/karan.jpg",
    instruments: ["Guitar", "Bass"],
    description: "Versatile guitarist specializing in rock and fusion music with extensive studio experience.",
    experience: "15+ years",
    location: "Bangalore, Karnataka",
    expertise: "Rock, Jazz, Fusion"
  }
];

export default function MusiciansPage() {
  const router = useRouter();

  const handleConnect = (musicianId: string) => {
    router.push(`/collab/instruments/${musicianId}`);
  };

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Instrument Players</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Instruments</option>
              <option value="tabla">Tabla</option>
              <option value="guitar">Guitar</option>
              <option value="santoor">Santoor</option>
              <option value="sitar">Sitar</option>
              <option value="violin">Violin</option>
            </select>
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Expertise</option>
              <option value="classical">Classical</option>
              <option value="fusion">Fusion</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musiciansData.map((musician) => (
            <div
              key={musician.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={musician.image}
                  alt={musician.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{musician.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {musician.instruments.map((instrument) => (
                    <span
                      key={instrument}
                      className="px-3 py-1 bg-[#BAE6FF] text-gray-800 rounded-full text-sm"
                    >
                      {instrument}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{musician.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{musician.experience}</span>
                  <span>{musician.location}</span>
                </div>
                <div className="mb-6">
                  <span className="text-sm text-gray-600">Expertise: {musician.expertise}</span>
                </div>
                <button
                  onClick={() => handleConnect(musician.id)}
                  className="w-full bg-[#3674B5] text-white py-2 rounded-full hover:bg-[#2A5C91] transition-colors"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 