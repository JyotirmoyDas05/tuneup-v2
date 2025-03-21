"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FocusCards } from "@/components/ui/focus-cards";
import { Mic, Music, Users, HomeIcon, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProfileSelection() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedOwnership, setSelectedOwnership] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
    }
  }, [router]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    toast.success(`Selected role: ${role}`);
  };

  const handleOwnershipSelect = (type: string) => {
    setSelectedOwnership(type);
    toast.success(`Selected: ${type}`);
  };

  const handleHangoutSelect = () => {
    setSelectedOwnership('Hangout');
    toast.success("Selected: Hangout Spots");
  };

  const handleContinue = () => {
    if (!selectedRole && !selectedOwnership) {
      toast.error("Please select at least one option");
      return;
    }

    const roleToUse = selectedRole || selectedOwnership;
    if (roleToUse) {
      localStorage.setItem('selectedRole', roleToUse);
      
      switch (roleToUse) {
        case 'Singer':
          router.push('/complete-profile/singer');
          break;
        case 'Musician':
          router.push('/complete-profile/musician');
          break;
        case 'Band':
          router.push('/complete-profile/band');
          break;
        case 'Studio':
          router.push('/complete-profile/studio');
          break;
        case 'Hangout':
          router.push('/complete-profile/hangout');
          break;
        default:
          toast.error("Invalid selection");
          break;
      }
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center justify-start py-12 px-4 bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5">
      {/* Background Effects */}
      <div className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[150px] opacity-10" />
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[120px] opacity-10" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#578FCA] blur-[140px] opacity-10" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl space-y-16">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight">
            Create your profile
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your role and preferences to get started
          </p>
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            You are a?
          </h2>
          <FocusCards
            items={[
              {
                title: "Singer",
                description: "I am a vocalist looking to collaborate with other musicians and create amazing music together.",
                icon: <Mic className="w-8 h-8" />,
                onClick: () => handleRoleSelect("Singer"),
              },
              {
                title: "Musician",
                description: "I play musical instruments and want to connect with other artists to create beautiful compositions.",
                icon: <Music className="w-8 h-8" />,
                onClick: () => handleRoleSelect("Musician"),
              },
            ]}
          />
        </motion.div>

        {/* Ownership Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            You own a?
          </h2>
          <FocusCards
            items={[
              {
                title: "Band",
                description: "I manage or own a music band and I'm looking for talented musicians to join or collaborate.",
                icon: <Users className="w-8 h-8" />,
                onClick: () => handleOwnershipSelect("Band"),
              },
              {
                title: "Studio",
                description: "I own or manage a recording studio and want to connect with artists looking for recording space.",
                icon: <HomeIcon className="w-8 h-8" />,
                onClick: () => handleOwnershipSelect("Studio"),
              },
            ]}
          />
        </motion.div>

        {/* Hangout Spots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-8"
        >
          <FocusCards
            items={[
              {
                title: "Hangout Spots",
                description: "Discover local music venues, practice spaces, and meetup locations for musicians and artists.",
                icon: <MapPin className="w-8 h-8" />,
                onClick: handleHangoutSelect,
              },
            ]}
          />
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-6 pt-8"
        >
          <button
            onClick={() => router.back()}
            className="px-8 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="px-8 py-3 bg-[#3674B5] hover:bg-[#2A5C91] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue
          </button>
        </motion.div>
      </div>
    </main>
  );
} 