'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface SingerProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  experience: string;
  vocalRange: string;
  genres: string[];
  preferredStyles: string[];
}

const experienceLevels = [
  'Beginner (0-2 years)',
  'Intermediate (3-5 years)',
  'Advanced (5-10 years)',
  'Professional (10+ years)',
];

const vocalRanges = [
  'Soprano',
  'Mezzo-soprano',
  'Alto',
  'Countertenor',
  'Tenor',
  'Baritone',
  'Bass',
];

const genres = [
  'Pop', 'Rock', 'Jazz', 'Classical', 'R&B',
  'Hip Hop', 'Country', 'Electronic', 'Folk', 'Blues',
];

const singingStyles = [
  'Opera',
  'Musical Theatre',
  'Jazz',
  'Pop',
  'Rock',
  'Gospel',
  'Classical',
  'Contemporary',
];

export default function SingerProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState<SingerProfileData>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    experience: '',
    vocalRange: '',
    genres: [],
    preferredStyles: [],
  });

  useEffect(() => {
    // Verify user selected Singer role
    const selectedRole = localStorage.getItem('selectedRole');
    const userData = localStorage.getItem('user');

    if (!selectedRole || selectedRole !== 'Singer' || !userData) {
      router.push('/profile-selection');
      return;
    }

    // Pre-fill user data
    try {
      const user = JSON.parse(userData);
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (item: string, field: 'genres' | 'preferredStyles') => {
    setFormData(prev => {
      const currentItems = prev[field];
      if (currentItems.includes(item)) {
        return {
          ...prev,
          [field]: currentItems.filter(i => i !== item)
        };
      }
      if (currentItems.length >= 3) {
        toast.error(`You can select up to 3 ${field}`);
        return prev;
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
    const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'experience', 'vocalRange'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof SingerProfileData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.genres.length === 0) {
      toast.error('Please select at least one genre');
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
        role: 'Singer',
        userId: userId // Add the user's ID to the profile data
      }));
      toast.success('Singer profile completed successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast.error('Failed to save profile data');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Singer Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
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
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select experience level</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Vocal Range</label>
            <select
              name="vocalRange"
              value={formData.vocalRange}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select your vocal range</option>
              {vocalRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Genres</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => handleMultiSelect(genre, 'genres')}
                  className={`p-2 text-sm rounded-md border ${
                    formData.genres.includes(genre)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Singing Styles</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {singingStyles.map(style => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleMultiSelect(style, 'preferredStyles')}
                  className={`p-2 text-sm rounded-md border ${
                    formData.preferredStyles.includes(style)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {style}
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