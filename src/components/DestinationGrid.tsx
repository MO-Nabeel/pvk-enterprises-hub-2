import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  image: string;
  tours: number;
}

interface DestinationGridProps {
  destinations?: Destination[];
  className?: string;
}

const defaultDestinations: Destination[] = [
  {
    id: "1",
    name: "Azerbaijan",
    tagline: "LAND OF FIRE",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&q=80",
    tours: 8,
  },
  {
    id: "2",
    name: "Kazakhstan",
    tagline: "HEART OF EURASIA",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&q=80",
    tours: 7,
  },
  {
    id: "3",
    name: "Armenia",
    tagline: "ANCIENT HIGHLANDS",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&q=80",
    tours: 6,
  },
  {
    id: "4",
    name: "Netherlands",
    tagline: "CANALS & CULTURE",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=400&fit=crop&q=80",
    tours: 5,
  },
  {
    id: "5",
    name: "Georgia",
    tagline: "WINE & MOUNTAINS",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&h=400&fit=crop&q=80",
    tours: 4,
  },
  {
    id: "6",
    name: "Kyrgyzstan",
    tagline: "NOMADIC SPIRIT",
    image: "https://images.unsplash.com/photo-1505159940484-eb2b9f7c7f3e?w=600&h=400&fit=crop&q=80",
    tours: 3,
  },
  {
    id: "7",
    name: "Uzbekistan",
    tagline: "SILK ROAD JEWEL",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=400&fit=crop&q=80",
    tours: 2,
  },
  {
    id: "8",
    name: "France",
    tagline: "ART & ELEGANCE",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop&q=80",
    tours: 1,
  },
];

const DestinationGrid = ({ destinations = defaultDestinations, className }: DestinationGridProps) => {
  return (
    <section className={cn("py-12 sm:py-16 md:py-20 bg-[#fafafa] dark:bg-slate-950", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <p 
            className="text-lg sm:text-xl font-medium mb-2 text-emerald-600 dark:text-emerald-400" 
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Top Destination
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100">
            Top Destination
          </h2>
        </div>

        {/* Destination Grid - 2 rows x 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              to={`/destination/${destination.id}`}
              className="destination-grid-card group relative aspect-[4/3] rounded-[20px] transition-all duration-300"
            >
              {/* Inner container for overflow and rounded corners */}
              <div className="absolute inset-0 overflow-hidden rounded-[20px]">
                {/* Image */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: 'center' }}
                  loading="lazy"
                />
                {/* Gradient Overlay - Darker at bottom for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Tours Badge - Top Left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-yellow-400 text-slate-900 text-sm font-bold px-4 py-2 rounded-full inline-block">
                    {destination.tours} TOUR{destination.tours !== 1 ? "S" : ""}
                  </span>
                </div>

                {/* Content Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-10">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white leading-tight">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-white/90 font-medium uppercase tracking-wider">
                    {destination.tagline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid;

