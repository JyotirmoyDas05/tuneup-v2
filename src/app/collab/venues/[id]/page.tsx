"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import BookingForm from "@/components/booking/BookingForm";
import { Toaster } from "react-hot-toast";

// Define interfaces for venue data
interface Space {
  name: string;
  description: string;
  image: string;
  features: string[];
}

interface Amenity {
  name: string;
  details: string[];
}

interface Event {
  name: string;
  description: string;
  schedule: string;
  price: string;
}

interface FoodMenu {
  cuisine: string;
  specialties: string[];
  serviceHours: string;
}

interface BookingInfo {
  slots: string[];
  rates: string;
  minimumDuration: string;
}

interface Location {
  address: string;
  city: string;
  landmarks: string;
  parking: string;
}

interface Contact {
  email: string;
  phone: string;
  manager: string;
}

interface SocialLinks {
  instagram: string;
  facebook: string;
  zomato: string;
}

interface Venue {
  name: string;
  image: string;
  description: string;
  type: string;
  established: string;
  capacity: string;
  spaces: Space[];
  amenities: Amenity[];
  events: Event[];
  pastPerformers: string[];
  foodMenu: FoodMenu;
  bookingInfo: BookingInfo;
  location: Location;
  contact: Contact;
  socialLinks: SocialLinks;
}

// Use Record to define proper string indexing
const venuesData: Record<string, Venue> = {
  "blue-moon": {
    name: "Blue Moon Cafe",
    image: "/images/venues/blue-moon-main.jpg",
    description: "A vibrant cafe and performance space known for its intimate acoustic sessions and indie music nights. Our venue provides the perfect atmosphere for both artists and music lovers.",
    type: "Cafe & Performance Space",
    established: "2018",
    capacity: "80 people",
    spaces: [
      {
        name: "Main Performance Area",
        description: "Intimate stage with professional sound setup",
        image: "/images/venues/main-stage.jpg",
        features: [
          "Professional lighting",
          "Full PA system",
          "Stage monitors",
          "Intimate seating"
        ]
      },
      {
        name: "Outdoor Garden",
        description: "Beautiful garden space for acoustic sessions",
        image: "/images/venues/garden.jpg",
        features: [
          "Natural ambiance",
          "Covered seating",
          "Ambient lighting",
          "Weather protected"
        ]
      }
    ],
    amenities: [
      {
        name: "Sound System",
        details: [
          "JBL powered speakers",
          "Allen & Heath mixer",
          "Wireless microphones",
          "Stage monitors"
        ]
      },
      {
        name: "Instruments",
        details: [
          "House acoustic guitar",
          "Digital piano",
          "Basic percussion",
          "Microphone stands"
        ]
      },
      {
        name: "Facilities",
        details: [
          "Green room",
          "Professional lighting",
          "Air conditioning",
          "Parking space"
        ]
      }
    ],
    events: [
      {
        name: "Acoustic Nights",
        description: "Weekly acoustic performances",
        schedule: "Every Thursday, 7 PM onwards",
        price: "No cover charge"
      },
      {
        name: "Band Saturdays",
        description: "Full band performances",
        schedule: "Every Saturday, 8 PM onwards",
        price: "₹300 cover charge"
      },
      {
        name: "Open Mic",
        description: "Open mic night for emerging artists",
        schedule: "Every Tuesday, 7 PM onwards",
        price: "No cover charge"
      }
    ],
    pastPerformers: [
      "Dhwani",
      "The Local Train",
      "Various indie artists"
    ],
    foodMenu: {
      cuisine: "Continental & Indian",
      specialties: [
        "Wood-fired pizzas",
        "Artisanal coffee",
        "Craft cocktails"
      ],
      serviceHours: "11 AM to 11 PM"
    },
    bookingInfo: {
      slots: [
        "Weekday evenings (7 PM - 10 PM)",
        "Weekend slots (7 PM - 11 PM)",
        "Special event timings available"
      ],
      rates: "Starting from ₹10,000 per slot",
      minimumDuration: "3 hours"
    },
    location: {
      address: "123 Music Street, Bandra West",
      city: "Mumbai",
      landmarks: "Near Bandstand",
      parking: "Available"
    },
    contact: {
      email: "bookings@bluemoon.com",
      phone: "+91 98765 43210",
      manager: "Amit Shah"
    },
    socialLinks: {
      instagram: "#",
      facebook: "#",
      zomato: "#"
    }
  },
  // Add other venues here...
};

