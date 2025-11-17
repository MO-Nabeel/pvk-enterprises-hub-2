import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  discount?: number;
}

const ProductCard = ({ name, price, image, discount }: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300">
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
          <Button size="sm" className="bg-accent hover:bg-accent/90">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
