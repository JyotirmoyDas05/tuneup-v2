"use client";

import { useRouter } from "next/navigation";
import { FocusCards } from "@/components/ui/focus-cards";
import { Mic, Music2, Users, HomeIcon, Building2 } from "lucide-react";

export default function CollabPage() {
  const router = useRouter();

  const topRowItems = [
    {
      title: "Singers",
      description: "Connect with talented vocalists",
      icon: <Mic />,
      onClick: () => router.push("/collab/singers"),
    },
    {
      title: "Instrument\nplayer",
      description: "Find skilled musicians",
      icon: <Music2 />,
      onClick: () => router.push("/collab/instruments"),
    },
    {
      title: "Bands",
      description: "Collaborate with bands",
      icon: <Users />,
      onClick: () => router.push("/collab/bands"),
    },
  ];

  const bottomRowItems = [
    {
      title: "Studios",
      description: "Book professional studios",
      icon: <HomeIcon />,
      onClick: () => router.push("/collab/studios"),
    },
    {
      title: "Hotels,Bars,\nCafes",
      description: "Find venues for performances",
      icon: <Building2 />,
      onClick: () => router.push("/collab/venues"),
    },
  ];

  return (
    <main className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-[#3674B5]/5 via-[#578FCA]/5 to-[#A1E3F9]/5">
      {/* Background Effects */}
      <div className="absolute -left-20 top-1/4 w-[600px] h-[600px] rounded-full bg-[#D1F8EF] blur-[150px] opacity-10" />
      <div className="absolute right-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#A1E3F9] blur-[120px] opacity-10" />
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full bg-[#578FCA] blur-[140px] opacity-10" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-20 relative z-10">
        <h1 className="text-[80px] font-bold mb-4 text-gray-800">
          Collaboration
        </h1>
        <h2 className="text-3xl text-gray-600">
          Find Your Perfect Music Collaborator
        </h2>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Row */}
        <div className="mb-8">
          <FocusCards items={topRowItems} className="md:grid-cols-3" />
        </div>

        {/* Bottom Row */}
        <div className="md:px-20">
          <FocusCards items={bottomRowItems} className="md:grid-cols-2" />
        </div>
      </div>
    </main>
  );
} 