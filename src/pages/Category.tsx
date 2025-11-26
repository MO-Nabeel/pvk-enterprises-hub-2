import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import trophyImage from "@/assets/trophy-product.jpg";
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";
import bannerImage from "@/assets/banner.png";
import customPrintingImage from "@/assets/ct-customprinting.png";
import offsetPrintingImage from "@/assets/ct-offsetprinting.png";
import frameStudioImage from "@/assets/ct-framestudio.jpg";
import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const Category = () => {
  const products = [
    {
      id: "golden-trophy-laurel",
      name: "Golden Trophy with Laurel Wreath",
      price: 2500,
      image: trophyImage,
      discount: 10,
      category: "Trophies & Awards"
    },
    {
      id: "thermal-paper-roll-80",
      name: "THERMAL PAPER ROLL 80mm x 50m",
      price: 450,
      image: printerImage,
      category: "Printer Supplies"
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
      category: "Office Stationery"
    },
    {
      id: "sorakshi-photo-frame",
      name: "Sorakshi Quartz Photo Frame With Clock",
      price: 2800,
      image: trophyImage,
      category: "Trophies & Awards"
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
      category: "Office Stationery"
    },
    {
      id: "tnpl-copier-a4",
      name: "TNPL COPIER PAPEL GSM A4 Size 500 Sheets",
      price: 420,
      image: printerImage,
      category: "Printer Supplies"
    },
    {
      id: "crystal-trophy-wood-base",
      name: "Crystal Trophy with Wooden Base",
      price: 3500,
      image: trophyImage,
      discount: 5,
      category: "Trophies & Awards"
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
      category: "Office Stationery"
    },
    {
      id: "custom-t-shirt-printing",
      name: "Custom T-Shirt Printing Service",
      price: 450,
      image: customPrintingImage,
      category: "Custom Printing"
    },
    {
      id: "banner-printing-service",
      name: "Banner & Flex Printing Service",
      price: 1200,
      image: customPrintingImage,
      discount: 10,
      category: "Custom Printing"
    },
    {
      id: "business-card-offset",
      name: "Business Card Offset Printing (1000 pcs)",
      price: 1800,
      image: offsetPrintingImage,
      category: "Offset Printing"
    },
    {
      id: "brochure-offset-printing",
      name: "Brochure Offset Printing (500 pcs)",
      price: 2500,
      image: offsetPrintingImage,
      discount: 15,
      category: "Offset Printing"
    },
    {
      id: "wooden-photo-frame",
      name: "Premium Wooden Photo Frame Set",
      price: 1200,
      image: frameStudioImage,
      category: "Frame Studio"
    },
    {
      id: "display-pedestal",
      name: "Display Pedestal for Trophies",
      price: 2800,
      image: frameStudioImage,
      discount: 12,
      category: "Frame Studio"
    },
    {
      id: "wedding-invite-classic",
      name: "Handcrafted Wedding Invitation Suite",
      price: 3200,
      image: customPrintingImage,
      category: "Wedding Cards"
    },
    {
      id: "notebook-custom-luxe",
      name: "Executive Customized Notebook Set",
      price: 950,
      image: officeImage,
      category: "Customized Notebook"
    },
    {
      id: "student-id-premium",
      name: "Premium Student ID Card Package",
      price: 260,
      image: printerImage,
      category: "Student ID"
    },
    {
      id: "visiting-card-velvet",
      name: "Velvet Touch Visiting Card (100 pcs)",
      price: 780,
      image: offsetPrintingImage,
      category: "Visiting Card"
    },
    {
      id: "notice-printing-rush",
      name: "Rush Notice Printing (A3 Laminated)",
      price: 540,
      image: customPrintingImage,
      category: "Notice Printing"
    }
  ];

  const categories = useMemo(
    () => [
      "All Products",
      "Trophies & Awards",
      "Office Stationery",
      "Custom Rubber Stamps",
      "Printer Supplies",
      "Mobile Accessories",
      "Custom Printing",
      "Offset Printing",
      "Frame Studio",
      "Wedding Cards",
      "Customized Notebook",
      "Student ID",
      "Visiting Card",
      "Notice Printing"
    ],
    []
  );

  const categoryAliasMap: Record<string, string> = {
    "wedding-card": "Wedding Cards",
    "wedding-cards": "Wedding Cards",
    "wedding cards": "Wedding Cards",
    "customized-notebook": "Customized Notebook",
    "customized-notebooks": "Customized Notebook",
    "custom notebook": "Customized Notebook",
    "student-id": "Student ID",
    "student id": "Student ID",
    "student-id-card": "Student ID",
    "visiting-card": "Visiting Card",
    "visiting cards": "Visiting Card",
    "business-card": "Visiting Card",
    "notice-printing": "Notice Printing",
    "notice printing": "Notice Printing",
    "notice": "Notice Printing"
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Products");
  const productsSectionRef = useRef<HTMLElement>(null);
  const filterSectionRef = useRef<HTMLElement>(null);

  const urlQuery = (searchParams.get("search") || "").trim();

  useEffect(() => {
    setSubmittedQuery(urlQuery);
    // Set active category from URL if present
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam).trim();
      const normalizedCategory = decodedCategory.toLowerCase();
      const resolvedCategory = categoryAliasMap[normalizedCategory] || decodedCategory;
      if (categories.includes(resolvedCategory)) {
        setActiveCategory(resolvedCategory);
        // Note: We don't scroll here on initial load - ScrollToTop component handles
        // scrolling to top on page navigation. Internal category filtering will
        // handle scrolling when user clicks filter buttons.
      }
    }
  }, [urlQuery, searchParams, categories]);

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
          backgroundImage={bannerImage}
        />

        {/* Product Filter */}
        <section 
          ref={filterSectionRef}
          id="product-filters"
          className="py-8 border-b bg-gradient-to-b from-muted/30 to-background scroll-mt-20"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-6xl mx-auto">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                const handleCategoryClick = () => {
                  setActiveCategory(category);
                  // Update URL with category parameter
                  const newSearchParams = new URLSearchParams(searchParams);
                  if (category === "All Products") {
                    newSearchParams.delete("category");
                  } else {
                    newSearchParams.set("category", category);
                  }
                  setSearchParams(newSearchParams, { replace: true });
                  
                  // Scroll to products section
                  setTimeout(() => {
                    if (productsSectionRef.current) {
                      productsSectionRef.current.scrollIntoView({ 
                        behavior: "smooth", 
                        block: "start" 
                      });
                    }
                  }, 50);
                };

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={handleCategoryClick}
                    aria-pressed={isActive}
                    className={`
                      px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300
                      text-sm sm:text-base
                      ${
                        isActive
                          ? "bg-[#111827] text-white border-2 border-[#111827] shadow-lg shadow-[#111827]/20 scale-105"
                          : "bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section ref={productsSectionRef} id="products-grid" className="py-12 sm:py-16 bg-background scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {(hasActiveSearch || !isAllProducts) && (
              <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full mb-4">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Showing {isAllProducts ? "results" : `${activeCategory.toLowerCase()} products`}{" "}
                    {hasActiveSearch && (
                      <>
                        for{" "}
                        <span className="font-semibold text-foreground">
                          "{submittedQuery || "All"}"
                        </span>
                      </>
                    )}{" "}
                    <span className="font-medium text-foreground">
                      ({filteredProducts.length} item{filteredProducts.length === 1 ? "" : "s"})
                    </span>
                  </p>
                </div>
              </div>
            )}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 sm:py-20">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <svg
                      className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">No products found</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                    Try adjusting your search or explore all of our product categories.
                  </p>
                  <button
                    onClick={() => {
                      setActiveCategory("All Products");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#111827] text-white font-medium hover:bg-[#111827]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Browse All Categories
                  </button>
                </div>
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
