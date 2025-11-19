import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import trophyImage from "@/assets/trophy-product.jpg";
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";
import saleBg from "@/assets/sale-banner-bg.jpg";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Category = () => {
  const products = [
    {
      id: "golden-trophy-laurel",
      name: "Golden Trophy with Laurel Wreath",
      price: 2500,
      image: trophyImage,
      discount: 10,
      category: "Trophy & Awards"
    },
    {
      id: "thermal-paper-roll-80",
      name: "THERMAL PAPER ROLL 80mm x 50m",
      price: 450,
      image: printerImage,
      category: "Printers & Accessories"
    },
    {
      id: "colop-printer-38-dater",
      name: "COLOP Printer 38 Dater Self-inking Stamp",
      price: 1250,
      image: stampImage,
      discount: 15,
      category: "Custom Rubber Stamps"
    },
    {
      id: "premium-office-notebook",
      name: "Premium Office Notebook A4 Size",
      price: 350,
      image: officeImage,
      category: "Office & Stationery"
    },
    {
      id: "sorakshi-photo-frame",
      name: "Sorakshi Quartz Photo Frame With Clock",
      price: 2800,
      image: trophyImage,
      category: "Trophy & Awards"
    },
    {
      id: "smartphone-case-bundle",
      name: "Smartphone Case & Screen Protector Bundle",
      price: 650,
      image: mobileImage,
      discount: 20,
      category: "Mobile Accessories"
    },
    {
      id: "jmd-gold-lamination",
      name: "JMD Gold Lamination Pouch 125 Micron",
      price: 890,
      image: officeImage,
      category: "Office & Stationery"
    },
    {
      id: "tnpl-copier-a4",
      name: "TNPL COPIER PAPEL GSM A4 Size 500 Sheets",
      price: 420,
      image: printerImage,
      category: "Printers & Accessories"
    },
    {
      id: "crystal-trophy-wood-base",
      name: "Crystal Trophy with Wooden Base",
      price: 3500,
      image: trophyImage,
      discount: 5,
      category: "Trophy & Awards"
    },
    {
      id: "professional-rubber-stamp-set",
      name: "Professional Rubber Stamp Set",
      price: 1800,
      image: stampImage,
      category: "Custom Rubber Stamps"
    },
    {
      id: "premium-wireless-earbuds",
      name: "Premium Wireless Earbuds",
      price: 2200,
      image: mobileImage,
      discount: 25,
      category: "Mobile Accessories"
    },
    {
      id: "executive-pen-set",
      name: "Executive Pen Set with Box",
      price: 950,
      image: officeImage,
      category: "Office & Stationery"
    }
  ];

  const categories = [
    "All Products",
    "Trophy & Awards",
    "Office & Stationery",
    "Custom Rubber Stamps",
    "Printers & Accessories",
    "Mobile Accessories"
  ];

  const [searchParams] = useSearchParams();
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");

  const urlQuery = (searchParams.get("search") || "").trim();

  useEffect(() => {
    setSubmittedQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail || "";
      setSubmittedQuery(detail);
    };

    window.addEventListener("pvk:search-submit", handler as EventListener);
    return () => {
      window.removeEventListener("pvk:search-submit", handler as EventListener);
    };
  }, []);

  const normalizedQuery = submittedQuery.trim().toLowerCase();
  const isAllProducts = activeCategory === "All Products";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = normalizedQuery
        ? product.name.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCategory = isAllProducts ? true : product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [normalizedQuery, isAllProducts, activeCategory]);

  const hasActiveSearch = Boolean(normalizedQuery);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PageBanner
          title="Products"
          subtitle="Browse our extensive collection of high-quality trophies, supplies, and accessories."
          backgroundImage={saleBg}
        />

        {/* Product Filter */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`px-6 py-2 rounded-full font-medium transition-colors border ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow"
                        : "bg-card text-card-foreground hover:bg-primary/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {(hasActiveSearch || !isAllProducts) && (
              <div className="max-w-4xl mx-auto text-center mb-10">
                <p className="text-muted-foreground">
                  Showing {isAllProducts ? "results" : `${activeCategory.toLowerCase()} products`}{" "}
                  {hasActiveSearch && (
                    <>
                      for{" "}
                      <span className="font-semibold text-foreground">
                        "{submittedQuery || "All"}"
                      </span>
                    </>
                  )}{" "}
                  ({filteredProducts.length} item{filteredProducts.length === 1 ? "" : "s"})
                </p>
              </div>
            )}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold mb-4">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or explore all of our product categories.
                </p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Browse Categories
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need Help Choosing Products?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our expert team is ready to assist you in selecting the perfect products for your needs
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Category;
