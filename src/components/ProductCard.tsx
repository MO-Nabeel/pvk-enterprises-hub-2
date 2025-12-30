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
  tax?: number;
  onCardClick?: () => void;
}

const ProductCard = ({ id, name, price, image, discount, description, tax, onCardClick }: ProductCardProps) => {
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
    addItemToCart({ id, name, price, image, tax });
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
        "group w-full h-full bg-white dark:bg-card rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out",
        "product-card cursor-pointer relative flex flex-col"
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
      {/* Image Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        {discount && (
          <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-rose-600 dark:text-rose-400 text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-sm border border-slate-100 dark:border-slate-800">
            {discount}% OFF
          </div>
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Overlay gradient for better text contrast if we had text on image, but adds depth here */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex flex-col gap-1.5 flex-1 items-start text-left">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 min-h-[2.5em]">
            {name}
          </h3>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-5 flex gap-2 w-full pt-4 border-t border-slate-50 dark:border-slate-800/50">
          <Button
            onClick={handleButtonClick}
            disabled={isAdding}
            size="sm" // Keeping small size but full layout
            className={cn(
              "flex-1 h-10 rounded-lg text-xs font-bold uppercase tracking-wide shadow-none transition-all duration-200",
              isInCart
                ? "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-transparent dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                : "bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg hover:translate-y-[-1px] dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            )}
          >
            {isAdding ? (
              <span className={cn(
                "w-4 h-4 border-2 rounded-full animate-spin",
                isInCart
                  ? "border-slate-300 border-t-slate-600"
                  : "border-white/30 border-t-white dark:border-slate-400 dark:border-t-slate-900"
              )} />
            ) : isInCart ? (
              <span className="flex items-center justify-center gap-2">View Cart <ArrowRight className="w-3.5 h-3.5" /></span>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
