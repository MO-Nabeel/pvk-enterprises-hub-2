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
import { useToast } from "@/hooks/use-toast";

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
    addItemToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageGallery?.[0] || "",
      },
      quantity
    );
    navigate("/checkout");
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
        <section className="py-4 sm:py-6 md:py-8 lg:py-10 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-start">
              {/* Left Column: Product Image Gallery */}
              <div className="w-full lg:sticky lg:top-24">
                <ProductImageSlider
                  images={product.imageGallery || []}
                  productName={product.name}
                />
              </div>

              {/* Right Column: Product Details */}
              <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 md:space-y-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <Button
                    variant="outline"
                    className="h-8 sm:h-9 px-3 sm:px-4 text-xs sm:text-sm rounded-md border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 hover:text-gray-900"
                    onClick={() => navigate("/category")}
                  >
                    ← Back to Products
                  </Button>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <SectionBadge label={product.category} />
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                  {product.brand && (
                    <p className="text-xs sm:text-sm font-medium text-gray-600">
                      Brand: <span className="text-gray-900 font-semibold">{product.brand}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    {originalPrice && (
                      <>
                        <p className="text-base sm:text-lg md:text-xl text-gray-500 line-through">
                          ₹{originalPrice.toLocaleString("en-IN")}
                        </p>
                        {product.discount && product.discount > 0 && (
                          <span className="inline-flex items-center rounded px-2 py-0.5 text-xs sm:text-sm font-semibold bg-red-100 text-red-700">
                            -{product.discount}%
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-5 border-t border-gray-200 pt-4 sm:pt-5">
                  <div className="grid gap-3 sm:gap-4 grid-cols-12 items-end">
                    {/* Quantity - 2 columns on desktop */}
                    <div className="col-span-12 md:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-stretch max-w-[150px] rounded-md border border-gray-300 overflow-hidden bg-white">
                        <button
                          type="button"
                          className="w-10 h-10 flex items-center justify-center text-base font-semibold text-gray-700 hover:bg-gray-100 border-r border-gray-300 focus:outline-none"
                          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        >
                          -
                        </button>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={quantity}
                          onChange={(event) =>
                            handleQuantityChange(event.target.value)
                          }
                          className="w-12 h-10 text-center text-sm border-0 rounded-none focus-visible:ring-0 focus-visible:outline-none"
                        />
                        <button
                          type="button"
                          className="w-10 h-10 flex items-center justify-center text-base font-semibold text-gray-700 hover:bg-gray-100 border-l border-gray-300 focus:outline-none"
                          onClick={() => setQuantity((prev) => Math.min(999, prev + 1))}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart / View in Cart - 5 columns on desktop */}
                    <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                      <Button
                        className="w-full h-11 sm:h-12 rounded-md bg-[#111827] hover:bg-[#1f2937] text-white font-medium text-sm sm:text-base shadow-sm"
                        onClick={isInCart ? () => navigate("/cart") : handleAddToCart}
                      >
                        {isInCart ? "View in Cart →" : "Add to Cart"}
                      </Button>
                    </div>

                    {/* Buy Now - 5 columns on desktop */}
                    <div className="col-span-12 md:col-span-5 mt-2 md:mt-0">
                      <Button
                        className="w-full h-11 sm:h-12 rounded-md bg-[#111827] hover:bg-[#1f2937] text-white font-medium text-sm sm:text-base shadow-sm"
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
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-2">
                <SectionBadge label="Similar Products" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  You Might Also Like
                </h2>
              </div>
            </div>

            {similarProducts.length > 0 ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3 sm:gap-5 md:gap-6">
                {similarProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.imageGallery?.[0] || ""}
                    discount={item.discount}
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


