'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';
import { toast } from 'react-hot-toast';

interface ProfileData {
  role: string;
  [key: string]: any;
}

interface DashboardData {
  stats: {
    totalSongs: number;
    totalCollaborations: number;
    totalRevenue: number;
    activeProjects: number;
  };
  recentActivity: Array<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
  }>;
}

export default function Dashboard() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>({
    stats: {
      totalSongs: 0,
      totalCollaborations: 0,
      totalRevenue: 0,
      activeProjects: 0
    },
    recentActivity: []
  });

  useEffect(() => {
    // Check for auth
    try {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
        return;
      }

      // Check for profile data
      const profileData = localStorage.getItem('profileData');
      if (!profileData) {
        router.push('/profile-selection');
        return;
      }

      // Safely parse JSON data with type assertions
      setProfileData(JSON.parse(profileData) as ProfileData);
      
      // Mock data for the dashboard
      // In a real app, this would come from an API call
      setTimeout(() => {
        setData({
          stats: {
            totalSongs: 12,
            totalCollaborations: 5,
            totalRevenue: 15000,
            activeProjects: 3
          },
          recentActivity: [
            { id: '1', type: 'collaboration', title: 'New collaboration request from John Doe', timestamp: '2 hours ago' },
            { id: '2', type: 'booking', title: 'Booking confirmed at Blue Moon Cafe', timestamp: '1 day ago' },
            { id: '3', type: 'message', title: 'New message from Studio XYZ', timestamp: '3 days ago' }
          ]
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error parsing data from localStorage:", error);
      // Handle the error appropriately - either redirect or show an error message
      toast.error("There was a problem loading your data");
      router.push('/login');
    }
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  if (!profileData) {
    return null;
  }

  const renderProfileInfo = () => {
    switch (profileData.role) {
      case 'Singer':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Vocal Range</h3>
            <p className="text-gray-600">{profileData.vocalRange}</p>
            
            <h3 className="text-xl font-semibold">Preferred Genres</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.genres.map((genre: string) => (
                <span key={genre} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Preferred Styles</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.preferredStyles.map((style: string) => (
                <span key={style} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {style}
                </span>
              ))}
            </div>
          </div>
        );

      case 'Musician':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Instruments</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.instruments.map((instrument: string) => (
                <span key={instrument} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {instrument}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Preferred Genres</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.genres.map((genre: string) => (
                <span key={genre} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Equipment</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.equipmentOwned.map((equipment: string) => (
                <span key={equipment} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {equipment}
                </span>
              ))}
            </div>
          </div>
        );

      case 'Band':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Band Name</h3>
            <p className="text-gray-600">{profileData.bandName}</p>

            <h3 className="text-xl font-semibold">Genres</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.genres.map((genre: string) => (
                <span key={genre} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Looking For</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.lookingFor.map((position: string) => (
                <span key={position} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {position}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Member Count</h3>
            <p className="text-gray-600">{profileData.memberCount}</p>
          </div>
        );

      case 'Studio':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Studio Name</h3>
            <p className="text-gray-600">{profileData.studioName}</p>

            <h3 className="text-xl font-semibold">Equipment</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.equipment.map((item: string) => (
                <span key={item} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Services</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.services.map((service: string) => (
                <span key={service} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {service}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Rates</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Hourly</p>
                <p className="text-lg font-semibold">₹{profileData.rates.hourly}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Daily</p>
                <p className="text-lg font-semibold">₹{profileData.rates.daily}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Monthly</p>
                <p className="text-lg font-semibold">₹{profileData.rates.monthly}</p>
              </div>
            </div>
          </div>
        );

      case 'Hangout':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Venue Name</h3>
            <p className="text-gray-600">{profileData.venueName}</p>

            <h3 className="text-xl font-semibold">Venue Type</h3>
            <p className="text-gray-600">{profileData.venueType}</p>

            <h3 className="text-xl font-semibold">Capacity</h3>
            <p className="text-gray-600">{profileData.capacity}</p>

            <h3 className="text-xl font-semibold">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.amenities.map((amenity: string) => (
                <span key={amenity} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Features</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.features.map((feature: string) => (
                <span key={feature} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {feature}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-semibold">Operating Hours</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Weekday</p>
                <p className="text-lg font-semibold">{profileData.operatingHours.weekday}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Weekend</p>
                <p className="text-lg font-semibold">{profileData.operatingHours.weekend}</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-blue-100 to-transparent">
        <Container>
          <div className="text-center">
            <h1 className="text-6xl font-bold text-[#4A90E2] mb-4">Dashboard</h1>
            <h2 className="text-3xl font-medium text-foreground">Welcome to your profile</h2>
          </div>
        </Container>
      </section>

      {/* Profile Section */}
      <section className="py-12">
        <Container>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Profile Information</h2>
              <p className="text-gray-600">Your {profileData.role} profile details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Basic Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {profileData.firstName} {profileData.lastName}</p>
                  <p><span className="font-medium">Email:</span> {profileData.email}</p>
                  <p><span className="font-medium">Phone:</span> {profileData.phoneNumber}</p>
                  {profileData.location && (
                    <p><span className="font-medium">Location:</span> {profileData.location}</p>
                  )}
                  {profileData.experience && (
                    <p><span className="font-medium">Experience:</span> {profileData.experience}</p>
                  )}
                </div>
              </div>

              {/* Role-specific Information */}
              <div>
                {renderProfileInfo()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => router.push('/events')}
                className="px-6 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#357ABD] transition-colors"
              >
                View Events
              </button>
              <button
                onClick={() => router.push('/profile-selection')}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
} 