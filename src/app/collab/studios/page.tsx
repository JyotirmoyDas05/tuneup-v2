"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// This would typically come from an API or database
const studiosData = [
  {
    id: "harmony-studio",
    name: "Harmony Studio",
    image: "/images/studios/harmony-main.jpg",
    type: "Professional Recording Studio",
    description: "State-of-the-art recording facility with vintage and modern equipment. Specializing in all genres of music.",
    location: "Andheri West, Mumbai",
    features: ["Pro Tools HDX", "Neve Console", "Multiple Live Rooms"],
    rateRange: "₹2,500 - ₹15,000"
  },
  {
    id: "sound-garden",
    name: "Sound Garden",
    image: "/images/studios/sound-garden.jpg",
    type: "Recording & Rehearsal Studio",
    description: "Versatile space for recording and rehearsals with professional equipment and experienced engineers.",
    location: "Indiranagar, Bangalore",
    features: ["Recording Suite", "Rehearsal Space", "Equipment Rental"],
    rateRange: "₹1,500 - ₹10,000"
  },
  {
    id: "rhythm-house",
    name: "Rhythm House",
    image: "/images/studios/rhythm-house.jpg",
    type: "Production Studio",
    description: "Modern production facility specializing in contemporary music production and post-production.",
    location: "Juhu, Mumbai",
    features: ["Production Suites", "Mixing", "Mastering"],
    rateRange: "₹3,000 - ₹20,000"
  },
  {
    id: "sonic-labs",
    name: "Sonic Labs",
    image: "/images/studios/sonic-labs.jpg",
    type: "Recording & Production Studio",
    description: "Cutting-edge studio focusing on modern music production with state-of-the-art digital equipment.",
    location: "HSR Layout, Bangalore",
    features: ["Digital Workstations", "Virtual Instruments", "Online Sessions"],
    rateRange: "₹2,000 - ₹12,000"
  }
];

export default function StudiosPage() {
  const router = useRouter();

  const handleConnect = (studioId: string) => {
    router.push(`/collab/studios/${studioId}`);
  };

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Recording Studios</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Types</option>
              <option value="recording">Recording</option>
              <option value="rehearsal">Rehearsal</option>
              <option value="production">Production</option>
              <option value="post-production">Post-Production</option>
            </select>
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Locations</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studiosData.map((studio) => (
            <div
              key={studio.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={studio.image}
                  alt={studio.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{studio.name}</h2>
                <span className="inline-block px-3 py-1 bg-[#BAE6FF] text-gray-800 rounded-full text-sm mb-4">
                  {studio.type}
                </span>
                <p className="text-gray-600 mb-4">{studio.description}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {studio.features.map((feature, index) => (
                        <span
                          key={index}
                          className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{studio.location}</span>
                    <span>{studio.rateRange}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleConnect(studio.id)}
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