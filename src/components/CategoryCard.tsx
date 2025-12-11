import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
  textColor?: string;
  categoryImageURL?: string;
}

const CategoryCard = ({
  title,
  subtitle,
  image,
  buttonText,
  buttonLink,
  bgColor,
  textColor = "text-foreground",
  categoryImageURL
}: CategoryCardProps) => {
  const cardStyle: CSSProperties = { minHeight: "250px" };

  if (categoryImageURL) {
    cardStyle.backgroundImage = `url(${categoryImageURL})`;
    cardStyle.backgroundSize = "cover";
    cardStyle.backgroundPosition = "center";
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 ${!categoryImageURL ? bgColor : ""} group hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl`}
      style={cardStyle}
    >
      {/* Content Area with bottom padding to prevent overlap with footer */}
      <div className="relative z-10 flex flex-col h-full pb-20 sm:pb-24">
        <div className="flex-1">
          <p className={`text-xs sm:text-sm font-medium ${textColor} opacity-90 mb-1`}>{subtitle}</p>
          <h3 className={`text-2xl sm:text-3xl font-bold ${textColor} mb-2 sm:mb-4 leading-tight`}>
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'block opacity-40' : 'block'}>
                {word}
              </span>
            ))}
          </h3>
        </div>
      </div>

      {/* Footer - Absolutely positioned at bottom with EXPLORE text and circular arrow button */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 pb-4 sm:pb-6">
        <Link 
          to={buttonLink} 
          className="flex items-center justify-between w-full group/footer"
        >
          {/* EXPLORE Text */}
          <span className={`text-xs sm:text-sm uppercase tracking-[0.15em] font-medium ${textColor} opacity-95`}>
            {buttonText}
          </span>

          {/* Circular Arrow Button */}
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover/footer:scale-110 ${
            textColor === "text-foreground" 
              ? "border-foreground/40 bg-background/60 backdrop-blur-sm group-hover/footer:border-foreground/60 group-hover/footer:bg-background/80" 
              : "border-white/40 bg-black/60 backdrop-blur-sm group-hover/footer:border-white/60 group-hover/footer:bg-black/80"
          }`}>
            <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${textColor} opacity-95`} />
          </div>
        </Link>
      </div>

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute right-0 bottom-0 h-32 sm:h-48 w-auto object-contain group-hover:scale-110 transition-transform duration-300 z-0"
      />
    </div>
  );
};

export default CategoryCard;
