import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

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

  const isBackground = variant === "background";

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
        <CarouselPrevious className="left-2 md:left-4 z-10" />
        <CarouselNext className="right-2 md:right-4 z-10" />
      </Carousel>

      {/* Navigation Dots */}
      <div
        className={cn(
          "flex gap-2",
          isBackground
            ? "absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            : "justify-center mt-6"
        )}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all duration-300",
              current === index + 1
                ? "bg-primary w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

