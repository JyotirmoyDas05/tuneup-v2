"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// This would typically come from an API or database
const venuesData = [
  {
    id: "blue-moon",
    name: "Blue Moon Cafe",
    image: "/images/venues/blue-moon.jpg",
    type: "Cafe & Performance Space",
    description: "A vibrant cafe and performance space known for its intimate acoustic sessions and indie music nights.",
    location: "Bandra West, Mumbai",
    capacity: "80 people",
    features: ["Live Music Setup", "Full Service Bar", "Food Menu"],
    eventTypes: ["Acoustic Sessions", "Band Performances", "Open Mic"],
    priceRange: "₹10,000 - ₹25,000 per event"
  },
  {
    id: "urban-beats",
    name: "Urban Beats",
    image: "/images/venues/urban-beats.jpg",
    type: "Bar & Music Lounge",
    description: "Modern bar with state-of-the-art sound system and dedicated performance area for live bands.",
    location: "Indiranagar, Bangalore",
    capacity: "120 people",
    features: ["Professional Sound System", "Stage Lighting", "Green Room"],
    eventTypes: ["Live Bands", "DJ Nights", "Music Launch Events"],
    priceRange: "₹15,000 - ₹35,000 per event"
  },
  {
    id: "heritage-hotel",
    name: "The Heritage Hotel",
    image: "/images/venues/heritage.jpg",
    type: "Luxury Hotel Venue",
    description: "Elegant hotel venue with multiple performance spaces perfect for classical concerts and formal events.",
    location: "South Delhi",
    capacity: "200-500 people",
    features: ["Multiple Venues", "Premium Acoustics", "Full Event Support"],
    eventTypes: ["Classical Concerts", "Corporate Events", "Music Festivals"],
    priceRange: "₹50,000 - ₹2,00,000 per event"
  },
  {
    id: "rustic-bistro",
    name: "Rustic Bistro",
    image: "/images/venues/rustic.jpg",
    type: "Restaurant & Music Venue",
    description: "Cozy bistro with a dedicated music corner, perfect for intimate performances and acoustic sessions.",
    location: "Koramangala, Bangalore",
    capacity: "60 people",
    features: ["Intimate Setting", "Basic Sound Setup", "Food & Beverages"],
    eventTypes: ["Acoustic Nights", "Small Ensembles", "Poetry & Music"],
    priceRange: "₹8,000 - ₹20,000 per event"
  }
];

export default function VenuesPage() {
  const router = useRouter();

  const handleConnect = (venueId: string) => {
    router.push(`/collab/venues/${venueId}`);
  };

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Venues</h1>
          <div className="flex gap-4">
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Types</option>
              <option value="cafe">Cafes</option>
              <option value="bar">Bars</option>
              <option value="hotel">Hotels</option>
              <option value="restaurant">Restaurants</option>
            </select>
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">All Locations</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
            </select>
            <select className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600">
              <option value="">Capacity</option>
              <option value="small">Under 100</option>
              <option value="medium">100-200</option>
              <option value="large">200+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venuesData.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h2>
                <span className="inline-block px-3 py-1 bg-[#BAE6FF] text-gray-800 rounded-full text-sm mb-4">
                  {venue.type}
                </span>
                <p className="text-gray-600 mb-4">{venue.description}</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Event Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {venue.eventTypes.map((type, index) => (
                        <span
                          key={index}
                          className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{venue.location}</span>
                    <span>Capacity: {venue.capacity}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>Price Range: {venue.priceRange}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleConnect(venue.id)}
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