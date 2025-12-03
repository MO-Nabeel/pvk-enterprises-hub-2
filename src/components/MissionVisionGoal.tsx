import { Search, Eye, Target } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface TimelineItem {
  number: string;
  title: string;
  description: string;
  color: string;
  icon: LucideIcon;
}

const timelineItems: TimelineItem[] = [
  {
    number: "01",
    title: "MISSION",
    description:
      "To deliver exceptional quality trophies and awards that celebrate achievements and create lasting memories. We are committed to providing innovative designs, superior craftsmanship, and outstanding customer service that exceeds expectations.",
    color: "blue",
    icon: Search,
  },
  {
    number: "02",
    title: "VISION",
    description:
      "To become the leading trophy and awards manufacturer in the region, recognized for our excellence in design, quality, and customer satisfaction. We envision a future where every achievement is honored with a masterpiece that reflects its true value.",
    color: "orange",
    icon: Eye,
  },
  {
    number: "03",
    title: "GOAL",
    description:
      "To continuously innovate and expand our product range while maintaining the highest standards of quality. We aim to build long-lasting relationships with our clients and contribute to celebrating success stories across various fields and industries.",
    color: "purple",
    icon: Target,
  },
];

const colorClasses = {
  blue: {
    topGradient: "from-blue-500 via-blue-600 to-blue-700",
    bottomGradient: "from-blue-700 via-blue-600 to-blue-500",
    text: "text-blue-600 dark:text-blue-200",
    textHoverColor: "#1d4ed8",
    shadowColor: "rgba(59, 130, 246, 0.4)",
    shadowColorHover: "rgba(59, 130, 246, 0.6)",
    borderColor: "border-blue-200",
  },
  orange: {
    topGradient: "from-orange-500 via-orange-600 to-orange-700",
    bottomGradient: "from-orange-700 via-orange-600 to-orange-500",
    text: "text-orange-600 dark:text-orange-300",
    textHoverColor: "#c2410c",
    shadowColor: "rgba(249, 115, 22, 0.4)",
    shadowColorHover: "rgba(249, 115, 22, 0.6)",
    borderColor: "border-orange-200",
  },
  purple: {
    topGradient: "from-purple-600 via-purple-700 to-purple-800",
    bottomGradient: "from-purple-800 via-purple-700 to-purple-600",
    text: "text-purple-600 dark:text-purple-200",
    textHoverColor: "#6b21a8",
    shadowColor: "rgba(147, 51, 234, 0.4)",
    shadowColorHover: "rgba(147, 51, 234, 0.6)",
    borderColor: "border-purple-200",
  },
};

const MissionVisionGoal = () => {
  return (
    <section className="mission-vision-goal-section py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Timeline Items */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-6 lg:gap-8 xl:gap-10 max-w-7xl mx-auto items-stretch">
          {timelineItems.map((item, index) => {
            const colors = colorClasses[item.color as keyof typeof colorClasses];
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-start transition-all duration-500 hover:scale-[1.02] h-full w-full"
              >
                {/* Top Semi-circle with enhanced 3D effect */}
                <div
                  className={`bg-gradient-to-b ${colors.topGradient} w-24 h-12 sm:w-28 sm:h-14 md:w-28 md:h-14 lg:w-32 lg:h-16 xl:w-36 xl:h-[4.5rem] flex items-center justify-center relative z-10 transition-all duration-500 group-hover:shadow-2xl dark:shadow-[0_10px_35px_rgba(15,23,42,0.8)] mx-auto`}
                  style={{
                    borderRadius: 'clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem) clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem) 0 0',
                    boxShadow: `
                      0 8px 32px ${colors.shadowColor},
                      0 4px 16px ${colors.shadowColor},
                      inset 0 2px 4px rgba(255, 255, 255, 0.4),
                      inset 0 -2px 4px rgba(0, 0, 0, 0.1)
                    `,
                  }}
                >
                  {/* Glossy highlight effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none"
                    style={{
                      borderRadius: 'clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem) clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem) 0 0',
                    }}
                  />
                  <span className="text-white font-bold text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-3xl drop-shadow-lg relative z-10 transition-transform duration-500 group-hover:scale-110">
                    {item.number}
                  </span>
                </div>

                {/* White Body with elegant styling */}
                <div 
                  className={`bg-white border-x-2 ${colors.borderColor} px-5 py-6 sm:px-6 sm:py-8 md:px-6 md:py-8 lg:px-8 lg:py-10 xl:px-10 xl:py-12 -mt-6 sm:-mt-7 md:-mt-7 lg:-mt-8 xl:-mt-9 relative z-0 w-full flex flex-col flex-grow shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:border-opacity-60 dark:bg-slate-900/75 dark:border-slate-800 dark:shadow-[0_15px_35px_rgba(2,6,23,0.55)]`}
                  style={{
                    borderRadius: 'clamp(0.75rem, 1vw + 0.5rem, 1.25rem)',
                    minHeight: 'clamp(280px, 35vw, 360px)',
                    boxShadow: `
                      0 4px 20px rgba(0, 0, 0, 0.08),
                      0 2px 8px rgba(0, 0, 0, 0.04),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9)
                    `,
                  }}
                >
                  {/* Subtle top highlight */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                    style={{
                      borderRadius: 'clamp(0.75rem, 1vw + 0.5rem, 1.25rem) clamp(0.75rem, 1vw + 0.5rem, 1.25rem) 0 0',
                    }}
                  />
                  
                  <h3
                    className={`${colors.text} font-bold text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl mb-3 sm:mb-4 md:mb-4 lg:mb-5 xl:mb-6 uppercase tracking-wider transition-colors duration-300 group-hover:opacity-90 mt-2`}
                    style={{
                      transition: 'color 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-base lg:text-base xl:text-lg text-gray-700 leading-relaxed flex-grow font-light dark:text-slate-300">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Semi-circle with enhanced 3D effect */}
                <div
                  className={`bg-gradient-to-t ${colors.bottomGradient} w-24 h-12 sm:w-28 sm:h-14 md:w-28 md:h-14 lg:w-32 lg:h-16 xl:w-36 xl:h-[4.5rem] flex items-center justify-center relative z-10 -mt-6 sm:-mt-7 md:-mt-7 lg:-mt-8 xl:-mt-9 transition-all duration-500 group-hover:shadow-2xl dark:shadow-[0_-10px_35px_rgba(15,23,42,0.8)] mx-auto`}
                  style={{
                    borderRadius: '0 0 clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem) clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem)',
                    boxShadow: `
                      0 -8px 32px ${colors.shadowColor},
                      0 -4px 16px ${colors.shadowColor},
                      inset 0 -2px 4px rgba(255, 255, 255, 0.4),
                      inset 0 2px 4px rgba(0, 0, 0, 0.1)
                    `,
                  }}
                >
                  {/* Glossy highlight effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent pointer-events-none"
                    style={{
                      borderRadius: '0 0 clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem) clamp(1.25rem, 1.5vw + 0.75rem, 2.5rem)',
                    }}
                  />
                  <Icon 
                    className="text-white w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 drop-shadow-lg relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" 
                    strokeWidth={2.5} 
                  />
                </div>

                {/* Decorative glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-xl md:rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-xl"
                  style={{
                    background: `radial-gradient(circle, ${colors.shadowColor} 0%, transparent 70%)`,
                    borderRadius: 'clamp(0.75rem, 1vw + 0.5rem, 1.25rem)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionGoal;

