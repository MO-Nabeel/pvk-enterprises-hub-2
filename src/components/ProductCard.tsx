import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Check } from "lucide-react";
import { addItemToCart, getCartItems, CART_COUNT_EVENT } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

const ProductCard = ({ id, name, price, image, discount }: ProductCardProps) => {
  const navigate = useNavigate();
  const isProductInCart = () => getCartItems().some((item) => item.id === id);
  const [isInCart, setIsInCart] = useState(isProductInCart);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const synchronizeState = () => setIsInCart(isProductInCart());
    synchronizeState();

    const cartListener: EventListener = () => synchronizeState();
    window.addEventListener(CART_COUNT_EVENT, cartListener);

    return () => {
      window.removeEventListener(CART_COUNT_EVENT, cartListener);
    };
  }, [id]);

  const handleButtonClick = async () => {
    if (isInCart) {
      navigate("/cart");
      return;
    }

    setIsAdding(true);
    addItemToCart({ id, name, price, image });
    setIsInCart(true);
    
    // Reset adding state after animation
    setTimeout(() => setIsAdding(false), 300);
  };

  const originalPrice = discount ? Math.round(price / (1 - discount / 100)) : null;

  return (
    <div className="group bg-card rounded-xl sm:rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 ease-out will-change-transform hover:scale-[1.02] hover:border-primary/20">
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {discount && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-accent text-accent-foreground text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full z-10 shadow-lg">
            {discount}% OFF
          </div>
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4">
        <h3 className="font-semibold text-card-foreground text-sm sm:text-base md:text-lg leading-tight line-clamp-2 min-h-[2.5em] sm:min-h-[3em]">
          {name}
        </h3>
        <div className="flex flex-col gap-3 sm:gap-4 mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-2">
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
              ₹{price.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
          <Button
            onClick={handleButtonClick}
            disabled={isAdding}
            className={cn(
              "product-card-button w-full relative overflow-hidden font-semibold transition-all duration-300 ease-out",
              "h-10 sm:h-11 md:h-12",
              "text-xs sm:text-sm md:text-base",
              "rounded-lg sm:rounded-xl",
              "shadow-sm hover:shadow-md active:shadow-sm",
              "transform hover:scale-[1.02] active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              isInCart
                ? "bg-primary/5 hover:bg-primary/10 text-primary border-2 border-primary/30 hover:border-primary/50"
                : "bg-[#111827] hover:bg-[#1f2937] text-white border-2 border-transparent hover:border-primary/20",
              isAdding && "pointer-events-none opacity-75"
            )}
          >
            <span className={cn(
              "relative z-10 flex items-center justify-center gap-2 transition-all duration-300",
              isAdding && "opacity-0"
            )}>
              {isInCart ? (
                <>
                  <Check className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" aria-hidden="true" />
                  <span className="whitespace-nowrap">View in Cart</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 sm:h-[18px] sm:w-[18px] md:h-5 md:w-5" aria-hidden="true" />
                  <span className="whitespace-nowrap">Add to Cart</span>
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
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
