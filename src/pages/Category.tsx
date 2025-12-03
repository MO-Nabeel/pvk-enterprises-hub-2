import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PageBanner from "@/components/PageBanner";
import SectionBadge from "@/components/SectionBadge";
import bannerImage from "@/assets/banner.png";
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getAllProductsWithExtras,
  getCategoryBrandMap,
  getCustomCategories,
  getCategoryOverrideMap,
  type CategoryBrandMap,
} from "@/data/productStore";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";

const Category = () => {
  const navigate = useNavigate();
  // Adapt shared data (base + admin extras) to the shape expected by ProductCard
  const products = getAllProductsWithExtras().map((product) => ({
    ...product,
    image: product.imageURL
  }));

  const customCategories = useMemo(() => getCustomCategories(), []);
  const categoryOverrides = useMemo(() => getCategoryOverrideMap(), []);

  const categories = useMemo(() => {
    const defaultBase = [
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
      "Notice Printing",
    ];

    const effectiveDefaults = defaultBase
      .map((base) => {
        const override = categoryOverrides[base];
        if (override?.hidden) return null;
        return override?.name ?? base;
      })
      .filter((name): name is string => Boolean(name));

    const merged = ["All Products", ...effectiveDefaults, ...customCategories];
    const seen = new Set<string>();

    return merged.filter((name) => {
      if (!name || seen.has(name)) return false;
      seen.add(name);
      return true;
    });
  }, [customCategories, categoryOverrides]);

  // Optional master brand catalog per category to power the Brand filter,
  // even if some brands don't yet have explicit products created.
  const categoryBrandCatalog: Record<string, string[]> = {
    "Office Stationery": [
      "Akari",
      "Anpu",
      "Apsara",
      "Balaji",
      "Bbi",
      "Camel",
      "Camlin",
      "Casio",
      "Cello",
      "Doms",
      "Envelopes",
      "Esha",
      "Fasson",
      "God's Grace",
      "Index",
      "Jk",
      "Kaveri's",
      "Ladder",
      "Lexi",
      "Nataraj",
      "Novajet Mpl",
      "Pvk Enterprises",
      "Sharp",
      "Sprint Plus",
      "Sun",
      "Tnpl",
      "Totem",
      "Win",
      "Winner",
      "X Card Sj"
    ],
    "Custom Rubber Stamps": [
      "Pvk Enterprises",
      "Colop",
      "Exmark",
      "Camlin",
      "Artline",
      "Numex",
      "Pvk"
    ],
    "Printer Supplies": [
      "Alphabet",
      "Canon",
      "Clair Tek",
      "Dell",
      "Epson",
      "Hp",
      "Image Master",
      "Leveraa",
      "Lipi",
      "Logitech",
      "Mente",
      "Pvk Enterprises",
      "Tvs Electronics"
    ],
    "Mobile Accessories": [
      "Erd"
    ],
    "Custom Printing": [
      "Pvk Enterprises"
    ],
    "Offset Printing": [
      "Pvk Enterprises"
    ],
    "Frame Studio": [
      "Jmd International",
      "Nova",
      "Nova Digital Media",
      "Nova Digital Plus",
      "Nova Prismajet",
      "Prismajet",
      "Pvk Enterprises",
      "Sandisk",
      "Sonakshi",
      "Ubiq"
    ]
  };

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
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate min and max prices from products
  const priceRangeData = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, []);

  // Dynamic admin-created brand catalog from localStorage
  const dynamicBrandMap: CategoryBrandMap = useMemo(() => getCategoryBrandMap(), []);

  // Derive brand list from currently scoped category selection
  const availableBrands = useMemo(() => {
    const scopedProducts =
      activeCategory === "All Products"
        ? products
        : products.filter((product) => product.category === activeCategory);

    const productBrands = scopedProducts
      .map((product) => product.brand)
      .filter((brand): brand is string => Boolean(brand));

    const configuredBrands = categoryBrandCatalog[activeCategory] || [];
    const dynamicBrands = dynamicBrandMap[activeCategory] || [];

    const brands = Array.from(new Set([...productBrands, ...configuredBrands, ...dynamicBrands]));

    return brands.sort();
  }, [activeCategory, products, dynamicBrandMap]);

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

    const pageParam = searchParams.get("page");
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10);
      if (!Number.isNaN(pageNumber) && pageNumber > 0) {
        setCurrentPage(pageNumber);
      }
    } else {
      setCurrentPage(1);
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

  // Reset to first page whenever core filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedQuery, isAllProducts, activeCategory, priceRange, sortBy, showDiscountedOnly, selectedBrands]);

  const pageSize = 12;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPageSafe - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPageSafe, pageSize]);

  const startItem = filteredProducts.length === 0 ? 0 : (currentPageSafe - 1) * pageSize + 1;
  const endItem =
    filteredProducts.length === 0
      ? 0
      : Math.min(filteredProducts.length, startItem + paginatedProducts.length - 1);

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

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPageSafe) return;
    setCurrentPage(page);

    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newSearchParams.delete("page");
    } else {
      newSearchParams.set("page", String(page));
    }
    setSearchParams(newSearchParams, { replace: true });

    if (productsSectionRef.current) {
      productsSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const createPageRange = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    const leftSibling = Math.max(2, currentPageSafe - 1);
    const rightSibling = Math.min(totalPages - 1, currentPageSafe + 1);

    pages.push(1);

    if (leftSibling > 2) {
      pages.push("ellipsis");
    }

    for (let i = leftSibling; i <= rightSibling; i += 1) {
      pages.push(i);
    }

    if (rightSibling < totalPages - 1) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  const paginationRange = createPageRange();

  // Render filter content (used in both desktop sidebar and mobile sheet)
  const renderFilterContent = () => (
    <>
      {/* Price Range Filter */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm sm:text-base font-semibold text-foreground">Price Range</label>
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
        <label className="text-sm sm:text-base font-semibold text-foreground">Special Offers</label>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Checkbox
            id="discount-only"
            checked={showDiscountedOnly}
            onCheckedChange={(checked) => setShowDiscountedOnly(checked === true)}
            className="h-4 w-4 sm:h-5 sm:w-5"
          />
          <label
            htmlFor="discount-only"
            className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 text-foreground"
          >
            Show only discounted items
          </label>
        </div>
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Brand Filter */}
      <div className="space-y-2 sm:space-y-3">
        <label className="text-sm sm:text-base font-semibold text-foreground">Brand</label>
        <div
          id="brand-list"
          className={cn(
            "space-y-2 brand-list-container",
            showAllBrands && "expanded"
          )}
        >
          {availableBrands.map((brand) => (
            <div
              key={brand}
              className="brand-checkbox-item flex items-center space-x-2 sm:space-x-3 py-1"
            >
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
                className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0"
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 break-words text-foreground"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
        {availableBrands.length > 6 && (
          <button
            id="toggle-brands-btn"
            type="button"
            onClick={() => setShowAllBrands((prev) => !prev)}
            className="toggle-brands-btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-1"
          >
            <span>
              {showAllBrands
                ? "Show Less ▲"
                : `Show More Brands (${availableBrands.length - 6} Hidden) ▼`}
            </span>
          </button>
        )}
      </div>

      <Separator className="my-4 sm:my-6" />

      {/* Category Filter (for mobile) */}
      <div className="lg:hidden space-y-3">
        <label className="text-sm font-semibold text-foreground">Category</label>
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
                    ? "bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground"
                    : "bg-muted hover:bg-muted/80 text-foreground"
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
        <section className="py-6 sm:py-8 bg-background">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-10">
            <div className="grid gap-5 sm:gap-6 lg:gap-8 lg:grid-cols-[1.25fr,0.75fr] bg-card rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.3)] border border-border">
              <div className="space-y-4 sm:space-y-5">
                <SectionBadge label="Discover" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  Curated Products for Every Business Journey
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  From award-winning trophies to high-performance printing supplies and custom branding essentials,
                  explore a selection tailored for event planners, offices, institutions, and creative studios.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {["Trophies", "Printing", "Stationery", "Accessories"].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#1f2937] p-4 sm:p-6 md:p-7 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]" />
                <div className="relative z-10 space-y-3 sm:space-y-4">
                  <p className="text-[11px] sm:text-xs uppercase tracking-[0.4em] text-white/70">Featured Drop</p>
                  <h3 className="text-xl sm:text-2xl font-semibold leading-snug">Award Ceremony Kit</h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Premium trophies, name plates, certificates, and stage branding delivered in 48 hours.
                  </p>
                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4">
                    <div className="min-w-[110px]">
                      <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/60">Starting</p>
                      <p className="text-lg sm:text-xl font-bold">₹2,500</p>
                    </div>
                    <div className="flex-1 min-w-[150px]">
                      <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-white/60">Includes</p>
                      <p className="text-xs sm:text-sm text-white/85">Trophies, Certificates, Stage Props</p>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/70">
                  Limited Slots
                  <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Filter - Category Pills */}
        <section 
          ref={filterSectionRef}
          id="product-filters"
          className="py-6 sm:py-8 border-b bg-gradient-to-b from-muted/30 to-background scroll-mt-20"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center max-w-6xl mx-auto">
              <SectionBadge label="Categories" className="mt-2" />
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
                    className={cn(
                      "px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 text-sm sm:text-base",
                      isActive
                        ? "bg-primary text-primary-foreground border-2 border-primary shadow-lg shadow-primary/20 scale-105"
                        : "bg-card text-foreground border-2 border-border hover:border-primary/50 hover:bg-muted hover:shadow-md"
                    )}
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
                  <SectionBadge label="Products" />
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
                      className="w-[90vw] sm:w-[85vw] md:w-[400px] max-w-[400px] p-4 sm:p-6 flex flex-col bg-background border-border"
                    >
                      <SheetHeader className="mb-4 sm:mb-6 flex-shrink-0">
                        <SheetTitle className="text-lg sm:text-xl text-foreground">Filter Products</SheetTitle>
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
              <aside className="hidden lg:block w-full lg:w-72 xl:w-80 flex-shrink-0 self-stretch">
                <div 
                  className="filter-sidebar sticky top-[100px] bg-card border border-border rounded-lg shadow-sm"
                >
                  <div className="flex flex-col p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6">
                    <div className="flex items-center justify-between flex-shrink-0">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground">Filters</h3>
                      {hasActiveFilters && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="h-7 sm:h-8 text-xs text-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>
                    <Separator className="flex-shrink-0" />
                    <div className="space-y-4 sm:space-y-6 flex-1">
                      {renderFilterContent()}
                    </div>
                  </div>
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
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                      {paginatedProducts.map((product) => (
                        <ProductCard
                          key={product.id}
                          {...product}
                          onCardClick={() =>
                            navigate(`/product/${encodeURIComponent(product.id)}`)
                          }
                        />
                      ))}
                    </div>

                    {filteredProducts.length > pageSize && (
                      <div className="mt-6 sm:mt-8 flex flex-col items-center gap-2 sm:gap-3">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Showing{" "}
                          <span className="font-medium text-foreground">
                            {startItem.toLocaleString()}
                          </span>
                          {" – "}
                          <span className="font-medium text-foreground">
                            {endItem.toLocaleString()}
                          </span>{" "}
                          of{" "}
                          <span className="font-medium text-foreground">
                            {filteredProducts.length.toLocaleString()}
                          </span>{" "}
                          products
                        </p>

                        {totalPages > 1 && (
                          <Pagination className="mt-1">
                            <PaginationContent>
                              <PaginationItem>
                                <PaginationPrevious
                                  href="#"
                                  aria-disabled={currentPageSafe === 1}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    if (currentPageSafe > 1) {
                                      handlePageChange(currentPageSafe - 1);
                                    }
                                  }}
                                  className={currentPageSafe === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                              </PaginationItem>

                              {paginationRange.map((page, index) =>
                                page === "ellipsis" ? (
                                  <PaginationItem key={`ellipsis-${index}`}>
                                    <PaginationEllipsis />
                                  </PaginationItem>
                                ) : (
                                  <PaginationItem key={page}>
                                    <PaginationLink
                                      href="#"
                                      isActive={page === currentPageSafe}
                                      onClick={(event) => {
                                        event.preventDefault();
                                        handlePageChange(page);
                                      }}
                                    >
                                      {page}
                                    </PaginationLink>
                                  </PaginationItem>
                                )
                              )}

                              <PaginationItem>
                                <PaginationNext
                                  href="#"
                                  aria-disabled={currentPageSafe === totalPages}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    if (currentPageSafe < totalPages) {
                                      handlePageChange(currentPageSafe + 1);
                                    }
                                  }}
                                  className={
                                    currentPageSafe === totalPages ? "pointer-events-none opacity-50" : ""
                                  }
                                />
                              </PaginationItem>
                            </PaginationContent>
                          </Pagination>
                        )}
                      </div>
                    )}
                  </>
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
