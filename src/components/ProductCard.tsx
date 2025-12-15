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
  description?: string;
  onCardClick?: () => void;
}

const ProductCard = ({ id, name, price, image, discount, description, onCardClick }: ProductCardProps) => {
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

  // Default card click handler - navigates to product detail page
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    } else {
      // Default behavior: navigate to product detail page
      navigate(`/product/${encodeURIComponent(id)}`);
    }
  };

  return (
    <div
      className={cn(
        "group w-full max-w-full bg-card rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:border-primary/20",
        "product-card cursor-pointer", // Always show pointer cursor for clickable card
      )}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Mobile: image left, details right (high-density list). Desktop: stacked layout */}
      <div className="product-card-inner flex flex-row items-stretch gap-2.5 sm:gap-3 md:flex-col h-full">
        {/* Image container - optimized with flex-shrink-0 to prevent shrinking */}
        <div className="product-image-container relative flex-shrink-0 w-[40%] sm:w-[35%] md:w-full md:h-auto md:aspect-square overflow-hidden bg-muted/30 rounded-lg md:rounded-none h-full md:h-auto">
          {discount && (
            <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-accent text-accent-foreground text-[9px] xs:text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full z-10 shadow-lg whitespace-nowrap">
              {discount}% OFF
            </div>
          )}
          <img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            className="product-image w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>

        {/* Details section - flex-grow-1 to take remaining space */}
        <div className="product-details flex flex-col flex-1 min-w-0 gap-2 sm:gap-3 md:mt-2">
          <div className="product-card-text-content flex-1 min-w-0">
            <h3 className="product-card-title font-semibold text-card-foreground leading-snug line-clamp-2 text-left">
              {name}
            </h3>

            <div className="flex flex-col gap-1 sm:gap-1.5 mt-2">
              <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 text-left">
                <span className="product-card-price text-primary font-bold">
                  ₹{price.toLocaleString("en-IN")}
                </span>
                {originalPrice && (
                  <span className="product-card-original-price text-muted-foreground line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            {/* Product Description - Mobile Only (max-width: 768px) */}
            {(description || "").trim() && (
              <div className="block md:hidden mt-1.5">
                <p className="product-card-description-mobile text-xs text-muted-foreground/70 leading-relaxed line-clamp-2">
                  {description}
                </p>
              </div>
            )}
          </div>

          {/* Actions row - fixed at bottom of card */}
          <div className="product-card-actions">
            <Button
              onClick={handleButtonClick}
              disabled={isAdding}
              className={cn(
                "product-card-button product-card-button-primary relative overflow-hidden font-semibold transition-colors duration-200 ease-in-out",
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
                  "relative z-10 flex items-center justify-center gap-1 sm:gap-1.5 transition-all duration-300 min-w-0",
                  "truncate overflow-hidden",
                  isAdding && "opacity-0"
                )}
              >
                {isInCart ? (
                  <>
                    <span className="hidden min-[375px]:inline text-center leading-tight truncate">View in Cart</span>
                    <span className="min-[375px]:hidden text-center leading-tight truncate">View</span>
                    <ArrowRight
                      className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 min-[375px]:flex hidden sm:flex"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>
                    <ShoppingCart
                      className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:inline text-center leading-tight truncate">Add to Cart</span>
                    <span className="sm:hidden text-center leading-tight truncate">Add</span>
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
              className="product-card-button-secondary font-medium hover:bg-[#111827] hover:text-white transition-colors duration-200 ease-in-out"
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
