import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardGradientProps {
  badge?: string;
  title: string;
  description: string;
  exploreText?: string;
  link: string;
  className?: string;
}

const CategoryCardGradient = ({
  badge = "BRANDING",
  title,
  description,
  exploreText = "EXPLORE",
  link,
  className
}: CategoryCardGradientProps) => {
  return (
    <Link
      to={link}
      className={cn(
        "group relative overflow-hidden p-6 sm:p-8 md:p-10",
        "min-h-[280px] sm:min-h-[320px] md:min-h-[360px]",
        "flex flex-col justify-between",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        className
      )}
      style={{
        borderRadius: "3rem 1.5rem 3rem 1.5rem", // Top-left and bottom-right more rounded
      }}
    >
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(236, 72, 153, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(251, 191, 36, 0.8) 0%, transparent 50%),
            linear-gradient(to bottom, 
              rgba(30, 58, 138, 0.85) 0%,
              rgba(15, 23, 42, 0.95) 100%
            )
          `,
        }}
      />

      {/* Diagonal Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              35deg,
              transparent,
              transparent 8px,
              rgba(255, 255, 255, 0.03) 8px,
              rgba(255, 255, 255, 0.03) 10px
            ),
            repeating-linear-gradient(
              -35deg,
              transparent,
              transparent 12px,
              rgba(255, 255, 255, 0.02) 12px,
              rgba(255, 255, 255, 0.02) 14px
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* Top Section */}
        <div className="space-y-3 sm:space-y-4">
          {/* Badge */}
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-300 font-medium">
            {badge}
          </p>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-6 sm:mt-8">
          {/* Explore Text */}
          <span className="text-xs sm:text-sm uppercase tracking-[0.15em] text-white font-medium">
            {exploreText}
          </span>

          {/* Circular Arrow Button */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/40 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/60 group-hover:scale-110">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCardGradient;

