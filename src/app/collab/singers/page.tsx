"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// This would typically come from an API or database
const singersData = [
  {
    id: "arijit-singh",
    name: "Arijit Singh",
    image: "/images/singers/arijit.jpg",
    genres: ["Bollywood", "Classical", "Sufi"],
    description: "Versatile playback singer known for soulful renditions and emotional depth in music.",
    experience: "15+ years",
    location: "Mumbai, Maharashtra"
  },
  {
    id: "shreya-ghoshal",
    name: "Shreya Ghoshal",
    image: "/images/singers/shreya.jpg",
    genres: ["Bollywood", "Classical", "Folk"],
    description: "Award-winning vocalist with expertise in multiple Indian languages and classical training.",
    experience: "20+ years",
    location: "Mumbai, Maharashtra"
  },
  {
    id: "amit-trivedi",
    name: "Amit Trivedi",
    image: "/images/singers/amit.jpg",
    genres: ["Indie", "Folk", "Fusion"],
    description: "Singer-composer known for innovative soundscapes and contemporary fusion music.",
    experience: "12+ years",
    location: "Mumbai, Maharashtra"
  },
  {
    id: "neha-kakkar",
    name: "Neha Kakkar",
    image: "/images/singers/neha.jpg",
    genres: ["Pop", "Bollywood", "Folk"],
    description: "Popular singer known for energetic performances and modern pop interpretations.",
    experience: "10+ years",
    location: "Delhi, NCR"
  }
];

export default function SingersPage() {
  const router = useRouter();

  const handleConnect = (singerId: string) => {
    router.push(`/collab/singers/${singerId}`);
  };

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Top Artists</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Genres</option>
              <option value="bollywood">Bollywood</option>
              <option value="classical">Classical</option>
              <option value="folk">Folk</option>
              <option value="pop">Pop</option>
              <option value="indie">Indie</option>
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
          {singersData.map((singer) => (
            <div
              key={singer.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={singer.image}
                  alt={singer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{singer.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {singer.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-[#BAE6FF] text-gray-800 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{singer.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
                  <span>{singer.experience}</span>
                  <span>{singer.location}</span>
                </div>
                <button
                  onClick={() => handleConnect(singer.id)}
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