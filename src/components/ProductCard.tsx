import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { addItemToCart, getCartItems, CART_COUNT_EVENT } from "@/lib/cart";

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

  const handleButtonClick = () => {
    if (isInCart) {
      navigate("/cart");
      return;
    }

    addItemToCart({ id, name, price, image });
    setIsInCart(true);
  };

  const buttonStyles = isInCart
    ? "border border-primary/70 text-primary bg-primary/5 hover:bg-primary/10"
    : "text-white hover:opacity-90";

  return (
    <div className="group bg-card rounded-lg overflow-hidden border shadow-sm transition-transform duration-300 ease-out will-change-transform hover:scale-[1.03] hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {discount && (
          <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full z-10">
            {discount}% OFF
          </div>
        )}
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground mb-2 line-clamp-2 min-h-[48px]">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">₹{price}</span>
            {discount && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ₹{Math.round(price / (1 - discount / 100))}
              </span>
            )}
          </div>
          <Button
            size="sm"
            className={`${buttonStyles} font-semibold shadow-sm transition-colors duration-200 min-w-[140px] justify-center gap-1 whitespace-nowrap`}
            style={!isInCart ? { backgroundColor: '#111827' } : undefined}
            onClick={handleButtonClick}
          >
            {isInCart ? (
              <>
                Go to Cart
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
