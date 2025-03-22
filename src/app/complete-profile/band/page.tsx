'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface BandProfileData {
  bandName: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  location: string;
  description: string;
  genres: string[];
  lookingFor: string[];
  experience: string;
  memberCount: string;
  socialLinks: {
    website: string;
    instagram: string;
    youtube: string;
    spotify: string;
  };
}

const genresList = [
  'Rock',
  'Pop',
  'Jazz',
  'Blues',
  'Classical',
  'Electronic',
  'Hip Hop',
  'R&B',
  'Country',
  'Folk',
  'Metal',
  'Indie',
  'Alternative',
  'World Music',
  'Reggae',
  'Funk',
];

const positionsList = [
  'Lead Vocalist',
  'Backup Vocalist',
  'Guitarist',
  'Bassist',
  'Drummer',
  'Keyboardist',
  'Pianist',
  'Violinist',
  'Saxophonist',
  'Trumpeter',
  'DJ',
  'Producer',
];

const experienceLevels = [
  'Less than 1 year',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  'More than 10 years',
];

const memberCountOptions = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8+',
];

export default function BandProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState<BandProfileData>({
    bandName: '',
    ownerName: '',
    phoneNumber: '',
    email: '',
    location: '',
    description: '',
    genres: [],
    lookingFor: [],
    experience: '',
    memberCount: '',
    socialLinks: {
      website: '',
      instagram: '',
      youtube: '',
      spotify: '',
    },
  });

  useEffect(() => {
    // Verify user selected Band role
    const selectedRole = localStorage.getItem('selectedRole');
    const userData = localStorage.getItem('user');

    if (!selectedRole || selectedRole !== 'Band' || !userData) {
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
      setFormData(prev => {
        const parentObject = prev[parent as keyof BandProfileData] || {};
        return {
          ...prev,
          [parent]: {
            ...(typeof parentObject === 'object' ? parentObject : {}),
            [child]: value,
          },
        };
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (item: string, field: 'genres' | 'lookingFor') => {
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
    const requiredFields = ['bandName', 'ownerName', 'phoneNumber', 'email', 'location', 'description', 'experience', 'memberCount'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof BandProfileData]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.genres.length === 0) {
      toast.error('Please select at least one genre');
      return;
    }

    if (formData.lookingFor.length === 0) {
      toast.error('Please select at least one position you are looking for');
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
        role: 'Band',
        userId: userId // Add the user's ID to the profile data
      }));
      toast.success('Band profile completed successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast.error('Failed to save profile data');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Band Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Band Name</label>
            <input
              type="text"
              name="bandName"
              value={formData.bandName}
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
              placeholder="City, State"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Band Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about your band, your music style, and what makes you unique..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
            <label className="block text-sm font-medium text-gray-700">Current Member Count</label>
            <select
              name="memberCount"
              value={formData.memberCount}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select member count</option>
              {memberCountOptions.map(count => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genres</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {genresList.map(genre => (
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Looking For</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {positionsList.map(position => (
                <button
                  key={position}
                  type="button"
                  onClick={() => handleMultiSelect(position, 'lookingFor')}
                  className={`p-2 text-sm rounded-md border ${
                    formData.lookingFor.includes(position)
                      ? 'bg-blue-500 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {position}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Website</label>
                <input
                  type="url"
                  name="socialLinks.website"
                  value={formData.socialLinks.website}
                  onChange={handleInputChange}
                  placeholder="https://your-website.com"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instagram</label>
                <input
                  type="url"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleInputChange}
                  placeholder="https://instagram.com/your-band"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">YouTube</label>
                <input
                  type="url"
                  name="socialLinks.youtube"
                  value={formData.socialLinks.youtube}
                  onChange={handleInputChange}
                  placeholder="https://youtube.com/@your-band"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Spotify</label>
                <input
                  type="url"
                  name="socialLinks.spotify"
                  value={formData.socialLinks.spotify}
                  onChange={handleInputChange}
                  placeholder="https://open.spotify.com/artist/your-band"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
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