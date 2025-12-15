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
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-100 dark:bg-pink-900/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-purple-500" />
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent via-purple-500 to-purple-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-slate-100">
              PVK Journey
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto">
              PVK Enterprises was founded in 2010 by Mr. Pramod, whose entrepreneurial journey began long before the company was established. Coming from a background filled with financial difficulties and personal challenges, he built his success step by step—through hard work, consistency, and strong determination.
            </p>
          </div>

          {/* Timeline Container */}
          <div ref={sectionRef} className="relative">
            {/* Central Vertical Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 md:w-1">
              <div className="h-full bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 dark:from-purple-500 dark:via-purple-600 dark:to-purple-700" />
            </div>

            {/* Milestones */}
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isVisible = visibleItems.has(index);
                const isLeft = milestone.position === "left";

                return (
                  <div
                    key={milestone.id}
                    data-index={index}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isLeft ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20 md:static md:transform-none md:z-auto">
                      <div
                        className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg transition-all duration-500 ${
                          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 200 + 100}ms` }}
                      />
                      <div
                        className={`absolute inset-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-purple-400/30 animate-ping transition-all duration-500 ${
                          isVisible ? "scale-150 opacity-75" : "scale-0 opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 200 + 200}ms` }}
                      />
                    </div>

                    {/* Date Badge */}
                    <div
                      className={`w-full md:w-1/2 mt-4 md:mt-0 ${isLeft ? "md:pr-8 md:pr-12" : "md:pl-8 md:pl-12"} flex justify-center ${isLeft ? "md:justify-end" : "md:justify-start"}`}
                    >
                      <div
                        className={`inline-flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white text-sm md:text-base font-semibold shadow-lg transition-all duration-700 ${
                          isVisible
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-8 scale-95"
                        }`}
                        style={{ transitionDelay: `${index * 200}ms` }}
                      >
                        {milestone.date}
                      </div>
                    </div>

                    {/* Content Card */}
                    <div
                      className={`w-full md:w-1/2 mt-4 md:mt-0 ${isLeft ? "md:pl-8 md:pl-12" : "md:pr-8 md:pr-12"} flex justify-center ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                    >
                      <div
                        className={`w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group ${
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${index * 200 + 150}ms` }}
                      >
                        {/* Decorative background icon */}
                        <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500">
                          <Icon className="w-full h-full text-purple-600 dark:text-purple-400" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-purple-600 dark:text-purple-400" />
                          </div>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                            {milestone.title}
                          </h3>

                          {/* Description */}
                          <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                            {milestone.description}
                          </p>
                        </div>

                        {/* Hover effect border */}
                        <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Final Node - Today */}
            <div className="relative flex flex-col md:flex-row items-center mt-12 sm:mt-16 md:mt-20">
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-20 md:static md:transform-none md:z-auto">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-xl ring-4 ring-purple-100 dark:ring-purple-900/50" />
              </div>

              {/* Date Badge */}
              <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pr-8 md:pr-12 flex justify-center md:justify-end">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white text-base md:text-lg font-semibold shadow-lg">
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
                  <span>Today</span>
                </div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-8 md:pl-12 flex justify-center md:justify-start">
                <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
                  {/* Decorative background icon */}
                  <div className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500">
                    <Target className="w-full h-full text-purple-600 dark:text-purple-400" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-6 h-6 md:w-7 md:h-7 text-purple-600 dark:text-purple-400" />
                    </div>

                    {/* Description */}
                    <p className="text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
                      Today, PVK Enterprises stands as a trusted leader in printing, trophies, and stationery solutions, proving that with dedication and belief, success can be built from any starting point.
                    </p>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PVKJourney;
