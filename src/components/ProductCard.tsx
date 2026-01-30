import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, Star, MapPin } from "lucide-react";
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

  // Default card click handler - navigates to product detail page
  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick();
    } else {
      navigate(`/product/${encodeURIComponent(id)}`);
    }
  };

  return (
    <div
      className={cn(
        "group w-full h-full bg-white dark:bg-card rounded-[1.5rem] overflow-hidden transition-all duration-300 ease-in-out",
        "hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-transparent hover:border-slate-100 dark:hover:border-slate-800",
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
      <div className="relative w-full aspect-square bg-transparent flex items-center justify-center">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover rounded-2xl shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1 p-5 pt-2">
        <div className="flex flex-col gap-2 flex-1 items-center text-center">
          {/* Title */}
          <h3 className="text-[15px] font-medium text-slate-900 dark:text-slate-100 leading-snug line-clamp-2 uppercase tracking-wide">
            {name}
          </h3>

          {/* Ratings */}
          <div className="flex flex-col items-center gap-0.5 text-xs">
            <div className="flex items-center text-orange-400 gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-slate-400 font-medium text-[11px]">123 Reviews</span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>PVK Store | Malappuram</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-2">
            <span className="text-xl font-bold text-[#040D1F]">
              ₹{price.toLocaleString("en-IN")}
            </span>
            {discount && (
              <>
                <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {discount}%
                </span>
                {originalPrice && (
                  <span className="text-xs text-slate-400 line-through decoration-slate-400/70">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Actions Footer - Button */}
        <div className="mt-4 w-full px-2">
          <Button
            onClick={handleButtonClick}
            disabled={isAdding}
            className={cn(
              "w-full h-10 rounded-lg text-sm font-bold shadow-md transition-all duration-300",
              isInCart
                ? "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-transparent dark:bg-slate-800 dark:text-white"
                : "bg-[#040D1F] hover:bg-[#040D1F]/90 text-white hover:shadow-lg hover:shadow-[#040D1F]/20"
            )}
          >
            {isAdding ? (
              <span className={cn(
                "w-4 h-4 border-2 rounded-full animate-spin",
                isInCart
                  ? "border-slate-300 border-t-slate-600"
                  : "border-white/30 border-t-white"
              )} />
            ) : isInCart ? (
              <span className="flex items-center justify-center gap-2">View Cart <ArrowRight className="w-4 h-4" /></span>
            ) : (
              <span className="flex items-center justify-center gap-2"><ShoppingCart className="w-4 h-4" /> Add to cart</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
