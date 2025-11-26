import * as React from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
    <section className="relative isolate py-24 overflow-hidden bg-transparent text-foreground dark:bg-transparent">
      <div className="container relative mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-1 text-xs font-semibold tracking-[0.35em] uppercase text-muted-foreground/80 shadow-sm bg-background/70 backdrop-blur">
            <span className="block h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500" />
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          )}
          {!subtitle && (
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Trusted by our clients — here is what they say about PVK Enterprises and our services.
            </p>
          )}
        </div>

        <div className="relative">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
              duration: 30,
            }}
          >
            <CarouselContent className="-ml-4 xl:-ml-6 testimonial-carousel">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 xl:pl-6 basis-full md:basis-1/2 xl:basis-1/3"
                >
                  <article
                    className={cn(
                      "testimonial-box group relative h-full",
                      "overflow-hidden"
                    )}
                  >
                    <div className="relative flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4 md:h-5 md:w-5",
                              i < testimonial.rating
                                ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]"
                                : "text-slate-300 dark:text-slate-600"
                            )}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        <span className="block h-[1px] w-8 bg-gradient-to-r from-transparent via-muted-foreground/50 to-transparent" />
                        <span>Rated</span>
                      </div>
                      <Quote className="h-10 w-10 text-slate-400 dark:text-white/30" />
                    </div>

                    <blockquote className="relative text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-8 dark:text-white/95">
                      {testimonial.text}
                    </blockquote>

                    <footer className="relative flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-white/10">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover border border-slate-100 shadow-lg dark:border-white/30"
                        />
                      ) : (
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 text-slate-700 flex items-center justify-center text-lg font-semibold border border-slate-100 dark:from-slate-500 dark:to-slate-700 dark:text-white dark:border-white/20">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-900 text-base md:text-lg font-semibold dark:text-white">
                          {testimonial.name}
                        </p>
                        {(testimonial.title || testimonial.company) && (
                          <p className="text-slate-500 text-sm md:text-base truncate dark:text-slate-300">
                            {[testimonial.title, testimonial.company].filter(Boolean).join(" • ")}
                          </p>
                        )}
                        {testimonial.date && (
                          <p className="text-slate-400 text-xs md:text-sm mt-1">
                            {testimonial.date}
                          </p>
                        )}
                      </div>
                    </footer>

                    {showCTA && (
                      <div className="relative mt-8 pt-6 border-t border-white/5">
                        <Button
                          asChild
                          variant="secondary"
                          className="bg-white text-slate-900 hover:bg-slate-200"
                        >
                          <a href={ctaLink}>{ctaText}</a>
                        </Button>
                      </div>
                    )}
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {testimonials.length > 1 && (
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={scrollPrev}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-foreground/70 hover:text-foreground hover:border-foreground/60 transition-colors bg-white/80 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:text-white dark:hover:border-white/40"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="w-48 h-2 rounded-full bg-slate-200 overflow-hidden dark:bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPercentage}%`,
                      background: "linear-gradient(to right, #FFFFFF, #040D1F)",
                    }}
                  />
                </div>
                <button
                  onClick={scrollNext}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 text-foreground/70 hover:text-foreground hover:border-foreground/60 transition-colors bg-white/80 shadow-sm backdrop-blur dark:border-white/20 dark:bg-white/10 dark:text-white/80 dark:hover:text-white dark:hover:border-white/40"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                {current} / {totalSlides}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;

