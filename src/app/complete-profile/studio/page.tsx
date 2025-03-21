'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface StudioProfileData {
  studioName: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  location: string;
  description: string;
  equipment: string[];
  services: string[];
  rates: {
    hourly: string;
    daily: string;
    monthly: string;
  };
  amenities: string[];
}

const equipmentList = [
  'Pro Tools',
  'Logic Pro',
  'Ableton Live',
  'Studio Monitors',
  'Mixing Console',
  'Microphones',
  'Audio Interface',
  'MIDI Controllers',
  'Preamps',
  'Compressors',
  'Effects Processors',
  'Acoustic Treatment',
];

const servicesList = [
  'Recording',
  'Mixing',
  'Mastering',
  'Production',
  'Voice Over',
  'Podcast Recording',
  'Live Recording',
  'Music Video',
  'Album Production',
  'Rehearsal Space',
];

const amenitiesList = [
  'Parking',
  'Waiting Room',
  'Kitchen',
  'Bathroom',
  'WiFi',
  'Air Conditioning',
  'Storage Space',
  'Green Room',
  'Lounge Area',
  'Security System',
];

export default function StudioProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState<StudioProfileData>({
    studioName: '',
    ownerName: '',
    phoneNumber: '',
    email: '',
    location: '',
    description: '',
    equipment: [],
    services: [],
    rates: {
      hourly: '',
      daily: '',
      monthly: '',
    },
    amenities: [],
  });

  useEffect(() => {
    // Verify user selected Studio role
    const selectedRole = localStorage.getItem('selectedRole');
    const userData = localStorage.getItem('user');

    if (!selectedRole || selectedRole !== 'Studio' || !userData) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof StudioProfileData],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (item: string, field: 'equipment' | 'services' | 'amenities') => {
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
    const requiredFields = ['studioName', 'ownerName', 'phoneNumber', 'email', 'location', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof StudioProfileData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.equipment.length === 0) {
      toast.error('Please select at least one equipment');
      return;
    }

    if (formData.services.length === 0) {
      toast.error('Please select at least one service');
      return;
    }

    // Validate rates
    if (!formData.rates.hourly && !formData.rates.daily && !formData.rates.monthly) {
      toast.error('Please provide at least one rate option');
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
        role: 'Studio',
        userId: userId // Add the user's ID to the profile data
      }));
      toast.success('Studio profile completed successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast.error('Failed to save profile data');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Studio Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Studio Name</label>
            <input
              type="text"
              name="studioName"
              value={formData.studioName}
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
            <label className="block text-sm font-medium text-gray-700">Studio Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about your studio, its history, specialties, and what makes it unique..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Rates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                <input
                  type="number"
                  name="rates.hourly"
                  value={formData.rates.hourly}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Daily Rate ($)</label>
                <input
                  type="number"
                  name="rates.daily"
                  value={formData.rates.daily}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Rate ($)</label>
                <input
                  type="number"
                  name="rates.monthly"
                  value={formData.rates.monthly}
                  onChange={handleInputChange}
                  min="0"
                  placeholder="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equipment Available</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {equipmentList.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleMultiSelect(item, 'equipment')}
                  className={`p-2 text-sm rounded-md border ${
                    formData.equipment.includes(item)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {servicesList.map(service => (
                <button
                  key={service}
                  type="button"
                  onClick={() => handleMultiSelect(service, 'services')}
                  className={`p-2 text-sm rounded-md border ${
                    formData.services.includes(service)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {service}
                </button>
              ))}
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