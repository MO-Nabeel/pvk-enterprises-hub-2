import { cn } from "@/lib/utils";

export interface Leader {
  id: string;
  name: string;
  role: string;
  image: string;
}

interface LeadershipTeamProps {
  leaders?: Leader[];
  className?: string;
}

const defaultLeaders: Leader[] = [
  {
    id: "1",
    name: "SHIHAB MUSLIYARAKATH",
    role: "Executive Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "2",
    name: "ALEXANDER SCHMIDT",
    role: "Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "3",
    name: "MARIA KOWALSKI",
    role: "Head of Strategy",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "4",
    name: "JEAN-PIERRE DUBOIS",
    role: "Senior Advisor",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "5",
    name: "ELENA POPESCU",
    role: "Director of Operations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80",
  },
  {
    id: "6",
    name: "DAVID CHEN",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80",
  },
];

const LeadershipTeam = ({ leaders = defaultLeaders, className }: LeadershipTeamProps) => {
  return (
    <section className={cn("py-16 sm:py-20 md:py-24 bg-white dark:bg-slate-950", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="text-xl sm:text-2xl font-medium mb-2 text-sky-400 dark:text-sky-500"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Our Team
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Leadership
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Meet the experts guiding your European integration.
          </p>
        </div>

        {/* Leaders Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {leaders.map((leader) => (
            <div key={leader.id} className="leader-card text-center">
              {/* Image Wrapper with Diagonal Cut */}
              <div className="leader-image-wrapper mb-4 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full block transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Leader Info */}
              <div className="leader-info">
                <h3 className="text-lg sm:text-xl font-bold tracking-wider uppercase mb-1 text-slate-900 dark:text-slate-100">
                  {leader.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 italic">
                  {leader.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;

