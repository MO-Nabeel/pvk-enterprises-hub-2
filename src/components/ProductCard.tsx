import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { addItemToCart, isProductInCart, CART_COUNT_EVENT } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  onCardClick?: () => void;
}

const ProductCard = ({ id, name, price, image, discount, onCardClick }: ProductCardProps) => {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = useState(() => isProductInCart(id));
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const synchronizeState = () => setIsInCart(isProductInCart(id));
    synchronizeState();

    const cartListener: EventListener = () => synchronizeState();
    window.addEventListener(CART_COUNT_EVENT, cartListener);

    return () => {
      window.removeEventListener(CART_COUNT_EVENT, cartListener);
    };
  }, [id]);

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    // Prevent the card-level click handler (which navigates to PDP) from firing
    // when the primary CTA button is clicked.
    event.stopPropagation();

    if (isInCart) {
      if (typeof window !== "undefined") {
        window.location.href = "/cart";
      }
      return;
    }

    setIsAdding(true);
    addItemToCart({ id, name, price, image });
    setIsInCart(true);

    // Reset adding state after animation
    setTimeout(() => setIsAdding(false), 300);
  };

  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : null;

  const handleViewClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Prevent the card-level click handler from firing
    event.stopPropagation();

    // Navigate directly to the product detail page
    navigate(`/product/${encodeURIComponent(id)}`);
  };

  return (
    <div
      className={cn(
        "group w-full h-full bg-card rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:border-primary/20",
        "box-border", // Ensure padding never causes horizontal overflow on small screens
        onCardClick && "cursor-pointer",
      )}
      onClick={onCardClick}
      role={onCardClick ? "button" : undefined}
      tabIndex={onCardClick ? 0 : undefined}
    >
      {/* Mobile: image left, details right (high-density list). Desktop: stacked layout */}
      <div className="flex flex-row items-start gap-3 p-3 sm:p-4 md:p-5 md:flex-col">
        {/* Image column - fixed 100px square on mobile, scales up slightly on larger screens */}
        <div className="relative flex-shrink-0 w-[100px] h-[100px] min-w-[100px] sm:w-[110px] sm:h-[110px] sm:min-w-[110px] md:w-full md:h-auto md:aspect-square overflow-hidden bg-muted/30 rounded-lg md:rounded-none">
          {discount && (
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full z-10 shadow-lg">
              {discount}% OFF
            </div>
          )}
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Details column - all text left-aligned, actions anchored to bottom */}
        <div className="flex flex-col flex-1 min-w-0 gap-2 sm:gap-3 md:mt-2 h-full">
          <h3 className="font-semibold text-card-foreground text-sm sm:text-base md:text-lg leading-snug line-clamp-2 text-left">
            {name}
          </h3>

          <div className="flex flex-col gap-1 sm:gap-1.5">
            <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 text-left">
              <span className="text-base sm:text-lg md:text-2xl font-bold text-primary">
                ₹{price.toLocaleString("en-IN")}
              </span>
              {originalPrice && (
                <span className="text-[11px] sm:text-xs md:text-sm text-muted-foreground line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          {/* Actions row - full width of details column, anchored to bottom on mobile */}
          <div className="mt-2 flex flex-col sm:flex-row gap-2 w-full mt-auto">
            <Button
              onClick={handleButtonClick}
              disabled={isAdding}
              className={cn(
                "product-card-button w-[90%] sm:flex-1 sm:w-auto relative overflow-hidden font-semibold transition-colors duration-200 ease-in-out",
                "mx-auto sm:mx-0",
                "h-9 sm:h-10 md:h-11",
                "text-xs sm:text-sm md:text-base",
                "rounded-lg sm:rounded-xl",
                "shadow-sm hover:shadow-md active:shadow-sm",
                "transform hover:scale-[1.01] active:scale-[0.99]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isInCart
                  ? "bg-primary/5 hover:bg-[#111827] text-primary border-2 border-primary/30 hover:border-primary/50 hover:text-white"
                  : "bg-[#111827] hover:bg-[#111827] text-white border-2 border-transparent hover:border-primary/20",
                isAdding && "pointer-events-none opacity-75"
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-300",
                  isAdding && "opacity-0"
                )}
              >
                {isInCart ? (
                  <>
                    <span className="text-center leading-tight">View in Cart</span>
                    <ArrowRight
                      className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>
                    <ShoppingCart
                      className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-center leading-tight">Add to Cart</span>
                  </>
                )}
              </span>
              {isAdding && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </span>
              )}
              {!isInCart && !isAdding && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-[90%] sm:w-auto mx-auto sm:mx-0 h-9 sm:h-10 md:h-11 text-xs sm:text-sm font-medium hover:bg-[#111827] hover:text-white transition-colors duration-200 ease-in-out"
              onClick={handleViewClick}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
