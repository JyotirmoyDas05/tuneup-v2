"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

// Define interfaces for singer data
interface SocialLinks {
  instagram: string;
  youtube: string;
  spotify: string;
}

interface Singer {
  name: string;
  image: string;
  description: string;
  genres: string[];
  experience: string;
  languages: string[];
  achievements: string[];
  availability: string;
  location: string;
  socialLinks: SocialLinks;
}

// Use Record to define proper string indexing
const singersData: Record<string, Singer> = {
  "aanya-sharma": {
    name: "Aanya Sharma",
    image: "/images/artists/singer1.jpg",
    description: "Bringing soulful melodies and heartfelt lyrics to life, Aanya is a versatile singer with a passion for storytelling through music. Influenced by legends like Lata Mangeshkar and A.R. Rahman, her voice blends powerful emotion with smooth R&B rhythms.",
    genres: ["Classical", "R&B", "Bollywood"],
    experience: "8+ years",
    languages: ["Hindi", "English", "Punjabi"],
    achievements: [
      "Winner of Rising Star India 2020",
      "Performed at major music festivals",
      "Released 3 original singles"
    ],
    availability: "Available for live performances and studio recordings",
    location: "Mumbai, Maharashtra",
    socialLinks: {
      instagram: "#",
      youtube: "#",
      spotify: "#"
    }
  },
  // Add other singers here...
};

export default function SingerProfile() {
  const params = useParams();
  const singerId = params.id as string;
  const singer = singersData[singerId];

  if (!singer) {
    return (
      <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">Artist not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/3">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
              <Image
                src={singer.image}
                alt={singer.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{singer.name}</h1>
            <p className="text-gray-600 mb-6">{singer.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {singer.genres.map((genre) => (
                <span 
                  key={genre}
                  className="bg-[#BAE6FF] text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
                <p className="text-gray-600">{singer.experience}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Languages</h2>
                <p className="text-gray-600">{singer.languages.join(", ")}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Location</h2>
                <p className="text-gray-600">{singer.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {singer.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        {/* Availability Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
          <p className="text-gray-600">{singer.availability}</p>
        </div>

        {/* Contact Section */}
        <div className="mt-8 flex gap-4">
          <button className="bg-[#3674B5] text-white px-8 py-3 rounded-full hover:bg-[#2A5C91] transition-colors">
            Message
          </button>
          <button className="bg-[#BAE6FF] text-gray-800 px-8 py-3 rounded-full hover:bg-[#A1E3F9] transition-colors">
            Book Now
          </button>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex gap-4">
          {Object.entries(singer.socialLinks).map(([platform, link]) => (
            <a
              key={platform}
              href={link}
              className="text-gray-600 hover:text-[#3674B5] transition-colors capitalize"
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
} 