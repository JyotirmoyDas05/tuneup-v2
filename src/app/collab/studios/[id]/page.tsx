"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

// This would typically come from an API or database
const studiosData = {
  "harmony-studio": {
    name: "Harmony Studio",
    image: "/images/studios/harmony-main.jpg",
    description: "A state-of-the-art recording facility offering professional recording, mixing, and mastering services. Our studio combines vintage warmth with modern precision.",
    type: "Professional Recording Studio",
    established: "2015",
    facilities: [
      {
        name: "Main Recording Room",
        description: "Large acoustically treated room with isolation booths",
        image: "/images/studios/main-room.jpg",
        features: [
          "500 sq ft space",
          "Variable acoustic panels",
          "3 isolation booths",
          "Natural lighting"
        ]
      },
      {
        name: "Control Room",
        description: "Professional mixing and mastering environment",
        image: "/images/studios/control-room.jpg",
        features: [
          "Neve console",
          "Pro Tools HDX",
          "Analog processing",
          "5.1 monitoring"
        ]
      }
    ],
    equipment: {
      microphones: [
        "Neumann U87",
        "AKG C414",
        "Shure SM7B",
        "Royer R-121"
      ],
      preamps: [
        "Neve 1073",
        "API 512",
        "Universal Audio 610"
      ],
      instruments: [
        "Yamaha C7 Grand Piano",
        "Various vintage guitars",
        "Full drum kit",
        "Bass amplifiers"
      ]
    },
    services: [
      {
        name: "Recording Session",
        description: "Professional recording with experienced engineer",
        rate: "₹2500/hour"
      },
      {
        name: "Mixing",
        description: "Detailed mixing of your tracks",
        rate: "₹15000/song"
      },
      {
        name: "Mastering",
        description: "Final polish for your music",
        rate: "₹5000/song"
      }
    ],
    engineers: [
      {
        name: "Rahul Kumar",
        role: "Chief Engineer",
        experience: "15+ years",
        image: "/images/studios/engineers/rahul.jpg"
      },
      {
        name: "Priya Singh",
        role: "Mix Engineer",
        experience: "8 years",
        image: "/images/studios/engineers/priya.jpg"
      }
    ],
    clientele: [
      "Dhwani",
      "AR Rahman",
      "The Local Train",
      "Various indie artists"
    ],
    availability: "Available for bookings 7 days a week, 10 AM to 10 PM",
    location: "Andheri West, Mumbai",
    contact: {
      email: "info@harmonystudio.com",
      phone: "+91 98765 43210"
    },
    socialLinks: {
      instagram: "#",
      facebook: "#",
      youtube: "#"
    }
  },
  // Add other studios here...
};

export default function StudioProfile() {
  const params = useParams();
  const studioId = params.id as string;
  const studio = studiosData[studioId];

  if (!studio) {
    return (
      <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">Studio not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={studio.image}
                alt={studio.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-800">{studio.name}</h1>
              <span className="bg-[#BAE6FF] text-gray-800 px-3 py-1 rounded-full text-sm">
                {studio.type}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{studio.description}</p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Established</h2>
                <p className="text-gray-600">{studio.established}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Location</h2>
                <p className="text-gray-600">{studio.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studio.facilities.map((facility) => (
              <div key={facility.name} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{facility.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{facility.description}</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {facility.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Equipment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Microphones</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {studio.equipment.microphones.map((mic, index) => (
                  <li key={index}>{mic}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Preamps</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {studio.equipment.preamps.map((preamp, index) => (
                  <li key={index}>{preamp}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Instruments</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                {studio.equipment.instruments.map((instrument, index) => (
                  <li key={index}>{instrument}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {studio.services.map((service) => (
              <div key={service.name} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <p className="text-[#3674B5] font-semibold">{service.rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engineers Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Engineers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {studio.engineers.map((engineer) => (
              <div key={engineer.name} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="relative w-20 h-20">
                  <Image
                    src={engineer.image}
                    alt={engineer.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{engineer.name}</h3>
                  <p className="text-sm text-gray-600">{engineer.role}</p>
                  <p className="text-sm text-gray-600">{engineer.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clientele Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notable Clients</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600">{studio.clientele.join(" • ")}</p>
          </div>
        </div>

        {/* Availability Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Availability</h2>
          <p className="text-gray-600">{studio.availability}</p>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600">Email: {studio.contact.email}</p>
            <p className="text-gray-600">Phone: {studio.contact.phone}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-8 flex gap-4">
          <button className="bg-[#3674B5] text-white px-8 py-3 rounded-full hover:bg-[#2A5C91] transition-colors">
            Book Studio
          </button>
          <button className="bg-[#BAE6FF] text-gray-800 px-8 py-3 rounded-full hover:bg-[#A1E3F9] transition-colors">
            Contact Us
          </button>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex gap-4">
          {Object.entries(studio.socialLinks).map(([platform, link]) => (
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