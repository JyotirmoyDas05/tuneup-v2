import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EventCardProps {
  title: string;
  imageUrl: string;
  link: string;
  aspectRatio?: 'landscape' | 'portrait';
}

export function EventCard({ title, imageUrl, link, aspectRatio = 'landscape' }: EventCardProps) {
  return (
    <Link 
      href={link}
      className="group relative overflow-hidden rounded-lg transition-transform hover:scale-[1.02]"
    >
      <div className={cn(
        "relative w-full",
        aspectRatio === 'landscape' ? "aspect-[16/9]" : "aspect-[3/4]"
      )}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>
    </Link>
  );
} 