export default function VenueProfile() {
  const params = useParams();
  const venueId = params.id as string;
  const venue = venuesData[venueId];
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!venue) {
    return (
      <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">Venue not found</h1>
        </div>
      </main>
    );
  }

  const handleBookingComplete = () => {
    setShowBookingForm(false);
    // In a real implementation, you would update the notifications in your backend
    // and the cafe owner would see the new booking request in their dashboard
  };

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
              <Image
                src={venue.image}
                alt={venue.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-gray-800">{venue.name}</h1>
              <span className="bg-[#BAE6FF] text-gray-800 px-3 py-1 rounded-full text-sm">
                {venue.type}
              </span>
            </div>
            <p className="text-gray-600 mb-6">{venue.description}</p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Established</h2>
                <p className="text-gray-600">{venue.established}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Capacity</h2>
                <p className="text-gray-600">{venue.capacity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Spaces Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Spaces</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venue.spaces.map((space) => (
              <div key={space.name} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={space.image}
                    alt={space.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">{space.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{space.description}</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {space.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venue.amenities.map((amenity) => (
              <div key={amenity.name} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">{amenity.name}</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {amenity.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Regular Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {venue.events.map((event) => (
              <div key={event.name} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{event.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <p className="text-sm text-gray-600">{event.schedule}</p>
                <p className="text-[#3674B5] font-semibold mt-2">{event.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Food Menu Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Food & Beverages</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Cuisine</h3>
              <p className="text-gray-600">{venue.foodMenu.cuisine}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Specialties</h3>
              <ul className="list-disc list-inside text-gray-600">
                {venue.foodMenu.specialties.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Service Hours</h3>
              <p className="text-gray-600">{venue.foodMenu.serviceHours}</p>
            </div>
          </div>
        </div>

        {/* Booking Information */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Information</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Available Slots</h3>
              <ul className="list-disc list-inside text-gray-600">
                {venue.bookingInfo.slots.map((slot, index) => (
                  <li key={index}>{slot}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-gray-800 mb-2">Rates</h3>
              <p className="text-gray-600">{venue.bookingInfo.rates}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Minimum Duration</h3>
              <p className="text-gray-600">{venue.bookingInfo.minimumDuration}</p>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600">{venue.location.address}</p>
            <p className="text-gray-600">{venue.location.city}</p>
            <p className="text-gray-600">Near: {venue.location.landmarks}</p>
            <p className="text-gray-600">Parking: {venue.location.parking}</p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600">Manager: {venue.contact.manager}</p>
            <p className="text-gray-600">Email: {venue.contact.email}</p>
            <p className="text-gray-600">Phone: {venue.contact.phone}</p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => setShowBookingForm(true)}
            className="bg-[#3674B5] text-white px-8 py-3 rounded-full hover:bg-[#2A5C91] transition-colors"
          >
            Book Venue
          </button>
          <button className="bg-[#BAE6FF] text-gray-800 px-8 py-3 rounded-full hover:bg-[#A1E3F9] transition-colors">
            Contact Us
          </button>
        </div>

        {/* Social Links */}
        <div className="mt-8 flex gap-4 mb-12">
          {Object.entries(venue.socialLinks).map(([platform, link]) => (
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

      {showBookingForm && (
        <BookingForm
          venueId={venueId}
          venueName={venue.name}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </main>
  );
} 