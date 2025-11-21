import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSliderProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  className?: string;
  variant?: "default" | "background";
}

const HeroSlider: React.FC<HeroSliderProps> = ({ images, className, variant = "default" }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const isBackground = variant === "background";
  const totalSlides = images.length;
  const progressPercentage = totalSlides > 1 ? ((current - 1) / (totalSlides - 1)) * 100 : 100;

  return (
    <div
      className={cn(
        "relative w-full",
        isBackground && "h-full",
        className
      )}
    >
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className={cn("w-full", isBackground && "h-full")}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent
          className={cn(
            "items-stretch",
            isBackground && "h-full !ml-0"
          )}
        >
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex",
                isBackground && "h-full !pl-0"
              )}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden group",
                  isBackground
                    ? "h-full"
                    : "rounded-2xl aspect-[4/3] sm:aspect-[5/3] lg:aspect-[16/9] max-h-[340px] md:max-h-[380px] lg:max-h-[420px]"
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "w-full h-full object-cover transition-all duration-500 ease-out",
                    isBackground
                      ? "scale-100"
                      : "rounded-2xl shadow-2xl group-hover:scale-[1.03] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                  )}
                  style={{
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Capsule-Shaped Navigation Container */}
      <div
        className={cn(
          "flex items-center justify-center z-20",
          isBackground
            ? "absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2"
            : "mt-6"
        )}
      >
        <div className="inline-flex items-center gap-0 bg-white/95 backdrop-blur-sm rounded-full px-1.5 sm:px-2 py-1.5 sm:py-2 shadow-lg border border-gray-200/50">
          {/* Previous Arrow */}
          <button
            onClick={scrollPrev}
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-gray-100 transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:shadow-none focus-visible:shadow-none active:scale-95"
            style={{ outline: 'none', boxShadow: 'none' }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
          </button>

          {/* Progress Bar Container */}
          <div className="mx-1.5 sm:mx-2 w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progressPercentage}%`,
                background: 'linear-gradient(to right, #FFFFFF, #111827)',
              }}
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={scrollNext}
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-gray-100 transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:shadow-none focus-visible:shadow-none active:scale-95"
            style={{ outline: 'none', boxShadow: 'none' }}
            aria-label="Next slide"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;

