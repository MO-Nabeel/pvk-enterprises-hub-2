import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageSliderProps {
  images: string[];
  productName: string;
  className?: string;
}

const ProductImageSlider = ({ images, productName, className }: ProductImageSliderProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={cn("bg-muted/40 flex items-center justify-center p-4 sm:p-6 rounded-lg", className)}>
        <p className="text-muted-foreground text-sm">No images available</p>
      </div>
    );
  }

  const currentImage = images[selectedIndex] || images[0];
  const hasMultipleImages = images.length > 1;

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Layout: Vertical Thumbnails + Main Image */}
      <div className="hidden md:flex gap-3 lg:gap-4 items-start">
        {/* Vertical Thumbnail Column (Left) */}
        {hasMultipleImages && (
          <div className="flex flex-col gap-2 lg:gap-3 flex-shrink-0">
            {images.map((image, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    "relative w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0 rounded-md overflow-hidden",
                    "border border-transparent transition-all duration-200",
                    "hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2",
                    isActive
                      ? "border-blue-600 shadow-md shadow-blue-600/20 bg-white"
                      : "bg-white/90 hover:border-gray-300"
                  )}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  aria-current={isActive ? "true" : "false"}
                >
                  <img
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className={cn(
                      "w-full h-full object-cover transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-90"
                    )}
                    loading="lazy"
                  />
                  {/* Active indicator overlay */}
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-blue-600 rounded-md pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Image Viewer (Right) */}
        <div className="flex-1 bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative w-full aspect-[4/3] bg-white flex items-center justify-center">
            <img
              key={selectedIndex}
              src={currentImage}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              loading={selectedIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              className="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout: Main Image + Horizontal Thumbnails */}
      <div className="flex flex-col gap-3 md:hidden">
        {/* Main Image */}
        <div className="w-full bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="relative w-full aspect-square bg-white flex items-center justify-center">
            <img
              key={selectedIndex}
              src={currentImage}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              loading={selectedIndex === 0 ? "eager" : "lazy"}
              decoding="async"
              className="max-w-full max-h-full w-auto h-auto object-contain transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Horizontal Thumbnail Strip */}
        {hasMultipleImages && (
          <div className="flex gap-2 overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {images.map((image, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    "relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden snap-start",
                    "border border-transparent transition-all duration-200",
                    "hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2",
                    isActive
                      ? "border-blue-600 shadow-md shadow-blue-600/20 bg-white"
                      : "bg-white/90 hover:border-gray-300"
                  )}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                  aria-current={isActive ? "true" : "false"}
                >
                  <img
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className={cn(
                      "w-full h-full object-cover transition-opacity duration-200",
                      isActive ? "opacity-100" : "opacity-90"
                    )}
                    loading="lazy"
                  />
                  {/* Active indicator overlay */}
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-blue-600 rounded-md pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageSlider;
