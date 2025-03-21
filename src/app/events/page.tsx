'use client';

import { Container } from '@/components/ui/container';
import { EventCard } from '@/components/events/event-card';

const events = [
  {
    title: "Guns N' Roses",
    imageUrl: "/images/events/guns-n-roses.jpg",
    link: "/events/guns-n-roses"
  },
  {
    title: "Alan Walker World Tour India Pt. II",
    imageUrl: "/images/events/alan-walker.jpg",
    link: "/events/alan-walker"
  },
  {
    title: "Sajanka by Ananda Dee",
    imageUrl: "/images/events/sajanka.jpg",
    link: "/events/sajanka"
  },
  {
    title: "The Guwahati Gig 2025",
    imageUrl: "/images/events/guwahati-gig.jpg",
    link: "/events/guwahati-gig"
  },
  {
    title: "Rising Beats Live in Concert",
    imageUrl: "/images/events/rising-beats.jpg",
    link: "/events/rising-beats"
  },
  {
    title: "Nick Carter: Who I Am World Tour",
    imageUrl: "/images/events/nick-carter.jpg",
    link: "/events/nick-carter"
  }
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-blue-100 to-transparent">
        <Container>
          <div className="text-center">
            <h1 className="text-6xl font-bold text-[#4A90E2] mb-4">Events</h1>
            <h2 className="text-3xl font-medium text-foreground">Happening in your city</h2>
          </div>
        </Container>
      </section>

      {/* Events Grid Section */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.link}
                title={event.title}
                imageUrl={event.imageUrl}
                link={event.link}
              />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
} 