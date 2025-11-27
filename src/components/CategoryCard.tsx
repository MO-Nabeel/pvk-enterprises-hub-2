import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
  textColor?: string;
}

const CategoryCard = ({
  title,
  subtitle,
  image,
  buttonText,
  buttonLink,
  bgColor,
  textColor = "text-foreground"
}: CategoryCardProps) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 ${bgColor} group hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl`}
      style={{ minHeight: "250px" }}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <p className={`text-sm font-medium ${textColor} opacity-90 mb-1`}>{subtitle}</p>
          <h3 className={`text-3xl font-bold ${textColor} mb-4 leading-tight`}>
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? 'block opacity-40' : 'block'}>
                {word}
              </span>
            ))}
          </h3>
        </div>
        <Link to={buttonLink}>
          <Button variant="secondary" size="sm" className="bg-background hover:bg-background/90">
            {buttonText}
          </Button>
        </Link>
      </div>
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute right-0 bottom-0 h-48 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
};

export default CategoryCard;
