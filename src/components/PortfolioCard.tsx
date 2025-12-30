import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
    index: number;
    image: string;
    category: string;
    title: string;
    href: string;
    className?: string;
}

export function PortfolioCard({
    index,
    image,
    category,
    title,
    href,
    className,
}: PortfolioCardProps) {
    return (
        <Link
            to={href}
            className={cn(
                "group relative isolate flex flex-col justify-end overflow-hidden rounded-[2rem] bg-gray-900 border border-white/10 dark:border-white/5 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]",
                className
            )}
        >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 z-0 h-full w-full">
                <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                {/* Advanced Gradient Overlay for legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:from-black/90 transition-colors duration-500" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full min-h-[220px] sm:min-h-[250px] flex-col p-5 sm:p-6">
                {/* Top Header: Badge and Number */}
                <div className="flex items-start justify-between w-full">
                    {/* Glass Badge */}
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105 group-hover:bg-white/15">
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
                            {category}
                        </span>
                    </div>

                    {/* Number Circle - Glassmorphism */}
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-500 group-hover:rotate-12 group-hover:bg-white/20 group-hover:border-white/40">
                        <span className="font-mono text-[10px] sm:text-xs font-bold text-white/90">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Bottom Content including Title and Action */}
                <div className="mt-auto pt-8 sm:pt-12 transform transition-all duration-500 group-hover:translate-x-1">
                    <h3 className="mb-3 text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight drop-shadow-xl">
                        {title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm font-medium text-white/80 transition-colors group-hover:text-white group-hover:tracking-wide">
                        <span className="uppercase tracking-widest text-xs font-bold border-b border-white/30 pb-0.5 group-hover:border-white">
                            Explore Product
                        </span>
                        <div className="bg-white/10 p-1.5 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PortfolioCard;
