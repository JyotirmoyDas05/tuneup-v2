"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

// This would typically come from an API or database
const bandsData = {
  "dhwani": {
    name: "Dhwani",
    image: "/images/bands/band1.jpg",
    description: "A dynamic fusion band blending classical Indian ragas with modern rock elements. Known for their energetic live performances and innovative arrangements.",
    genre: "Fusion Rock",
    formed: "2019",
    members: [
      {
        name: "Vikram Mehta",
        role: "Lead Vocals, Guitar",
        image: "/images/bands/members/vikram.jpg"
      },
      {
        name: "Anjali Desai",
        role: "Sitar, Backing Vocals",
        image: "/images/bands/members/anjali.jpg"
      },
      {
        name: "Karthik Iyer",
        role: "Tabla, Percussion",
        image: "/images/bands/members/karthik.jpg"
      },
      {
        name: "Nisha Sharma",
        role: "Bass Guitar",
        image: "/images/bands/members/nisha.jpg"
      }
    ],
    achievements: [
      "Winner of Band Hunt 2022",
      "Featured at major music festivals",
      "Released debut album 'Fusion Echoes'"
    ],
    discography: [
      {
        title: "Fusion Echoes",
        year: "2022",
        type: "Album"
      },
      {
        title: "Mystic Journey",
        year: "2021",
        type: "EP"
      }
    ],
    upcomingShows: [
      {
        date: "2024-04-15",
        venue: "Blue Moon Arena",
        location: "Mumbai"
      },
      {
        date: "2024-04-28",
        venue: "Fusion Festival",
        location: "Delhi"
      }
    ],
    availability: "Available for live performances and collaborations",
    location: "Mumbai, Maharashtra",
    socialLinks: {
      instagram: "#",
      youtube: "#",
      spotify: "#",
      facebook: "#"
    }
  },
  // Add other bands here...
};

export default function BandProfile() {
  const params = useParams();
  const bandId = params.id as string;
  const band = bandsData[bandId];

  if (!band) {
    return (
      <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">Band not found</h1>
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
                src={band.image}
                alt={band.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-800">{band.name}</h1>
              <span className="bg-[#BAE6FF] text-gray-800 px-3 py-1 rounded-full text-sm">
                {band.genre}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{band.description}</p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Formed</h2>
                <p className="text-gray-600">{band.formed}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Location</h2>
                <p className="text-gray-600">{band.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Band Members Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Band Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {band.members.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Discography Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Discography</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {band.discography.map((release) => (
              <div key={release.title} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800">{release.title}</h3>
                <p className="text-sm text-gray-600">{release.year} • {release.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Shows Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Shows</h2>
          <div className="space-y-4">
            {band.upcomingShows.map((show) => (
              <div key={show.date} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{new Date(show.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="text-sm text-gray-600">{show.venue}, {show.location}</p>
                </div>
                <button className="bg-[#BAE6FF] text-gray-800 px-4 py-2 rounded-full hover:bg-[#A1E3F9] transition-colors text-sm">
                  Book Tickets
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            {band.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>

        {/* Availability Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
          <p className="text-gray-600">{band.availability}</p>
        </div>

        {/* Contact Section */}
        <div className="mt-8 flex gap-4">
          <button className="bg-[#3674B5] text-white px-8 py-3 rounded-full hover:bg-[#2A5C91] transition-colors">
            Message
          </button>
          <button className="bg-[#BAE6FF] text-gray-800 px-8 py-3 rounded-full hover:bg-[#A1E3F9] transition-colors">
            Book Band
          </button>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex gap-4">
          {Object.entries(band.socialLinks).map(([platform, link]) => (
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