import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import SectionBadge from "@/components/SectionBadge";
import ProductCard from "@/components/ProductCard";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import BlogPostCard from "@/components/BlogPostCard";
import PortfolioCard from "@/components/PortfolioCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Truck, ShieldCheck, Headphones, CreditCard, Star, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import type { CSSProperties } from "react";
import trophyImage from "@/assets/trophy-product.jpg";
import heroSliderImage from "@/assets/slider.jpg";
import mobileAccessories from "@/assets/slider-mobileaccessories.jpeg";
import visitingCardImage from "@/assets/visisting card.png";
import customPrint from "@/assets/slider-custemprinting.jpeg";
import trophyBackgroundImage from "@/assets/ct-trophy.png";
import officeImage from "@/assets/slider-office.jpeg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";
import customMugImage from "@/assets/custom mug.png";
import websiteSlide3Image from "@/assets/website slide 3 copy.jpg";
import panCardImage from "@/assets/pan-card.png";
import jioFiberImage from "@/assets/jio-fiber.png";
import phonePeImage from "@/assets/phonepe-box.png";
import ctStampImage from "@/assets/ct-stamp.jpg";
import customPrintingImage from "@/assets/ct-customprinting.png";
import officeStationeryImage from "@/assets/ct-officestatinarry.jpg";
import printerSupplyImage from "@/assets/ct-printersupply.jpg";
import mobileAccessoriesImage from "@/assets/ct-mobileaccesoris.webp";
import offsetPrintingImage from "@/assets/ct-offsetprinting.png";
import frameStudioImage from "@/assets/ct-framestudio.jpg";
import { getAllBlogPosts } from "@/data/blogPosts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCustomCategories, getCategoryOverrideMap, getAllProductsWithExtras, getCustomCategoriesWithPosition } from "@/data/productStore";
import { getActiveServices } from "@/data/serviceStore";
import { getCategoryCardContent } from "@/data/categoryCardStore";

type ServiceCard = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
};

