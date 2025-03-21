'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface HangoutProfileData {
  venueName: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  location: string;
  description: string;
  venueType: string;
  capacity: string;
  amenities: string[];
  features: string[];
  operatingHours: {
    weekday: string;
    weekend: string;
  };
  pricing: {
    coverCharge: string;
    minimumSpend: string;
  };
}

const venueTypes = [
  'Bar',
  'Lounge',
  'Club',
  'Cafe',
  'Restaurant',
  'Pub',
  'Live Music Venue',
  'Event Space',
  'Rooftop Bar',
  'Sports Bar',
];

const capacityOptions = [
  'Less than 50',
  '50-100',
  '100-200',
  '200-500',
  'More than 500',
];

const amenitiesList = [
  'Parking',
  'WiFi',
  'Air Conditioning',
  'Outdoor Seating',
  'Private Rooms',
  'Smoking Area',
  'Dance Floor',
  'Stage',
  'Sound System',
  'Projector/TV',
  'Bar Service',
  'Food Service',
];

const featuresList = [
  'Live Music',
  'DJ Nights',
  'Karaoke',
  'Open Mic',
  'Sports Screening',
  'Pool Table',
  'Board Games',
  'Trivia Nights',
  'Happy Hours',
  'Weekend Brunch',
  'Private Events',
  'Themed Nights',
];

export default function HangoutProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState<HangoutProfileData>({
    venueName: '',
    ownerName: '',
    phoneNumber: '',
    email: '',
    location: '',
    description: '',
    venueType: '',
    capacity: '',
    amenities: [],
    features: [],
    operatingHours: {
      weekday: '',
      weekend: '',
    },
    pricing: {
      coverCharge: '',
      minimumSpend: '',
    },
  });

  useEffect(() => {
    // Verify user selected Hangout role
    const selectedRole = localStorage.getItem('selectedRole');
    const userData = localStorage.getItem('user');

    if (!selectedRole || selectedRole !== 'Hangout' || !userData) {
      router.push('/profile-selection');
      return;
    }

    // Pre-fill user data
    try {
      const user = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        ownerName: user.firstName ? `${user.firstName} ${user.lastName}` : '',
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof HangoutProfileData],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (item: string, field: 'amenities' | 'features') => {
    setFormData(prev => {
      const currentItems = prev[field];
      if (currentItems.includes(item)) {
        return {
          ...prev,
          [field]: currentItems.filter(i => i !== item)
        };
      }
      return {
        ...prev,
        [field]: [...currentItems, item]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['venueName', 'ownerName', 'phoneNumber', 'email', 'location', 'description', 'venueType', 'capacity'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof HangoutProfileData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.amenities.length === 0) {
      toast.error('Please select at least one amenity');
      return;
    }

    if (formData.features.length === 0) {
      toast.error('Please select at least one feature');
      return;
    }

    // Get the current user's ID
    const userData = localStorage.getItem('user');
    let userId = '';
    if (userData) {
      try {
        const user = JSON.parse(userData);
        userId = user.id;
      } catch (error) {
        console.error('Error parsing user data:', error);
        toast.error('Failed to get user information');
        return;
      }
    }

    // Store the complete profile data
    try {
      localStorage.setItem('profileData', JSON.stringify({
        ...formData,
        role: 'Hangout',
        userId: userId // Add the user's ID to the profile data
      }));
      toast.success('Hangout profile completed successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast.error('Failed to save profile data');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Hangout Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Venue Name</label>
            <input
              type="text"
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Full Address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Venue Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about your venue, its atmosphere, and what makes it special..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Venue Type</label>
            <select
              name="venueType"
              value={formData.venueType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a venue type</option>
              {venueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Capacity</label>
            <select
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select capacity range</option>
              {capacityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Operating Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Weekday Hours</label>
                <input
                  type="text"
                  name="operatingHours.weekday"
                  value={formData.operatingHours.weekday}
                  onChange={handleInputChange}
                  placeholder="e.g., 11 AM - 11 PM"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weekend Hours</label>
                <input
                  type="text"
                  name="operatingHours.weekend"
                  value={formData.operatingHours.weekend}
                  onChange={handleInputChange}
                  placeholder="e.g., 11 AM - 2 AM"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Charge ($)</label>
                <input
                  type="number"
                  name="pricing.coverCharge"
                  value={formData.pricing.coverCharge}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Spend ($)</label>
                <input
                  type="number"
                  name="pricing.minimumSpend"
                  value={formData.pricing.minimumSpend}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {amenitiesList.map(amenity => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => handleMultiSelect(amenity, 'amenities')}
                  className={`p-2 text-sm rounded-md border ${
                    formData.amenities.includes(amenity)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Features & Events</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {featuresList.map(feature => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleMultiSelect(feature, 'features')}
                  className={`p-2 text-sm rounded-md border ${
                    formData.features.includes(feature)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#3674B5] hover:bg-[#2A5C91] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Complete Profile
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 