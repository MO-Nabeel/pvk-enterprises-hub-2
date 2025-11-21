import * as React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Testimonial = {
  name: string;
  rating: number;
  text: string;
  date?: string;
  title?: string;
  company?: string;
  avatar?: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
};

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title = "Stories of Success",
  subtitle,
  showCTA = false,
  ctaText = "Get access",
  ctaLink = "/contact",
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

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

  const totalSlides = testimonials.length;
  const progressPercentage = totalSlides > 1 ? ((current - 1) / (totalSlides - 1)) * 100 : 100;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              duration: 25,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full">
                  {/* Testimonial Card */}
                  <div
                    className={cn(
                      "relative rounded-3xl p-8 md:p-12",
                      "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900",
                      "backdrop-blur-sm",
                      "border border-slate-700/50",
                      "shadow-2xl",
                      "transition-all duration-500 ease-in-out"
                    )}
                    style={{
                      background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(15, 23, 42, 0.95) 100%)",
                    }}
                  >
                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-6 w-6 md:h-7 md:w-7 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <blockquote className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 font-light">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>

                    {/* Author Section */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-700/50">
                      {testimonial.avatar ? (
                        <div className="flex-shrink-0">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-slate-600"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center border-2 border-slate-500">
                          <span className="text-white text-lg md:text-xl font-semibold">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-base md:text-lg">
                          {testimonial.name}
                        </p>
                        {(testimonial.title || testimonial.company) && (
                          <p className="text-slate-300 text-sm md:text-base">
                            {testimonial.title && `${testimonial.title}`}
                            {testimonial.title && testimonial.company && " | "}
                            {testimonial.company && `${testimonial.company}`}
                          </p>
                        )}
                        {testimonial.date && (
                          <p className="text-slate-400 text-xs md:text-sm mt-1">
                            {testimonial.date}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Optional CTA Button */}
                    {showCTA && (
                      <div className="mt-8 pt-6 border-t border-slate-700/30">
                        <Button
                          asChild
                          variant="outline"
                          className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-700 hover:text-white hover:border-slate-500"
                        >
                          <a href={ctaLink}>{ctaText}</a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Pill-shaped Navigation Control */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8">
              <div 
                className="relative bg-white rounded-full shadow-lg flex items-center gap-3 px-3"
                style={{ width: '194px', height: '50px' }}
              >
                {/* Left Arrow */}
                <button
                  onClick={scrollPrev}
                  className="flex-shrink-0 p-1 text-slate-700 hover:text-slate-900 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Progress Bar */}
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300 ease-out"
                    style={{ 
                      width: `${progressPercentage}%`,
                      background: 'linear-gradient(to right, rgb(255, 255, 255), rgb(17, 24, 39))'
                    }}
                  />
                </div>

                {/* Right Arrow */}
                <button
                  onClick={scrollNext}
                  className="flex-shrink-0 p-1 text-slate-700 hover:text-slate-900 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

