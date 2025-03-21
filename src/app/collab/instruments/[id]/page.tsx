"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

// This would typically come from an API or database
const musiciansData = {
  "ravi-kumar": {
    name: "Ravi Kumar",
    image: "/images/artists/musician1.jpg",
    description: "Accomplished tabla player with 15 years of experience in classical and fusion music. Trained under renowned gurus and performed internationally.",
    instruments: ["Tabla", "Percussion"],
    expertise: ["Indian Classical", "Fusion", "Contemporary"],
    experience: "15+ years",
    training: "Trained under Pt. Anindo Chatterjee",
    achievements: [
      "Performed at major music festivals across India",
      "Collaborated with international artists",
      "Featured in award-winning albums"
    ],
    availability: "Available for recordings and live performances",
    location: "Delhi, India",
    equipment: [
      "Professional Tabla Set",
      "Electronic Tabla",
      "Various Percussion Instruments"
    ],
    rates: {
      hourly: "₹2000/hour",
      session: "₹15000/session",
      performance: "Custom quote"
    },
    socialLinks: {
      instagram: "#",
      youtube: "#",
      soundcloud: "#"
    }
  },
  // Add other musicians here...
};

export default function MusicianProfile() {
  const params = useParams();
  const musicianId = params.id as string;
  const musician = musiciansData[musicianId];

  if (!musician) {
    return (
      <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">Musician not found</h1>
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
                src={musician.image}
                alt={musician.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{musician.name}</h1>
            <p className="text-gray-600 mb-6">{musician.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {musician.instruments.map((instrument) => (
                <span 
                  key={instrument}
                  className="bg-[#BAE6FF] text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {instrument}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Expertise</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {musician.expertise.map((skill) => (
                    <span 
                      key={skill}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Experience</h2>
                <p className="text-gray-600">{musician.experience}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Training</h2>
                <p className="text-gray-600">{musician.training}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Location</h2>
                <p className="text-gray-600">{musician.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Equipment</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {musician.equipment.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Achievements Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {musician.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        {/* Rates Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(musician.rates).map(([type, rate]) => (
              <div key={type} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 capitalize mb-2">{type}</h3>
                <p className="text-gray-600">{rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
          <p className="text-gray-600">{musician.availability}</p>
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
          {Object.entries(musician.socialLinks).map(([platform, link]) => (
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