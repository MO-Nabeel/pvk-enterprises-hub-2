import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageBannerProps = {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
  className?: string;
  overlay?: boolean;
};

const PageBanner = ({ title, subtitle, backgroundImage, children, className, overlay }: PageBannerProps) => {
  const showOverlay = overlay ?? Boolean(backgroundImage);

  return (
    <section
      className={cn(
        "relative overflow-hidden text-primary-foreground bg-cover bg-center bg-no-repeat",
        className
      )}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined
      }}
    >
      {showOverlay ? (
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-black/50" aria-hidden="true" />
      ) : null}
      <div className="container relative mx-auto px-4 py-16 sm:py-20 md:py-24">
        <div className="min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] text-primary-foreground/70">
              PVK ENTERPRISES
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">{title}</h1>
            {subtitle ? (
              <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90">
                {subtitle}
              </p>
            ) : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;

