import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

interface CategoryCardModernProps {
  badge: string;
  title: string;
  description: string;
  link: string;
  image?: string;
  gradient?: string;
  className?: string;
}

const CategoryCardModern = ({
  badge,
  title,
  description,
  link,
  image,
  gradient,
  className
}: CategoryCardModernProps) => {
  const cardStyle: CSSProperties = {
    background: gradient || "linear-gradient(135deg, #0E1325 0%, #1B2236 100%)",
  };

  if (image) {
    cardStyle.backgroundImage = `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%), url(${image})`;
    cardStyle.backgroundSize = "cover";
    cardStyle.backgroundPosition = "center";
    cardStyle.backgroundRepeat = "no-repeat";
  }

  return (
    <Link
      to={link}
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl",
        "min-h-[280px] sm:min-h-[320px] md:min-h-[340px] lg:min-h-[360px]",
        "flex flex-col justify-between p-6 sm:p-7 md:p-8",
        "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70",
        className
      )}
      style={cardStyle}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-between text-white">
        {/* Top Section */}
        <div className="space-y-3 sm:space-y-4">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-white/60 rounded-full" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-white/90">
              {badge}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
            {description}
          </p>
        </div>

        {/* Bottom Section - EXPLORE */}
        <div className="mt-6 sm:mt-8 flex items-center justify-between">
          <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-white underline decoration-white/60 underline-offset-4 group-hover:decoration-white transition-all">
            EXPLORE
          </span>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/60 group-hover:scale-110">
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Product Image Overlay (if provided) */}
      {image && (
        <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </Link>
  );
};

export default CategoryCardModern;

