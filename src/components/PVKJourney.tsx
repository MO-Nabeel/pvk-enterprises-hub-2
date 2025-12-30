import { useEffect, useRef, useState } from "react";
import { TrendingUp, Rocket, Target, Sparkles, Building2 } from "lucide-react";

interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  position: "left" | "right";
  icon: React.ComponentType<{ className?: string }>;
}

const milestones: Milestone[] = [
  {
    id: 1,
    date: "Early Days",
    title: "Early Challenges & Learning",
    description:
      "Before starting PVK, Pramod faced many struggles in life, including financial limitations and uncertainty. However, these challenges shaped his mindset and inspired him to create something of his own.",
    position: "right",
    icon: Sparkles,
  },
  {
    id: 2,
    date: "First Steps",
    title: "First Business Steps",
    description:
      "His professional journey began with a small calling booth, followed by a mobile shop. These early ventures helped him understand customer needs, business operations, and the importance of service and trust.",
    position: "left",
    icon: Building2,
  },
  {
    id: 3,
    date: "2010",
    title: "Establishing PVK Enterprises (2010)",
    description:
      "In 2010, he launched PVK Enterprises, focusing on Printing, Trophy Solutions, Stationery, and Wholesale & Retail Services. PVK gradually earned recognition for quality, pricing, and reliable service.",
    position: "right",
    icon: TrendingUp,
  },
  {
    id: 4,
    date: "2020",
    title: "Growth During the Pandemic",
    description:
      "During the Covid period, when many businesses were affected, PVK strategically shifted focus to wholesale, which became a turning point. This decision helped PVK expand its market and build strong business relationships during a challenging time.",
    position: "left",
    icon: Rocket,
  },
];

const PVKJourney = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setTimeout(() => {
              setVisibleItems((prev) => new Set([...prev, index]));
            }, index * 200); // Staggered animation
          }
        });
      },
      { threshold: 0.2 }
    );

    const milestoneElements = sectionRef.current?.querySelectorAll("[data-index]");
    milestoneElements?.forEach((el) => observer.observe(el));

    return () => {
      milestoneElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-white to-purple-50/50 dark:from-slate-900 dark:to-slate-900/50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-pink-200/20 dark:bg-pink-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
              PVK Journey
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-6 mb-6" />
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              PVK Enterprises was founded in 2010 by Mr. Pramod, whose entrepreneurial journey began slightly before the company was established. Coming from a background filled with financial difficulties, he built his success step by step through hard work and determination.
            </p>
          </div>

          {/* Timeline Container */}
          <div ref={sectionRef} className="relative">
            {/* Central Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-purple-200 via-purple-400 to-pink-200 dark:from-purple-800 dark:via-purple-600 dark:to-pink-800 rounded-full" />

            {/* Milestones */}
            <div className="space-y-16 sm:space-y-24">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isVisible = visibleItems.has(index);
                const isRight = milestone.position === "right"; // Card is on the right, Date on left

                // Card Component Inline
                const Card = ({ align }: { align: "left" | "right" }) => (
                  <div
                    className={`group relative w-full bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.2)] border border-slate-100 dark:border-slate-700/50 transition-all duration-500`}
                  >
                    {/* Gradient Border Top */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Large Watermark Icon */}
                    <div className="absolute -bottom-4 -right-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none">
                      <Icon className="w-32 h-32 text-purple-50/80 dark:text-purple-900/10" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <div
                    key={milestone.id}
                    data-index={index}
                    className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-0"
                  >
                    {/* Left Column */}
                    <div className={`order-2 md:order-1 flex w-full ${isRight ? "justify-end md:pr-12" : "justify-start md:pl-12"}`}>
                      {isRight ? (
                        /* Date Pill - Right Aligned (visually left of center) */
                        <div
                          className={`group flex items-center gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                            }`}
                          style={{ transitionDelay: `${index * 200 + 100}ms` }}
                        >
                          <div className="hidden md:block h-px w-12 bg-purple-200 dark:bg-purple-800" />
                          <div className="inline-flex flex-col items-end">
                            <span className="text-3xl font-bold text-slate-200 dark:text-slate-700 leading-none">
                              {milestone.date.split(" ")[0]}
                            </span>
                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full mt-1 border border-purple-100 dark:border-purple-800">
                              {milestone.date}
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* Content Card - Left Aligned (visually left of center) */
                        <div
                          className={`w-full transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                            }`}
                          style={{ transitionDelay: `${index * 200 + 200}ms` }}
                        >
                          <Card align="right" />
                        </div>
                      )}
                    </div>

                    {/* Center Column (Timeline Node) */}
                    <div className="order-1 md:order-2 flex justify-center relative">
                      <div className="relative flex items-center justify-center h-16 w-16">
                        {/* Circle */}
                        <div
                          className={`relative z-20 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-[3px] border-purple-500 shadow-[0_0_0_4px_rgba(246,243,249,1)] dark:shadow-[0_0_0_4px_rgba(15,23,42,1)] transition-all duration-500 ${isVisible ? "scale-100" : "scale-0"
                            }`}
                        />
                        {/* Pulse behind */}
                        <div className={`absolute z-10 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 transition-all duration-700 ${isVisible ? "animate-ping opacity-20" : "opacity-0"}`} />
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className={`order-3 flex w-full ${isRight ? "justify-start md:pl-12" : "justify-end md:pr-12"}`}>
                      {isRight ? (
                        /* Content Card - Right Aligned (visually right of center) */
                        <div
                          className={`w-full transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                            }`}
                          style={{ transitionDelay: `${index * 200 + 200}ms` }}
                        >
                          <Card align="left" />
                        </div>
                      ) : (
                        /* Date Pill - Left Aligned (visually right of center) */
                        <div
                          className={`group flex items-center gap-4 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                            }`}
                          style={{ transitionDelay: `${index * 200 + 100}ms` }}
                        >
                          <div className="inline-flex flex-col items-start">
                            <span className="text-3xl font-bold text-slate-200 dark:text-slate-700 leading-none">
                              {milestone.date.split(" ")[0]}
                            </span>
                            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-50 dark:bg-purple-900/20 px-3 py-1 rounded-full mt-1 border border-purple-100 dark:border-purple-800">
                              {milestone.date}
                            </span>
                          </div>
                          <div className="hidden md:block h-px w-12 bg-purple-200 dark:bg-purple-800" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Final Node - Today */}
            <div className="relative flex flex-col items-center mt-20 sm:mt-24">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-pink-200 to-transparent dark:from-pink-800 -mt-12" />

              <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 mb-6 animate-pulse">
                  <Target className="w-7 h-7 text-white" />
                </div>

                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs font-bold uppercase tracking-wider mb-4 border border-pink-200 dark:border-pink-800/50">
                  Present Day
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Continuing the Legacy
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  Today, PVK Enterprises stands as a trusted leader in printing, trophies, and stationery solutions, proving that with dedication and belief, success can be built from any starting point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PVKJourney;
