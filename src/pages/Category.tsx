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
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const Category = () => {
  const products = [
    {
      id: "golden-trophy-laurel",
      name: "Golden Trophy with Laurel Wreath",
      price: 2500,
      image: trophyImage,
      discount: 10,
      category: "Trophies & Awards",
      brand: "PVK Premium"
    },
    {
      id: "thermal-paper-roll-80",
      name: "THERMAL PAPER ROLL 80mm x 50m",
      price: 450,
      image: printerImage,
      category: "Printer Supplies",
      brand: "Generic"
    },
    {
      id: "colop-printer-38-dater",
      name: "COLOP Printer 38 Dater Self-inking Stamp",
      price: 1250,
      image: stampImage,
      discount: 15,
      category: "Custom Rubber Stamps",
      brand: "COLOP"
    },
    {
      id: "premium-office-notebook",
      name: "Premium Office Notebook A4 Size",
      price: 350,
      image: officeImage,
      category: "Office Stationery",
      brand: "Premium Office"
    },
    {
      id: "sorakshi-photo-frame",
      name: "Sorakshi Quartz Photo Frame With Clock",
      price: 2800,
      image: trophyImage,
      category: "Trophies & Awards",
      brand: "Sorakshi"
    },
    {
      id: "smartphone-case-bundle",
      name: "Smartphone Case & Screen Protector Bundle",
      price: 650,
      image: mobileImage,
      discount: 20,
      category: "Mobile Accessories",
      brand: "TechGuard"
    },
    {
      id: "jmd-gold-lamination",
      name: "JMD Gold Lamination Pouch 125 Micron",
      price: 890,
      image: officeImage,
      category: "Office Stationery",
      brand: "JMD"
    },
    {
      id: "tnpl-copier-a4",
      name: "TNPL COPIER PAPEL GSM A4 Size 500 Sheets",
      price: 420,
      image: printerImage,
      category: "Printer Supplies",
      brand: "TNPL"
    },
    {
      id: "crystal-trophy-wood-base",
      name: "Crystal Trophy with Wooden Base",
      price: 3500,
      image: trophyImage,
      discount: 5,
      category: "Trophies & Awards",
      brand: "PVK Premium"
    },
    {
      id: "professional-rubber-stamp-set",
      name: "Professional Rubber Stamp Set",
      price: 1800,
      image: stampImage,
      category: "Custom Rubber Stamps",
      brand: "Professional"
    },
    {
      id: "premium-wireless-earbuds",
      name: "Premium Wireless Earbuds",
      price: 2200,
      image: mobileImage,
      discount: 25,
      category: "Mobile Accessories",
      brand: "TechGuard"
    },
    {
      id: "executive-pen-set",
      name: "Executive Pen Set with Box",
      price: 950,
      image: officeImage,
      category: "Office Stationery",
      brand: "Premium Office"
    },
    {
      id: "custom-t-shirt-printing",
      name: "Custom T-Shirt Printing Service",
      price: 450,
      image: customPrintingImage,
      category: "Custom Printing",
      brand: "PVK Custom"
    },
    {
      id: "banner-printing-service",
      name: "Banner & Flex Printing Service",
      price: 1200,
      image: customPrintingImage,
      discount: 10,
      category: "Custom Printing",
      brand: "PVK Custom"
    },
    {
      id: "business-card-offset",
      name: "Business Card Offset Printing (1000 pcs)",
      price: 1800,
      image: offsetPrintingImage,
      category: "Offset Printing",
      brand: "PVK Print"
    },
    {
      id: "brochure-offset-printing",
      name: "Brochure Offset Printing (500 pcs)",
      price: 2500,
      image: offsetPrintingImage,
      discount: 15,
      category: "Offset Printing",
      brand: "PVK Print"
    },
    {
      id: "wooden-photo-frame",
      name: "Premium Wooden Photo Frame Set",
      price: 1200,
      image: frameStudioImage,
      category: "Frame Studio",
      brand: "Frame Studio"
    },
    {
      id: "display-pedestal",
      name: "Display Pedestal for Trophies",
      price: 2800,
      image: frameStudioImage,
      discount: 12,
      category: "Frame Studio",
      brand: "Frame Studio"
    },
    {
      id: "wedding-invite-classic",
      name: "Handcrafted Wedding Invitation Suite",
      price: 3200,
      image: customPrintingImage,
      category: "Wedding Cards",
      brand: "PVK Custom"
    },
    {
      id: "notebook-custom-luxe",
      name: "Executive Customized Notebook Set",
      price: 950,
      image: officeImage,
      category: "Customized Notebook",
      brand: "Premium Office"
    },
    {
      id: "student-id-premium",
      name: "Premium Student ID Card Package",
      price: 260,
      image: printerImage,
      category: "Student ID",
      brand: "PVK Print"
    },
    {
      id: "visiting-card-velvet",
      name: "Velvet Touch Visiting Card (100 pcs)",
      price: 780,
      image: offsetPrintingImage,
      category: "Visiting Card",
      brand: "PVK Print"
    },
    {
      id: "notice-printing-rush",
      name: "Rush Notice Printing (A3 Laminated)",
      price: 540,
      image: customPrintingImage,
      category: "Notice Printing",
      brand: "PVK Custom"
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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const productsSectionRef = useRef<HTMLElement>(null);
  const filterSectionRef = useRef<HTMLElement>(null);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [showDiscountedOnly, setShowDiscountedOnly] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  // Calculate min and max prices from products
  const priceRangeData = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Derive brand list from currently scoped category selection
  const availableBrands = useMemo(() => {
    const scopedProducts =
      activeCategory === "All Products"
        ? products
        : products.filter((product) => product.category === activeCategory);

    const brands = scopedProducts
      .map((product) => product.brand)
      .filter((brand): brand is string => Boolean(brand));

    return Array.from(new Set(brands)).sort();
  }, [activeCategory, products]);

  // Ensure previously selected brands remain valid when category changes
  useEffect(() => {
    setSelectedBrands((prev) => {
      const next = prev.filter((brand) => availableBrands.includes(brand));
      return next.length === prev.length ? prev : next;
    });
  }, [availableBrands]);

  // Initialize price range
  useEffect(() => {
    setPriceRange([priceRangeData.min, priceRangeData.max]);
  }, [priceRangeData.min, priceRangeData.max]);

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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = normalizedQuery
        ? product.name.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCategory = isAllProducts ? true : product.category === activeCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesDiscount = showDiscountedOnly ? (product.discount !== undefined && product.discount > 0) : true;
      const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesDiscount && matchesBrand;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "discount":
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [normalizedQuery, isAllProducts, activeCategory, priceRange, sortBy, showDiscountedOnly, selectedBrands]);

  // Clear all filters
  const clearFilters = () => {
    setPriceRange([priceRangeData.min, priceRangeData.max]);
    setSortBy("default");
    setShowDiscountedOnly(false);
    setSelectedBrands([]);
    setActiveCategory("All Products");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("category");
    setSearchParams(newSearchParams, { replace: true });
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      priceRange[0] !== priceRangeData.min ||
      priceRange[1] !== priceRangeData.max ||
      sortBy !== "default" ||
      showDiscountedOnly ||
      selectedBrands.length > 0 ||
      !isAllProducts
    );
  }, [priceRange, priceRangeData, sortBy, showDiscountedOnly, selectedBrands, isAllProducts]);

  // Handle brand selection
  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const hasActiveSearch = Boolean(normalizedQuery);

  // Render filter content (used in both desktop sidebar and mobile sheet)
  const renderFilterContent = () => (
    <>
      {/* Price Range Filter */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm sm:text-base font-semibold">Price Range</label>
          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap ml-2">
            ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
          </span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={priceRangeData.min}
          max={priceRangeData.max}
          step={50}
          className="w-full"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>₹{priceRangeData.min.toLocaleString()}</span>
          <span>₹{priceRangeData.max.toLocaleString()}</span>
        </div>
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Discount Filter */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm sm:text-base font-semibold">Special Offers</label>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Checkbox
            id="discount-only"
            checked={showDiscountedOnly}
            onCheckedChange={(checked) => setShowDiscountedOnly(checked === true)}
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
          <label
            htmlFor="discount-only"
            className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
          >
            Show only discounted items
          </label>
        </div>
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Brand Filter */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm sm:text-base font-semibold">Brand</label>
        <div className="space-y-2">
          {availableBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2 sm:space-x-3 py-1">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
                className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 break-words"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Category Filter (for mobile) */}
      <div className="lg:hidden space-y-3">
        <label className="text-sm font-semibold">Category</label>
        <div className="space-y-2">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  const newSearchParams = new URLSearchParams(searchParams);
                  if (category === "All Products") {
                    newSearchParams.delete("category");
                  } else {
                    newSearchParams.set("category", category);
                  }
                  setSearchParams(newSearchParams, { replace: true });
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-[#111827] text-white"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PageBanner
          title="Products"
          subtitle="Browse our extensive collection of high-quality trophies, supplies, and accessories."
          backgroundImage={bannerImage}
        />

        {/* Product Filter - Category Pills */}
        <section 
          ref={filterSectionRef}
          id="product-filters"
          className="py-6 sm:py-8 border-b bg-gradient-to-b from-muted/30 to-background scroll-mt-20"
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
        <section ref={productsSectionRef} id="products-grid" className="py-6 sm:py-8 md:py-12 bg-background scroll-mt-20 sm:scroll-mt-24">
          <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
            {/* Filter Controls Bar */}
            <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                    Products
                    {filteredProducts.length > 0 && (
                      <span className="text-sm sm:text-base font-normal text-muted-foreground ml-2">
                        ({filteredProducts.length})
                      </span>
                    )}
                  </h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 text-xs sm:text-sm shrink-0"
                    >
                      <X className="h-3 w-3 sm:mr-1" />
                      <span className="hidden sm:inline">Clear Filters</span>
                      <span className="sm:hidden">Clear</span>
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* Mobile Filter Button */}
                  <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden flex-1 sm:flex-initial min-w-[100px]">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Filters</span>
                        <span className="sm:hidden">Filter</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent 
                      side="left" 
                      className="w-[90vw] sm:w-[85vw] md:w-[400px] max-w-[400px] p-4 sm:p-6 flex flex-col"
                    >
                      <SheetHeader className="mb-4 sm:mb-6 flex-shrink-0">
                        <SheetTitle className="text-lg sm:text-xl">Filter Products</SheetTitle>
                      </SheetHeader>
                      <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 flex-1 overflow-y-auto">
                        {renderFilterContent()}
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Sort Select */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full sm:w-[140px] md:w-[160px] lg:w-[180px] text-xs sm:text-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                      <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      <SelectItem value="discount">Highest Discount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
              {/* Desktop Filter Sidebar */}
              <aside className="hidden lg:block w-full lg:w-72 xl:w-80 flex-shrink-0 self-start">
                <div 
                  className="sticky top-[100px] space-y-4 sm:space-y-6 bg-card border rounded-lg p-4 sm:p-5 md:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold">Filters</h3>
                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-7 sm:h-8 text-xs"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
                  <Separator />
                  {renderFilterContent()}
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1 min-w-0">
                {(hasActiveSearch || hasActiveFilters) && (
                  <div className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted/50 rounded-full">
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        Showing {isAllProducts ? "results" : `${activeCategory.toLowerCase()} products`}{" "}
                        {hasActiveSearch && (
                          <>
                            for{" "}
                            <span className="font-semibold text-foreground">
                              "{submittedQuery || "All"}"
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
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
                        Try adjusting your filters or explore all of our product categories.
                      </p>
                      <Button
                        onClick={clearFilters}
                        className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#111827] text-white font-medium hover:bg-[#111827]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
