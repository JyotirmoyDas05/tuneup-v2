"use client";

import Image from "next/image";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="min-h-screen pt-16 px-4 md:px-8 lg:px-16 bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card - Live Performances */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div className="relative h-[400px]">
              <Image
                src="/images/community/performers.jpg"
                alt="Live Performance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-transparent">
                <div className="relative z-10 p-6">
                  <div className="flex gap-3 items-start">
                    <div>
                      <h2 className="text-[28px] leading-tight font-bold text-black">
                        Calling All<br />Talented<br />Performers!
                      </h2>
                    </div>
                    <div className="w-0.5 h-20 bg-black mt-1" />
                    <div>
                      <p className="text-[18px] leading-tight text-black">
                        Join Us For Live<br />Gigs At Our Cozy<br />Café.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/join-performers"
                    className="inline-block mt-4 bg-[#1E2832] text-white px-6 py-2 rounded text-sm font-medium hover:bg-black transition-colors"
                  >
                    JOIN NOW
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Music Studio */}
          <div className="relative overflow-hidden rounded-xl shadow-lg">
            <div className="relative h-[400px]">
              <Image
                src="/images/community/studio.jpg"
                alt="Music Studio"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-transparent">
                <div className="relative z-10 p-6">
                  <div className="flex gap-3 items-start">
                    <div>
                      <h2 className="text-[28px] leading-tight font-bold text-black">
                        Unleash Your<br />Inner Musician<br />Today!
                      </h2>
                    </div>
                    <div className="w-0.5 h-20 bg-black mt-1" />
                    <div>
                      <p className="text-[18px] leading-tight text-black">
                        Join Us At Harmony<br />Music Studio For<br />Special Offers!
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/discover-more"
                    className="inline-block mt-4 bg-[#1E2832] text-white px-6 py-2 rounded text-sm font-medium hover:bg-black transition-colors"
                  >
                    DISCOVER MORE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recording Session Section */}
      <section className="max-w-7xl mx-auto py-8">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <div className="relative h-[400px]">
            <Image
              src="/images/community/recording-studio.jpg"
              alt="Recording Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-[32px] font-bold text-white">
                  Special Offer: 20% Off
                </h2>
                <p className="text-2xl text-white mt-2 underline underline-offset-4 font-light">
                  Your First Recording Session!
                </p>
                <div className="mt-8">
                  <h3 className="text-[#FFD700] text-xl font-medium">
                    Join Our
                  </h3>
                  <p className="text-white text-2xl italic mt-1">
                    Music Community Today!
                  </p>
                  <Link
                    href="/discover-more"
                    className="inline-block mt-6 bg-white text-black px-6 py-1.5 rounded text-sm hover:bg-gray-100 transition-colors"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Harmony Studio Section */}
      <section className="max-w-7xl mx-auto py-8">
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          <div className="relative h-[400px]">
            <Image
              src="/images/community/harmony-studio.jpg"
              alt="Harmony Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent w-2/3" />
            <div className="absolute top-6 left-6 z-10">
              <div className="bg-[#B8860B] text-white p-4 rounded-lg max-w-[280px]">
                <h2 className="text-xl font-medium leading-tight">
                  Unleash Your Musical <span className="font-bold">Talent</span>
                </h2>
                <h3 className="text-xl font-bold mt-0.5">Today!</h3>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-medium text-[#B8860B] leading-tight">
                  Join Us At Harmony<br />Music Studio For
                </h3>
                <p className="text-xl mt-1 leading-tight">
                  <span className="font-bold text-black">Professional</span> Lessons
                </p>
                <p className="text-lg text-black mt-1 leading-tight">
                  And Recording Sessions.<br />Call Us Now!
                </p>
                <Link
                  href="/discover-more"
                  className="inline-block mt-4 bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  Discover More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Orange Card Section */}
      <section className="max-w-7xl mx-auto py-8 mb-12">
        <div className="bg-[#FF4500] rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-[300px] md:h-[400px]">
              <Image
                src="/images/community/performers-cafe.jpg"
                alt="Performers at Cafe"
                fill
                className="object-cover rounded-t-xl md:rounded-l-xl"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="text-[28px] leading-tight font-bold text-white">
                Calling All Talented<br />Performers!
              </h2>
              <p className="text-lg text-white mt-4 leading-tight">
                Join Us For Live Gigs At Our Cozy<br />Café. Contact Now!
              </p>
              <Link
                href="/join-now"
                className="inline-block mt-6 bg-[#1E2832] text-white px-6 py-2 rounded text-sm font-medium hover:bg-black transition-colors"
              >
                JOIN NOW
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 