const Index = () => {
  // Hero slides with synchronized image and text content
  const heroSlides: HeroSlide[] = [
    {
      image: heroSliderImage,
      alt: "Trophies & Awards Excellence",
      objectPosition: "center",
      title: "Trophies & Awards",
      subtitle: "Excellence",
      description: "We design elegant, traditional and modern trophies made from a selection of metals that clients can take their pick from.",
      buttonText: "Get Products",
      buttonLink: "/category?category=Trophies%20%26%20Awards"
    },
    // {
    //   image: customPrintingImage,
    //   alt: "Custom Printing Solutions",
    //   objectPosition: "center",
    //   title: "Custom Printing",
    //   subtitle: "Solutions",
    //   description: "On-demand creative prints for events and promotions. From banners to business cards, we bring your vision to life.",
    //   buttonText: "Get Products",
    //   buttonLink: "/category?category=Custom%20Printing"
    // },
    {
      image: officeImage,
      alt: "Office Stationery & Supplies",
      objectPosition: "center",
      title: "Office Stationery",
      subtitle: "Essentials",
      description: "Premium notebooks, planners, and office essentials to keep your workspace organized and professional.",
      buttonText: "Get Products",
      buttonLink: "/category?category=Office%20Stationery"
    },
    {
      image: mobileAccessories,
      alt: "Premium accessories and headsets showcase",
      objectPosition: "center",
      title: "Mobile Accessories",
      subtitle: "Premium Quality",
      description: "Modern add-ons that elevate every mobile experience. From headsets to protective cases, we have it all.",
      buttonText: "Get Products",
      buttonLink: "/category?category=Mobile%20Accessories"
    },
    {
      image: visitingCardImage,
      alt: "Premium visiting card printing showcase",
      objectPosition: "center",
      title: "Visiting Cards",
      subtitle: "Professional Printing",
      description: "Premium business cards with spot UV, foil, and textured stocks. Make a lasting first impression.",
      buttonText: "Get Products",
      buttonLink: "/category?category=visiting-card"
    },
    {
      image: customPrint,
      alt: "Custom Printing Solutions",
      objectPosition: "center",
      title: "Custom Printing",
      subtitle: "Solutions",
      description: "On-demand creative prints for events and promotions. From banners to business cards, we bring your vision to life.",
      buttonText: "Get Products",
      buttonLink: "/category?category=Custom%20Printing"
    }
  ];

  // Track current slide index for synchronized content
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Get current slide data
  const currentSlide = heroSlides[currentSlideIndex] || heroSlides[0];

  type Category = {
    title: string;
    description: string;
    image: string;
    link: string;
    accent: string;
    slot: string;
    textTone: "light" | "dark";
    imagePosition?: string;
    originalTitle?: string;
  };

  const categories: Category[] = [
    {
      title: "Trophies & Awards",
      description: "Hand-polished accolades and signature centerpieces.",
      image: trophyBackgroundImage,
      link: "/category?category=Trophies%20%26%20Awards",
      accent: "Awards",
      slot: "grid1-c1",
      textTone: "light"
    },
    {
      title: "Office Stationery",
      description: "Premium notebooks, planners, and office essentials.",
      image: officeStationeryImage,
      link: "/category?category=Office%20Stationery",
      accent: "Workspace",
      slot: "grid2-c1",
      textTone: "dark"
    },
    {
      title: "Custom Rubber Stamps",
      description: "Precisely crafted business and official stamps.",
      link: "/category?category=Custom%20Rubber%20Stamps",
      accent: "Branding",
      image: ctStampImage,
      slot: "grid1-c2",
      textTone: "dark"
    },
    {
      title: "Printer Supplies",
      description: "Everything you need for seamless printing operations.",
      image: printerSupplyImage,
      link: "/category?category=Printer%20Supplies",
      accent: "Productivity",
      slot: "grid2-c2",
      textTone: "dark"
    },
    {
      title: "Mobile Accessories",
      description: "Modern add-ons that elevate every mobile experience.",
      image: mobileAccessoriesImage,
      link: "/category?category=Mobile%20Accessories",
      accent: "Tech",
      slot: "grid3-c1",
      textTone: "light"
    },
    {
      title: "Frame Studio",
      description: "Props, pedestals, and showcases for product displays.",
      image: frameStudioImage,
      link: "/category?category=Frame%20Studio",
      accent: "Display",
      slot: "grid3-c3",
      textTone: "dark",
      imagePosition: "top center"
    },
    {
      title: "Custom Printing",
      description: "On-demand creative prints for events and promotions.",
      image: customPrintingImage,
      link: "/category?category=Custom%20Printing",
      accent: "Custom",
      slot: "grid1-c3",
      textTone: "light"
    },
    {
      title: "Offset Printing",
      description: "High-volume offset runs with precise color fidelity.",
      image: offsetPrintingImage,
      link: "/category?category=Offset%20Printing",
      accent: "Offset",
      slot: "grid3-c2",
      textTone: "dark"
    },
    {
      title: "Wedding Cards",
      description: "Luxurious invitation suites tailored for receptions and ceremonies.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      link: "/category?category=wedding-card",
      accent: "Celebrations",
      slot: "grid3-c4",
      textTone: "light"
    },
    {
      title: "Customized Notebook",
      description: "Branded notebooks and journals with bespoke finishing.",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      link: "/category?category=customized-notebook",
      accent: "Corporate",
      slot: "grid4-c1",
      textTone: "dark"
    },
    {
      title: "Student ID",
      description: "Durable PVC & RFID ID cards for schools and colleges.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80",
      link: "/category?category=student-id",
      accent: "Campus",
      slot: "grid4-c2",
      textTone: "light"
    },
    {
      title: "Visiting Card",
      description: "Premium business cards with spot UV, foil, and textured stocks.",
      image: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&w=900&q=80",
      link: "/category?category=visiting-card",
      accent: "Branding",
      slot: "grid4-c3",
      textTone: "dark"
    },
    {
      title: "Notice Printing",
      description: "Bold notice boards, posters, and announcements printed fast.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
      link: "/category?category=notice-printing",
      accent: "Display",
      slot: "grid4-c4",
      textTone: "light"
    }
  ];

  // Get custom categories sorted by position (already sorted in getCustomCategories)
  const [categoryUpdateTrigger, setCategoryUpdateTrigger] = useState(0);
  const customCategories = useMemo(() => getCustomCategories(), [categoryUpdateTrigger]);
  const categoryOverrides = useMemo(() => getCategoryOverrideMap(), [categoryUpdateTrigger]);
  const [cardContentUpdateTrigger, setCardContentUpdateTrigger] = useState(0);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

  // Listen for category updates (positions, overrides, etc.)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "pvk-custom-categories" ||
        e.key === "pvk-category-overrides"
      ) {
        setCategoryUpdateTrigger((prev) => prev + 1);
      }
    };

    const handleCustomEvent = () => {
      setCategoryUpdateTrigger((prev) => prev + 1);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("categoryCardContentUpdated", handleCustomEvent);
    window.addEventListener("customCategoriesUpdated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("categoryCardContentUpdated", handleCustomEvent);
      window.removeEventListener("customCategoriesUpdated", handleCustomEvent);
    };
  }, []);

  // Listen for category card content updates
  useEffect(() => {
    const handleContentUpdate = () => {
      setCardContentUpdateTrigger((prev) => prev + 1);
    };

    window.addEventListener("categoryCardContentUpdated", handleContentUpdate);
    return () => {
      window.removeEventListener("categoryCardContentUpdated", handleContentUpdate);
    };
  }, []);

  const categoriesBySlot = categories.reduce<Record<string, typeof categories[number]>>((acc, category) => {
    acc[category.slot] = category;
    return acc;
  }, {});

  // Apply default category overrides (rename / hide) to the category mosaic
  const overriddenCategoriesBySlot = useMemo(() => {
    const overrides = categoryOverrides;

    const byTitle = new Map<string, typeof categories[number]>();
    categories.forEach((cat) => {
      byTitle.set(cat.title, cat);
    });

    const result: Record<string, typeof categories[number]> = {};

    Object.values(categoriesBySlot).forEach((cat) => {
      const override = overrides[cat.title];
      if (override?.hidden) {
        return;
      }

      const effectiveTitle = override?.name ?? cat.title;
      const base = byTitle.get(cat.title) ?? cat;

      result[cat.slot] = {
        ...base,
        title: effectiveTitle,
        // Preserve the original key so admin edits (stored by base name) map correctly
        originalTitle: cat.title,
        // Keep the original category query parameter so existing products still match
      };
    });

    return result;
  }, [categoriesBySlot, categoryOverrides, categories]);

  const accentPalette: Record<
    string,
    { primary: string; secondary: string; ambient: string; ring: string }
  > = {
    awards: {
      primary: "#a78bfa",
      secondary: "#f472b6",
      ambient: "rgba(167, 139, 250, 0.22)",
      ring: "rgba(167, 139, 250, 0.45)"
    },
    workspace: {
      primary: "#34d399",
      secondary: "#2dd4bf",
      ambient: "rgba(45, 212, 191, 0.18)",
      ring: "rgba(45, 212, 191, 0.45)"
    },
    branding: {
      primary: "#fb7185",
      secondary: "#fbbf24",
      ambient: "rgba(251, 113, 133, 0.2)",
      ring: "rgba(251, 113, 133, 0.45)"
    },
    productivity: {
      primary: "#60a5fa",
      secondary: "#a5b4fc",
      ambient: "rgba(96, 165, 250, 0.2)",
      ring: "rgba(96, 165, 250, 0.45)"
    },
    tech: {
      primary: "#38bdf8",
      secondary: "#22d3ee",
      ambient: "rgba(56, 189, 248, 0.2)",
      ring: "rgba(56, 189, 248, 0.45)"
    },
    custom: {
      primary: "#f472b6",
      secondary: "#f87171",
      ambient: "rgba(244, 114, 182, 0.22)",
      ring: "rgba(244, 114, 182, 0.45)"
    },
    offset: {
      primary: "#facc15",
      secondary: "#fb923c",
      ambient: "rgba(250, 204, 21, 0.2)",
      ring: "rgba(250, 204, 21, 0.45)"
    },
    display: {
      primary: "#c084fc",
      secondary: "#fda4af",
      ambient: "rgba(192, 132, 252, 0.2)",
      ring: "rgba(192, 132, 252, 0.45)"
    },
    celebrations: {
      primary: "#fb7185",
      secondary: "#f472b6",
      ambient: "rgba(244, 114, 182, 0.2)",
      ring: "rgba(244, 114, 182, 0.45)"
    },
    corporate: {
      primary: "#818cf8",
      secondary: "#38bdf8",
      ambient: "rgba(129, 140, 248, 0.2)",
      ring: "rgba(129, 140, 248, 0.45)"
    },
    campus: {
      primary: "#4ade80",
      secondary: "#34d399",
      ambient: "rgba(74, 222, 128, 0.2)",
      ring: "rgba(74, 222, 128, 0.45)"
    },
    default: {
      primary: "#93c5fd",
      secondary: "#c4b5fd",
      ambient: "rgba(147, 197, 253, 0.18)",
      ring: "rgba(147, 197, 253, 0.4)"
    }
  };

  const getAccentPalette = (accent: string) => {
    const key = accent.toLowerCase();
    return accentPalette[key] ?? accentPalette.default;
  };

  const renderCategoryCard = (slot: string) => {
    const category = overriddenCategoriesBySlot[slot];
    if (!category) return null;

    // Get custom card content from store (trigger re-render on updates)
    const contentKey = (category as any).originalTitle || category.title;
    const cardContent = getCategoryCardContent(contentKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _ = cardContentUpdateTrigger; // Force re-render when content updates

    // Use custom content if available, otherwise use defaults
    const displayTitle = cardContent?.cardTitle || category.title;
    // Use admin-provided text only; no default label/description fallback
    const displayDescription = cardContent?.cardDescription || "";
    const displayAccent = cardContent?.topLabel || "";
    const badgeValue = cardContent?.badgeValue;

    const palette = getAccentPalette(category.accent);
    const backgroundImage =
      cardContent?.categoryImageURL ??
      cardContent?.backgroundImage ??
      undefined;
    const backgroundPosition =
      cardContent?.categoryImageURL || cardContent?.backgroundImage
        ? "center"
        : category.imagePosition ?? "center";

    // Create gradient from palette colors
    const gradient = `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`;

    return (
      <Link
        key={slot}
        to={category.link}
        data-slot={slot}
        aria-label={`${displayTitle} category`}
        className={cn(
          "group relative overflow-hidden rounded-2xl sm:rounded-3xl",
          "min-h-[200px] sm:min-h-[220px] md:min-h-[240px]",
          "flex flex-col justify-between p-5 sm:p-6",
          "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70"
        )}
        style={{
          background: backgroundImage
            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.55) 100%), url(${backgroundImage})`
            : cardContent?.backgroundColor || gradient,
          backgroundSize: backgroundImage ? "cover" : undefined,
          backgroundPosition: backgroundImage ? backgroundPosition : undefined,
          backgroundRepeat: backgroundImage ? "no-repeat" : undefined,
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between text-white">
          {/* Top Section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-white/60 rounded-full" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-white/90">
                {displayAccent || badgeValue || "CATEGORY"}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              {displayTitle}
            </h3>

            {/* Description */}
            {displayDescription && (
              <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
                {displayDescription}
              </p>
            )}
          </div>

          {/* Bottom Section - EXPLORE */}
          <div className="mt-6 sm:mt-8 flex items-center justify-between">
            <span className="text-xs sm:text-sm uppercase tracking-[0.15em] font-semibold text-white underline decoration-white/60 underline-offset-4 group-hover:decoration-white transition-all">
              EXPLORE
            </span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/60 group-hover:scale-110">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Product Image Overlay (if provided) */}
        {backgroundImage && (
          <div className="absolute inset-0 z-0 opacity-30 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none">
            <img
              src={backgroundImage}
              alt={displayTitle}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </Link>
    );
  };

  const HeroMessagingBlock = ({ variant }: { variant: "overlay" | "card" }) => {
    const isOverlay = variant === "overlay";

    return (
      <div
        className={cn(
          "space-y-6",
          isOverlay
            ? "hero-section__text hidden md:block w-full max-w-2xl lg:max-w-xl text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)]"
            : "hero-mobile-card__inner w-full text-center text-[#040D1F] dark:text-white"
        )}
      >
        <p
          className={cn(
            "hero-section__eyebrow font-semibold uppercase tracking-wide transition-opacity duration-500",
            isOverlay ? "text-sm text-white/80" : "text-xs tracking-[0.38em] text-[#5c6474] dark:text-slate-200"
          )}
        >
          Welcome to PVK Enterprises
        </p>
        <h1
          className={cn(
            "hero-section__heading font-bold leading-tight transition-opacity duration-500",
            isOverlay
              ? "text-4xl sm:text-5xl lg:text-6xl text-white"
              : "text-[2.1rem] sm:text-[2.4rem] leading-snug text-[#040D1F] dark:text-white"
          )}
        >
          {currentSlide.title || "Trophies & Awards"}
          {currentSlide.subtitle && (
            <span
              className={cn(
                "block mt-2 font-semibold transition-opacity duration-500",
                isOverlay ? "text-white/80" : "text-[#5a6476] dark:text-slate-200/80"
              )}
            >
              {currentSlide.subtitle}
            </span>
          )}
        </h1>
        <p
          className={cn(
            "hero-section__subtext max-w-2xl transition-opacity duration-500",
            isOverlay
              ? "text-base sm:text-lg text-white/80"
              : "text-[0.98rem] text-[#4c5568] dark:text-slate-300 leading-relaxed"
          )}
        >
          {currentSlide.description || "We design elegant, traditional and modern trophies made from a selection of metals that clients can take their pick from."}
        </p>
        <div
          className={cn(
            "hero-section__buttons flex transition-opacity duration-500",
            isOverlay
              ? "flex-col sm:flex-row gap-4 items-stretch sm:items-center"
              : "flex-col gap-3"
          )}
        >
          <Link
            to={currentSlide.buttonLink || "/category"}
            className={cn("w-full", isOverlay ? "sm:w-auto" : undefined)}
          >
            <Button
              size="lg"
              variant={isOverlay ? "outline" : "default"}
              className={cn(
                "w-full transition-colors rounded-[16px] text-base font-semibold h-12",
                isOverlay
                  ? "sm:w-auto hover:bg-[#111827] hover:border-[#111827] hover:text-white"
                  : "bg-[#040D1F] text-white shadow-[0_15px_45px_rgba(4,13,31,0.25)] hover:bg-[#040D1F]/90 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90"
              )}
              style={isOverlay ? undefined : { borderColor: "#040D1F" }}
            >
              {currentSlide.buttonText || "Get Products"}
            </Button>
          </Link>
          <Link
            to="/contact"
            className={cn("w-full", isOverlay ? "sm:w-auto" : undefined)}
          >
            <Button
              size="lg"
              variant={isOverlay ? "default" : "outline"}
              className={cn(
                "w-full rounded-[16px] text-base font-semibold h-12",
                isOverlay
                  ? "sm:w-auto text-white hover:opacity-90"
                  : "border-[#1f2937]/20 text-[#040D1F] hover:bg-[#040D1F] hover:text-white dark:border-white/40 dark:text-white dark:hover:bg-white/10"
              )}
              style={isOverlay ? { backgroundColor: "#111827" } : undefined}
            >
              Contact
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  // Get products from admin dashboard (includes base products + admin-added products)
  // Show first 8 products as featured/best sellers
  const [productsUpdateTrigger, setProductsUpdateTrigger] = useState(0);
  const products = useMemo(() => {
    const allProducts = getAllProductsWithExtras();
    // Map to format expected by ProductCard component
    return allProducts.slice(0, 8).map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.imageGallery?.[0] || printerImage,
      tax: product.tax,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsUpdateTrigger]);

  // Listen for product updates from admin
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "pvk-admin-extra-products" ||
        e.key === "pvk-admin-hidden-products" ||
        e.key === "pvk-admin-deleted-products"
      ) {
        setProductsUpdateTrigger((prev) => prev + 1);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Load services dynamically from serviceStore (only Active services)
  const [serviceCards, setServiceCards] = useState<ServiceCard[]>([]);

  const loadServiceCards = () => {
    // Get active services from the store and convert to ServiceCard format
    const activeServices = getActiveServices();
    const cards: ServiceCard[] = activeServices.map((service) => ({
      title: service.title,
      description: service.description,
      buttonText: "Enquire Now",
      buttonLink: "/contact",
      image: service.imageURL,
    }));
    setServiceCards(cards);
  };

  useEffect(() => {
    loadServiceCards();

    // Listen for storage changes (when admin updates services)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "pvk-special-services-store") {
        loadServiceCards();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom event (for same-tab updates)
    const handleCustomStorage = () => {
      loadServiceCards();
    };

    window.addEventListener("servicesUpdated", handleCustomStorage);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("servicesUpdated", handleCustomStorage);
    };
  }, []);

  const testimonials = [
    {
      name: "Deepak Rao",
      rating: 5,
      text: "Have been doing business with them for a while now. Never been disappointed.",
      date: "2 months ago",
      title: "Business Owner",
      company: "Rao Enterprises"
    },
    {
      name: "Venkat Shetty",
      rating: 5,
      text: "We bought trophies from here for my office events. Exceptional quality.",
      date: "3 months ago",
      title: "HR Manager",
      company: "TechCorp Solutions"
    },
    {
      name: "Priya Kumar",
      rating: 5,
      text: "Excellent service and beautiful trophies. The team was very helpful in customizing our awards.",
      date: "1 month ago",
      title: "Event Coordinator",
      company: "Kumar Events"
    },
    {
      name: "Rajesh Nair",
      rating: 5,
      text: "Best trophy shop in Malappuram. Quality products at reasonable prices. Highly recommended!",
      date: "4 months ago",
      title: "Founder",
      company: "Nair Sports Academy"
    },
    {
      name: "Anjali Menon",
      rating: 5,
      text: "Professional service and stunning designs. They delivered exactly what we needed for our college event.",
      date: "2 months ago",
      title: "Principal",
      company: "St. Mary's College"
    },
    {
      name: "Mohammed Ali",
      rating: 5,
      text: "Great experience! The staff is knowledgeable and helped us choose the perfect awards for our sports meet.",
      date: "1 month ago",
      title: "Sports Director",
      company: "City Sports Club"
    }
  ];

  const galleryItems = [
    { image: trophyImage, title: "Gold Trophy", category: "Trophies & Awards", href: "/category?t=trophies" },
    { image: officeImage, title: "Office Supplies", category: "Stationery", href: "/category?t=stationery" },
    { image: stampImage, title: "Custom Stamps", category: "Printing Services", href: "/category?t=stamps" },
    { image: printerImage, title: "Printer Equipment", category: "Technology", href: "/category?t=printing" },
    { image: mobileImage, title: "Mobile Accessories", category: "Accessories", href: "/category?t=mobiles" },
    { image: trophyImage, title: "Silver Trophy", category: "Trophies & Awards", href: "/category?t=awards" },
    { image: officeImage, title: "Premium Notebooks", category: "Stationery", href: "/category?t=stationery" },
    { image: stampImage, title: "Business Stamps", category: "Printing Services", href: "/category?t=stamps" },
    { image: printerImage, title: "Ink Cartridges", category: "Technology", href: "/category?t=printing" }
  ];

  const faqs = [
    {
      question: "Do you offer custom trophy design services?",
      answer:
        "Yes. Our design studio collaborates with you to craft bespoke trophies, medals, and plaques tailored to your brand, event, and budget."
    },
    {
      question: "What materials do you use for your awards?",
      answer:
        "We work with premium brass, crystal, acrylic, wooden bases, and plated metals. Each order is matched with the material that best suits the finish and durability you need."
    },
    {
      question: "What is the typical lead time for an order?",
      answer:
        "Standard production takes 7-10 business days. Rush fulfillment is available for urgent events, subject to design complexity and inventory."
    },
    {
      question: "Can you engrave names or logos on the trophies?",
      answer:
        "Absolutely. We provide laser engraving and full-color UV printing for names, award titles, and brand marks with precise alignment."
    },
    {
      question: "Do you ship trophies across India?",
      answer:
        "We safely pack and dispatch nationwide via insured courier partners. Local pickup is also available from our Malappuram studio."
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, credit/debit cards, UPI, bank transfers, and other digital payment methods. Payment terms may vary based on order size and delivery timeline."
    },
    {
      question: "Do you provide bulk order discounts?",
      answer:
        "Yes. We offer competitive pricing for bulk orders. Contact our sales team with your quantity requirements for a customized quote and special pricing."
    },
    {
      question: "Can you customize visiting cards and wedding invitations?",
      answer:
        "Absolutely. We specialize in premium visiting cards with spot UV, foil stamping, and textured finishes. We also design and print luxurious wedding invitation suites tailored to your celebration theme."
    },
    {
      question: "What printing services do you offer?",
      answer:
        "We provide offset printing for high-volume runs, custom printing for events and promotions, notice printing for announcements, and specialized services like rubber stamps and branded stationery."
    },
    {
      question: "Do you offer PAN card and Jio Fiber services?",
      answer:
        "Yes. We are authorized service providers for UTI PAN card applications and Jio Fiber connections. Visit our studio or contact us to avail these services with expert guidance."
    },
    {
      question: "What is your return or refund policy?",
      answer:
        "We stand behind the quality of our products. If you receive a damaged or defective item, contact us within 3 days of delivery. Custom-made items may have different policies, which we'll discuss at the time of order."
    },
    {
      question: "Can you help with corporate gifting solutions?",
      answer:
        "Yes. We design complete corporate gifting packages including customized trophies, branded notebooks, office stationery sets, and premium accessories. We work with businesses to create meaningful gifts that reflect their brand values."
    }
  ];

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  // Latest blog posts for homepage (limit 3)
  const latestBlogPosts = useMemo(() => {
    const posts = getAllBlogPosts().slice(); // copy
    posts.sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      return bDate - aDate;
    });
    return posts.slice(0, 3);
  }, []);

  const handleOpenInquiry = (service: ServiceCard) => {
    setSelectedService(service);
    setIsInquiryOpen(true);
  };

  const handleInquirySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.table({ ...payload, service: selectedService?.title });
    event.currentTarget.reset();
    setIsInquiryOpen(false);
    setSelectedService(null);
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setIsInquiryOpen(false);
      setSelectedService(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden min-h-screen pb-0">
        <div className="hero-section__slider">
          <HeroSlider
            slides={heroSlides}
            variant="background"
            className="h-full"
            onSlideChange={setCurrentSlideIndex}
          />
        </div>

        <div className="hero-section__content relative z-10 container mx-auto px-4 py-16 lg:py-20 min-h-screen hidden md:flex items-center">
          <div className="hero-section__content-inner flex items-center w-full">
            <HeroMessagingBlock key={currentSlideIndex} variant="overlay" />
          </div>
        </div>

        <div className="hero-section__mobile-card md:hidden w-full px-4 pb-12 relative z-20 flex justify-center">
          <HeroMessagingBlock key={currentSlideIndex} variant="card" />
        </div>
      </section>

      {/* Categories Grid */}
      <section id="shop-by-category" className="pt-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-white dark:bg-slate-900 scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 space-y-3 md:space-y-4">
            <SectionBadge label="Collections" className="mx-auto" />
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-2 text-foreground dark:text-slate-100">Shop by Category</h2>
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground dark:text-slate-300 px-2">
              Curated collections to help you shop faster—crafted for events, offices, studios, and on-the-go creators.
            </p>
          </div>

          {/* Desktop Category Cards - Hidden on Mobile */}
          <div className="hidden md:grid category-mosaic">
            {/* Row 1 */}
            {renderCategoryCard("grid1-c1")}
            {renderCategoryCard("grid1-c2")}
            {renderCategoryCard("grid1-c3")}

            {/* Row 2 */}
            {renderCategoryCard("grid2-c1")}
            {renderCategoryCard("grid2-c2")}

            {/* Row 3 - First Item (completes the 2nd row on desktop 3-col grid) */}
            {renderCategoryCard("grid3-c1")}

            {/* Hidden items - Shown on clicking "Show More" */}
            {isCategoryExpanded && (
              <>
                {renderCategoryCard("grid3-c2")}
                {renderCategoryCard("grid3-c3")}
                {renderCategoryCard("grid3-c4")}

                {/* Row 4 */}
                {renderCategoryCard("grid4-c1")}
                {renderCategoryCard("grid4-c2")}
                {renderCategoryCard("grid4-c3")}
                {renderCategoryCard("grid4-c4")}
              </>
            )}
          </div>

          <div className="hidden md:flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
              className="min-w-[200px] gap-2 rounded-full border-slate-200 hover:bg-slate-50 hover:text-primary transition-all duration-300"
            >
              {isCategoryExpanded ? "Show Less" : "Show All Products"}
              {isCategoryExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Custom categories created from admin - same card style, simple grid */}
          {customCategories.length > 0 && (
            <div className="mt-8 sm:mt-10 md:mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 custom-categories-grid">
                {customCategories.map((name) => {
                  // Get custom card content for this category
                  const cardContent = getCategoryCardContent(name);
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  const _ = cardContentUpdateTrigger; // Force re-render when content updates

                  // Use custom content if available, otherwise use defaults
                  const displayTitle = cardContent?.cardTitle || name;
                  // Use admin-provided text only; no default label/description fallback
                  const displayDescription = cardContent?.cardDescription || "";
                  const displayAccent = cardContent?.topLabel || "";
                  const badgeValue = cardContent?.badgeValue;

                  const palette = getAccentPalette("custom");
                  const cardStyle: CSSProperties = {
                    "--card-primary": palette.primary,
                    "--card-secondary": palette.secondary,
                    "--card-ambient": palette.ambient,
                    "--card-ring": palette.ring,
                    "--card-text": "#f8fafc",
                    ...((cardContent?.categoryImageURL || cardContent?.backgroundImage) && {
                      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.55) 100%), url(${cardContent.categoryImageURL || cardContent.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }),
                  } as CSSProperties;

                  return (
                    <Link
                      key={name}
                      to={`/category?category=${encodeURIComponent(name)}`}
                      aria-label={`${displayTitle} category`}
                      className={cn(
                        "category-card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70"
                      )}
                      style={cardStyle}
                    >
                      <span className="category-card__glow" aria-hidden="true" />
                      <span className="category-card__mesh" aria-hidden="true" />
                      <div className="category-card__inner">
                        <div className="category-card__accent-row">
                          <span className="category-card__accent-dot" aria-hidden="true" />
                          <span className="category-card__accent-text">{displayAccent}</span>
                          {badgeValue && (
                            <span className="category-card__badge-value ml-2 text-xs font-semibold opacity-80">
                              {badgeValue}
                            </span>
                          )}
                        </div>
                        <h3 className="category-card__title">{displayTitle}</h3>
                        <p className="category-card__description">{displayDescription}</p>
                        <div className="category-card__footer">
                          <span>EXPLORE</span>
                          <span className="category-card__icon" aria-hidden="true" role="presentation">
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 12L10 8L6 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-10 space-y-3">
            <SectionBadge label="Service Pillars" className="mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-bold text-card-foreground">Experience the PVK Advantage</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Seamless logistics, trusted quality, and dedicated guidance with every order.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            <FeatureCard
              icon={Truck}
              title="Free Shipping"
              description="Fast shipping on all orders"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Money Guarantee"
              description="30 Day Money Back"
            />
            <FeatureCard
              icon={Headphones}
              title="Online Support 24/7"
              description="Technical support 24/7"
            />
            <FeatureCard
              icon={CreditCard}
              title="Secure Payment"
              description="All cards accepted"
            />
          </div>
        </div>
      </section>


      {/* Promotional Banner */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden w-full">
            <img
              src={websiteSlide3Image}
              alt="Special Offer - Final Sale"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Best Seller Products */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-3">
            <SectionBadge label="Top Rated" className="mx-auto" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Best Seller Products</h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-2">
              There are many variations of products available
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3 sm:gap-5 md:gap-6 justify-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-muted/40">
        <div className="container mx-auto px-3 sm:px-4 md:px-5 lg:px-6">
          <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-3">
            <SectionBadge label="Special Services" className="mx-auto" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 px-2">Special Services</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Streamlining Your Digital & Business Needs with Exclusive Offerings.
            </p>
          </div>
          <div className="special-services-grid services-list-container">
            {serviceCards.map((service, index) => (
              <div
                key={index}
                className={cn(
                  "service-card bg-card rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg flex flex-col items-center text-center gap-4 sm:gap-5 md:gap-6 h-full",
                  index === 2 && "special-services-third-card"
                )}
              >
                {service.image && (
                  <div className="w-full h-36 sm:h-40 md:h-44 lg:h-48 rounded-lg sm:rounded-xl overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover drop-shadow-md"
                      loading="lazy"
                    />
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-bold">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground flex-1">{service.description}</p>
                <Button
                  size="lg"
                  className="enquire-button mt-auto w-full text-sm sm:text-base"
                  onClick={() => handleOpenInquiry(service)}
                >
                  {service.buttonText}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isInquiryOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="inquiry-dialog-content text-card-foreground">
          <div className="inquiry-dialog-shell">
            <div className="inquiry-dialog-form flex-1 md:basis-[50%] order-2 md:order-1 flex flex-col gap-2 md:gap-3 max-w-full">
              <DialogHeader className="text-left space-y-1">
                <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                  {selectedService ? `Inquire About ${selectedService.title}` : "Call Me Back"}
                </DialogTitle>
                <DialogDescription className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  Leave your details and we&apos;ll call you with the next steps.
                </DialogDescription>
              </DialogHeader>
              <form className="flex flex-col gap-2 pb-1" onSubmit={handleInquirySubmit}>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="fullName" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900/20"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="phone" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900/20"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus-visible:border-slate-900 focus-visible:ring-1 focus-visible:ring-slate-900/20"
                  />
                </div>
                <div className="pt-1">
                  <Button
                    type="submit"
                    className="w-full h-10 rounded-xl border border-slate-900 bg-slate-900 text-white font-semibold tracking-wide hover:bg-slate-800 shadow-lg shadow-slate-900/10 transition-all hover:scale-[1.01]"
                  >
                    Submit Inquiry
                  </Button>
                </div>
              </form>
            </div>

            <div className="hidden md:flex relative flex-1 md:basis-[45%] order-1 md:order-2 overflow-hidden bg-slate-900 items-center justify-center">
              <img
                src={trophyImage}
                alt="PVK Enterprises services"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-black/70" />
              <div
                className="absolute inset-y-0 left-0 w-36 pointer-events-none bg-white/95"
                style={{
                  clipPath: "ellipse(65% 85% at 0% 50%)"
                }}
              />
              <div className="absolute top-8 right-10 text-right text-white space-y-2">
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">PVK Enterprises</p>
                <p className="text-2xl font-semibold">Signature Services</p>
              </div>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white space-y-2 px-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">Specialist Support</p>
                <p className="text-sm text-white/85">Trophies • Digital Services • Business Solutions</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Testimonials Section */}
      <TestimonialCarousel
        testimonials={testimonials}
        title="Stories of Success"
        subtitle="Trusted by our clients - hear what they say about PVK Enterprises and our services."
      />

      {/* Our Work Portfolio Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#F5F7FB] via-white to-[#EDF1F7] dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-brand-dark/10 dark:bg-brand-dark/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-brand-dark/5 dark:bg-brand-dark/10 blur-3xl" aria-hidden="true" />
        <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-10 sm:mb-12 md:mb-14 space-y-4">
            <SectionBadge label="Featured Showcase" className="mx-auto" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#040D1F] dark:text-slate-100 mb-4">
              Our Work Portfolio
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground dark:text-slate-300 max-w-3xl mx-auto">
              A curated look at the craftsmanship, detailing, and finishing quality across our trophies, printing solutions, and premium accessories.
            </p>
          </div>
          <div className="grid max-w-6xl mx-auto gap-6 sm:gap-7 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 home-portfolio-grid">
            {galleryItems.map((item, index) => (
              <PortfolioCard
                key={item.title}
                index={index}
                title={item.title}
                category={item.category}
                image={item.image}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-10 md:mb-12 space-y-4">
            <SectionBadge label="Support" className="mx-auto" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
              Get quick answers about our custom trophy manufacturing, delivery, and finishing services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-background rounded-2xl sm:rounded-3xl shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
            <Accordion type="single" collapsible className="divide-y divide-border">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className={cn(
                    "border-0",
                    !showAllFaqs && index >= 6 && "hidden-faq-item"
                  )}
                >
                  <AccordionTrigger className="px-4 sm:px-5 md:px-6 text-left text-sm sm:text-base md:text-lg font-semibold text-card-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-5 md:px-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {faqs.length > 6 && (
              <div className="flex justify-center py-4 sm:py-5 md:py-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="show-more-btn flex items-center gap-2 text-sm sm:text-base font-semibold text-card-foreground hover:text-primary transition-colors"
                >
                  {showAllFaqs ? (
                    <>
                      Show Less
                      <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  ) : (
                    <>
                      Explore More
                      <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Blog & News */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-10 md:mb-12 space-y-3">
            <SectionBadge label="Blog & News" className="mx-auto" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              From the PVK Blog
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Fresh stories, tips, and ideas from our trophy, printing, and office solutions teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 home-blog-grid">
            {latestBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-8 sm:mt-10 flex justify-center">
            <Link to="/blog">
              <Button className="rounded-full px-6 sm:px-8 h-10 sm:h-11 text-sm sm:text-base">
                View all Blog & News
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;