import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import SectionBadge from "@/components/SectionBadge";
import ProductCard from "@/components/ProductCard";
import bannerImage from "@/assets/banner.png";
import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getAllProductsWithExtras } from "@/data/productStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addItemToCart } from "@/lib/cart";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id: routeId } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState<number>(1);

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
        image: product.imageURL,
      },
      quantity
    );
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
        <main className="flex-1">
          <PageBanner
            title="Product Not Found"
            subtitle="We couldn't find the product you're looking for."
            backgroundImage={bannerImage}
          />
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4 text-center space-y-4">
              <p className="text-muted-foreground">
                The product might have been moved or is currently unavailable.
              </p>
              <Button onClick={() => navigate("/category")}>
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

      <main className="flex-1">
        <PageBanner
          title={product.name}
          subtitle={product.category}
          backgroundImage={bannerImage}
        />

        <section className="py-10 sm:py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1.2fr] gap-6 sm:gap-8 lg:gap-10 items-start">
              {/* Left Column: Product Image */}
              <div className="space-y-4">
                <div className="bg-card rounded-2xl overflow-hidden shadow-md border border-border/60">
                  <div className="w-full bg-muted/40 flex items-center justify-center p-4 sm:p-6">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto max-w-md max-h-[400px] sm:max-h-[450px] md:max-h-[500px] object-contain rounded-xl shadow-sm"
                    />
                  </div>
                </div>
              </div>

            {/* Right Column: Product Details */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <SectionBadge label={product.category} />
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                    {product.name}
                  </h1>
                  {product.brand && (
                    <p className="text-sm font-medium text-muted-foreground">
                      Brand: <span className="text-foreground">{product.brand}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <p className="text-2xl sm:text-3xl font-bold text-primary">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                    {originalPrice && (
                      <p className="text-base sm:text-lg text-muted-foreground line-through">
                        ₹{originalPrice.toLocaleString("en-IN")}
                      </p>
                    )}
                    {product.discount && product.discount > 0 && (
                      <span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-xs font-semibold dark:bg-emerald-900/40 dark:text-emerald-200">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">
                        Quantity
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() =>
                            setQuantity((prev) => Math.max(1, prev - 1))
                          }
                        >
                          -
                        </Button>
                        <Input
                          type="text"
                          inputMode="numeric"
                          value={quantity}
                          onChange={(event) =>
                            handleQuantityChange(event.target.value)
                          }
                          className="w-16 text-center"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-9 w-9"
                          onClick={() =>
                            setQuantity((prev) => Math.min(999, prev + 1))
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="min-w-[180px] h-11 rounded-xl bg-[#111827] hover:bg-[#111827]/90 text-white font-semibold"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="h-11 rounded-xl"
                      onClick={() => navigate("/category")}
                    >
                      Back to Products
                    </Button>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {similarProducts.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.imageURL}
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


