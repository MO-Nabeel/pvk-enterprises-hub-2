import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionBadge from "@/components/SectionBadge";
import ProductCard from "@/components/ProductCard";
import ProductImageSlider from "@/components/ProductImageSlider";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllProductsWithExtras } from "@/data/productStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addItemToCart, isProductInCart, CART_COUNT_EVENT, type CartEventDetail } from "@/lib/cart";
import { cartHasVisitingCard } from "@/lib/cartRules";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus } from "lucide-react";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState<number>(1);
  const { toast } = useToast();
  const [isInCart, setIsInCart] = useState(false);

  const resolvedId = useMemo(() => {
    const fromRoute = routeId ?? "";
    const fromQuery = searchParams.get("id") ?? "";
    return decodeURIComponent(fromRoute || fromQuery);
  }, [routeId, searchParams]);

  const products = useMemo(() => getAllProductsWithExtras(), []);

  const product = useMemo(
    () => products.find((item) => item.id === resolvedId),
    [products, resolvedId]
  );

  useEffect(() => {
    if (!product || typeof window === "undefined") return;

    const sync = () => setIsInCart(isProductInCart(product.id));
    sync();

    const listener = (event: Event) => {
      const detail = (event as CustomEvent<CartEventDetail>).detail;
      if (detail && typeof detail === "object" && "items" in detail) {
        setIsInCart(detail.items.some((item) => item.id === product.id));
      } else {
        sync();
      }
    };

    window.addEventListener(CART_COUNT_EVENT, listener as EventListener);
    return () => {
      window.removeEventListener(CART_COUNT_EVENT, listener as EventListener);
    };
  }, [product]);

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(
        (item) => item.category === product.category && item.id !== product.id
      )
      .slice(0, 4);
  }, [products, product]);

  const handleAddToCart = () => {
    if (!product) return;
    addItemToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageGallery?.[0] || "",
        tax: product.tax,
      },
      quantity
    );

    toast({
      title: "Added to cart",
      description: `${product.name} (Qty: ${quantity}) has been added to your cart.`
    });
  };

  const handleBuyNow = () => {
    if (!product) return;

    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageGallery?.[0] || "",
      tax: product.tax,
      quantity: quantity
    };

    // Check if this specific item requires a design upload (e.g., Visiting Card)
    // We utilize the robust helper that checks keywords and category
    const needsUpload = cartHasVisitingCard([checkoutItem]);

    if (needsUpload) {
      navigate("/checkout/upload-design", { state: { checkoutItem } });
    } else {
      navigate("/checkout", { state: { checkoutItem } });
    }
  };

  const handleQuantityChange = (value: string) => {
    const numeric = Number(value.replace(/[^\d]/g, ""));
    if (Number.isNaN(numeric) || numeric <= 0) {
      setQuantity(1);
      return;
    }
    setQuantity(Math.min(999, numeric));
  };

  if (!resolvedId || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-3 sm:space-y-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Product Not Found
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                We couldn't find the product you're looking for.
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                The product might have been moved or is currently unavailable.
              </p>
              <Button onClick={() => navigate("/category")} className="mt-4 text-sm sm:text-base">
                Back to Products
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const originalPrice =
    product.discount && product.discount > 0 && product.oldPrice
      ? product.oldPrice
      : null;

  const description =
    product.description ||
    "A carefully curated product from PVK Enterprises, crafted for lasting quality and everyday reliability. Perfect for events, offices, institutions, and creative professionals.";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        <section className="py-4 sm:py-6 md:py-8 lg:py-10 bg-gray-50 dark:bg-slate-950">
          <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12 items-start">
              {/* Left Column: Product Image Gallery */}
              <div className="w-full">
                <ProductImageSlider
                  images={product.imageGallery || []}
                  productName={product.name}
                />
              </div>

              {/* Right Column: Product Details */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4 shadow-sm border border-gray-200 dark:border-slate-800 w-full max-w-full overflow-hidden">
                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    className="h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm rounded-md border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    onClick={() => navigate("/category")}
                  >
                    ← Back to Products
                  </Button>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <SectionBadge label={product.category} />
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white leading-tight">
                    {product.name}
                  </h1>
                  {product.brand && (
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                      Brand: <span className="text-gray-900 dark:text-white font-semibold">{product.brand}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3 w-full max-w-full">
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 w-full max-w-full">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white break-words">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    {originalPrice && (
                      <>
                        <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-500 line-through break-words">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </p>
                        {product.discount && product.discount > 0 && (
                          <span className="inline-flex items-center rounded px-2 py-0.5 text-xs sm:text-sm font-semibold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 flex-shrink-0">
                            -{product.discount}%
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words max-w-full">
                    {description}
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4 border-t border-gray-200 dark:border-slate-800 pt-3 sm:pt-4">
                  <div className="grid gap-3 sm:gap-4 grid-cols-12 items-end">
                    {/* Quantity - 4 columns on desktop */}
                    <div className="col-span-12 md:col-span-4">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center rounded-full border border-slate-200 bg-white shadow-sm h-11 w-full max-w-[140px] px-1">
                        <button
                          type="button"
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors focus:outline-none"
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={quantity}
                          onChange={(event) =>
                            handleQuantityChange(event.target.value)
                          }
                          className="flex-1 h-full text-center text-sm font-semibold text-slate-900 border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 placeholder-transparent"
                        />
                        <button
                          type="button"
                          className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors focus:outline-none"
                          onClick={() => setQuantity((prev) => Math.min(999, prev + 1))}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart / View in Cart - 4 columns on desktop */}
                    <div className="col-span-12 md:col-span-4 mt-2 md:mt-0">
                      <Button
                        className="w-full h-11 sm:h-12 rounded-md bg-[#111827] dark:bg-white hover:bg-[#1f2937] dark:hover:bg-slate-200 text-white dark:text-slate-900 font-medium text-sm sm:text-base shadow-sm"
                        onClick={isInCart ? () => navigate("/cart") : handleAddToCart}
                      >
                        {isInCart ? "View in Cart →" : "Add to Cart"}
                      </Button>
                    </div>

                    {/* Buy Now - 4 columns on desktop */}
                    <div className="col-span-12 md:col-span-4 mt-2 md:mt-0">
                      <Button
                        className="w-full h-11 sm:h-12 rounded-md bg-[#111827] dark:bg-white hover:bg-[#1f2937] dark:hover:bg-slate-200 text-white dark:text-slate-900 font-medium text-sm sm:text-base shadow-sm"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="py-10 sm:py-12 pb-16 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
            <div className="text-center space-y-2">
              <SectionBadge label="Similar Products" className="mx-auto" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                You Might Also Like
              </h2>
            </div>

            {similarProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {similarProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.imageGallery?.[0] || ""}
                    discount={item.discount}
                    tax={item.tax}
                    onCardClick={() =>
                      navigate(
                        `/product/${encodeURIComponent(item.id)}`,
                        { replace: false }
                      )
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                More products from this category will be available soon.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;


