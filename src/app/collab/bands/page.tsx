"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// This would typically come from an API or database
const bandsData = [
  {
    id: "indian-ocean",
    name: "Indian Ocean",
    image: "/images/bands/indian-ocean.jpg",
    genres: ["Fusion", "Rock", "Folk"],
    description: "Pioneering fusion rock band known for their unique blend of Indian classical, folk, and rock music.",
    experience: "30+ years",
    location: "Delhi, NCR",
    members: "5 members"
  },
  {
    id: "agam",
    name: "Agam",
    image: "/images/bands/agam.jpg",
    genres: ["Carnatic", "Progressive Rock"],
    description: "Contemporary Carnatic progressive rock band pushing the boundaries of traditional and modern music.",
    experience: "15+ years",
    location: "Bangalore, Karnataka",
    members: "7 members"
  },
  {
    id: "local-train",
    name: "The Local Train",
    image: "/images/bands/local-train.jpg",
    genres: ["Hindi Rock", "Alternative"],
    description: "Popular Hindi rock band known for their powerful lyrics and energetic performances.",
    experience: "10+ years",
    location: "Mumbai, Maharashtra",
    members: "4 members"
  },
  {
    id: "parvaaz",
    name: "Parvaaz",
    image: "/images/bands/parvaaz.jpg",
    genres: ["Psychedelic Rock", "Blues"],
    description: "Psychedelic rock band with influences from Kashmir and blues music.",
    experience: "12+ years",
    location: "Bangalore, Karnataka",
    members: "4 members"
  }
];

export default function BandsPage() {
  const router = useRouter();

  const handleConnect = (bandId: string) => {
    router.push(`/collab/bands/${bandId}`);
  };

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Featured Bands</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Genres</option>
              <option value="rock">Rock</option>
              <option value="fusion">Fusion</option>
              <option value="folk">Folk</option>
              <option value="classical">Classical</option>
              <option value="alternative">Alternative</option>
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
          {bandsData.map((band) => (
            <div
              key={band.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={band.image}
                  alt={band.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{band.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {band.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-[#BAE6FF] text-gray-800 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{band.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <span>{band.experience}</span>
                  <span>{band.location}</span>
                </div>
                <div className="mb-6">
                  <span className="text-sm text-gray-600">{band.members}</span>
                </div>
                <button
                  onClick={() => handleConnect(band.id)}
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