import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import TestimonialCarousel from "@/components/TestimonialCarousel";
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
import { Truck, ShieldCheck, Headphones, CreditCard, Star, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import trophyImage from "@/assets/trophy-product.jpg";
import heroSliderImage from "@/assets/slider.jpg";
import headsetImage from "@/assets/headset.png";
import visitingCardImage from "@/assets/visisting card.png";
import tshirtImage from "@/assets/tshirt.png";
import trophyBackgroundImage from "@/assets/ct-trophy.png";
import officeImage from "@/assets/office-supplies.jpg";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

type ServiceCard = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
};

const Index = () => {
  // Hero slider images - showcasing all product categories
  const heroImages = [
    {
      src: headsetImage,
      alt: "Premium accessories and headsets showcase",
      objectPosition: "center"
    },
    {
      src: customMugImage,
      alt: "Personalized mugs and gifting options",
      objectPosition: "center"
    },
    {
      src: heroSliderImage,
      alt: "Signature PVK hero showcase",
      objectPosition: "center"
    },
    {
      src: visitingCardImage,
      alt: "Premium visiting card printing showcase",
      objectPosition: "center"
    },
    {
      src: tshirtImage,
      alt: "Custom apparel and T-shirt printing selection",
      objectPosition: "center"
    },
    {
      src: officeImage,
      alt: "Office Stationery & Supplies",
      objectPosition: "center"
    }
  ];

  const heroMessaging = {
    eyebrow: "Welcome to PVK Enterprises",
    heading: "Trophies & Awards",
    highlight: "Excellence",
    description:
      "We design elegant, traditional and modern trophies made from a selection of metals that clients can take their pick from.",
    primaryCta: {
      label: "Get Products",
      href: "/category"
    },
    secondaryCta: {
      label: "Contact",
      href: "/contact"
    }
  };

  type Category = {
    title: string;
    description: string;
    image: string;
    link: string;
    accent: string;
    slot: string;
    textTone: "light" | "dark";
    imagePosition?: string;
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

  const categoriesBySlot = categories.reduce<Record<string, typeof categories[number]>>((acc, category) => {
    acc[category.slot] = category;
    return acc;
  }, {});

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
    const category = categoriesBySlot[slot];
    if (!category) return null;

    const palette = getAccentPalette(category.accent);
    const cardStyle: CSSProperties = {
      "--card-primary": palette.primary,
      "--card-secondary": palette.secondary,
      "--card-ambient": palette.ambient,
      "--card-ring": palette.ring,
      "--card-text": category.textTone === "light" ? "#f8fafc" : "#0f172a"
    } as CSSProperties;

    return (
      <Link
        key={slot}
        to={category.link}
        data-slot={slot}
        aria-label={`${category.title} category`}
        className={cn(
          "category-card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70",
          category.slot === "grid3-c4" && "category-card--wedding"
        )}
        style={cardStyle}
      >
        <span className="category-card__glow" aria-hidden="true" />
        <span className="category-card__mesh" aria-hidden="true" />
        <div className="category-card__inner">
          <div className="category-card__accent-row">
            <span className="category-card__accent-dot" aria-hidden="true" />
            <span className="category-card__accent-text">{category.accent}</span>
          </div>
          <h3 className="category-card__title">{category.title}</h3>
          <p className="category-card__description">{category.description}</p>
          <div className="category-card__footer">
            <span>Explore</span>
            <span className="category-card__icon" aria-hidden="true">
              →
            </span>
          </div>
        </div>
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
            "hero-section__eyebrow font-semibold uppercase tracking-wide",
            isOverlay ? "text-sm text-white/80" : "text-xs tracking-[0.38em] text-[#5c6474] dark:text-slate-200"
          )}
        >
          {heroMessaging.eyebrow}
        </p>
        <h1
          className={cn(
            "hero-section__heading font-bold leading-tight",
            isOverlay
              ? "text-4xl sm:text-5xl lg:text-6xl text-white"
              : "text-[2.1rem] sm:text-[2.4rem] leading-snug text-[#040D1F] dark:text-white"
          )}
        >
          {heroMessaging.heading}
          <span
            className={cn(
              "block mt-2 font-semibold",
              isOverlay ? "text-white/80" : "text-[#5a6476] dark:text-slate-200/80"
            )}
          >
            {heroMessaging.highlight}
          </span>
        </h1>
        <p
          className={cn(
            "hero-section__subtext max-w-2xl",
            isOverlay
              ? "text-base sm:text-lg text-white/80"
              : "text-[0.98rem] text-[#4c5568] dark:text-slate-300 leading-relaxed"
          )}
        >
          {heroMessaging.description}
        </p>
        <div
          className={cn(
            "hero-section__buttons flex",
            isOverlay
              ? "flex-col sm:flex-row gap-4 items-stretch sm:items-center"
              : "flex-col gap-3"
          )}
        >
          <Link
            to={heroMessaging.primaryCta.href}
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
              {heroMessaging.primaryCta.label}
            </Button>
          </Link>
          <Link
            to={heroMessaging.secondaryCta.href}
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
              {heroMessaging.secondaryCta.label}
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  const products = [
    {
      id: "thermal-paper-roll",
      name: "THERMAL PAPER ROLL",
      price: 450,
      image: printerImage
    },
    {
      id: "colop-printer-38",
      name: "COLOP Printer 38 Dater Self-inking stamp",
      price: 1250,
      image: stampImage,
      discount: 10
    },
    {
      id: "sorakshi-photo-frame",
      name: "Sorakshi Quartz Photo Frame With Clock",
      price: 2800,
      image: trophyImage
    },
    {
      id: "prismajet-nova-paper",
      name: "PRISMAJET NOVA RESIN COATED GLOSSY",
      price: 3200,
      image: officeImage,
      discount: 15
    }
  ];

  const serviceCards: ServiceCard[] = [
    {
      title: "UTI PAN CARD SERVICE",
      description: "UTI Infrastructure Technology And Services Limited",
      buttonText: "Enquire Now",
      buttonLink: "/contact",
      image: panCardImage
    },
    {
      title: "JIO FIBER CONNECTION",
      description: "Fast & Reliable Broadband Network",
      buttonText: "Enquire Now",
      buttonLink: "/contact",
      image: jioFiberImage
    },
    {
      title: "PHONEPE PAYMENT BOX",
      description: "Secure & Instant Digital Payments",
      buttonText: "Enquire Now",
      buttonLink: "/about",
      image: phonePeImage
    }
  ];

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
    }
  ];

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);

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
          <HeroSlider images={heroImages} variant="background" className="h-full" />
        </div>

        <div className="hero-section__content relative z-10 container mx-auto px-4 py-16 lg:py-20 min-h-screen hidden md:flex items-center">
          <div className="hero-section__content-inner flex items-center w-full">
            <HeroMessagingBlock variant="overlay" />
          </div>
        </div>

        <div className="hero-section__mobile-card md:hidden w-full px-4 pb-12 relative z-20 flex justify-center">
          <HeroMessagingBlock variant="card" />
        </div>
      </section>

      {/* Categories Grid */}
      <section id="shop-by-category" className="pt-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20 bg-background scroll-mt-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 space-y-3 md:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold px-2">Shop by Category</h2>
            <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground px-2">
              Curated collections to help you shop faster—crafted for events, offices, studios, and on-the-go creators.
            </p>
          </div>
          <div className="category-mosaic">
            <div className="category-mosaic__column column-left">
              <div className="column-left-grid">
                {renderCategoryCard("grid1-c1")}
                {renderCategoryCard("grid1-c2")}
                {renderCategoryCard("grid1-c3")}
              </div>
            </div>
            <div className="category-mosaic__column column-center">
              <div className="column-center-grid">
                {renderCategoryCard("grid2-c1")}
                {renderCategoryCard("grid2-c2")}
              </div>
            </div>
            <div className="category-mosaic__column column-right">
              <div className="column-right-grid">
                {renderCategoryCard("grid3-c1")}
                {renderCategoryCard("grid3-c2")}
                {renderCategoryCard("grid3-c3")}
                {renderCategoryCard("grid3-c4")}
              </div>
            </div>
          </div>

          {/* Second Row - 4 New Categories */}
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            <div className="category-mosaic__row category-mosaic__row--five">
              <div className="column-five-grid">
                {renderCategoryCard("grid4-c1")}
                {renderCategoryCard("grid4-c2")}
                {renderCategoryCard("grid4-c3")}
                {renderCategoryCard("grid4-c4")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
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
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Best Seller Products</h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-2">
              There are many variations of products available
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-muted/40">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 px-2">Special Services</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Streamlining Your Digital & Business Needs with Exclusive Offerings.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 special-services-grid">
            {serviceCards.map((service, index) => (
              <div key={index} className={`bg-card rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg text-center flex flex-col items-center ${index === 2 ? 'special-services-third-card' : ''}`}>
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg sm:rounded-xl mb-4 sm:mb-5 md:mb-6 drop-shadow-md"
                    loading="lazy"
                  />
                )}
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 md:mb-6">{service.description}</p>
                <Button
                  size="lg"
                  className="enquire-button w-full text-sm sm:text-base"
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
        <DialogContent className="w-full max-w-[620px] sm:max-w-[660px] p-0 border-0 bg-transparent text-card-foreground shadow-2xl rounded-[16px] sm:rounded-[22px] max-h-[88vh] overflow-hidden">
          <div className="flex flex-col md:flex-row bg-white rounded-[16px] sm:rounded-[22px] overflow-hidden h-full">
            <div className="flex-1 md:basis-[55%] order-2 md:order-1 px-5 sm:px-7 py-5 flex flex-col gap-3 overflow-y-auto">
              <DialogHeader className="text-left space-y-1.5">
                <DialogTitle className="text-2xl md:text-[28px] font-bold tracking-tight text-slate-900 leading-tight">
                  {selectedService ? `Inquire About ${selectedService.title}` : "Call Me Back"}
                </DialogTitle>
                <DialogDescription className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Leave your details and we&apos;ll call you with the next steps.
                </DialogDescription>
              </DialogHeader>
              <form className="flex flex-col gap-2.5 pb-2" onSubmit={handleInquirySubmit}>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your full name"
                    required
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white text-slate-900 focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900/20"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    required
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white text-slate-900 focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900/20"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="h-11 w-full rounded-2xl border border-slate-200 bg-white text-slate-900 focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900/20"
                  />
                </div>
                <div className="pt-0.5">
                  <Button
                    type="submit"
                    className="w-full h-11 rounded-2xl border border-slate-900 bg-white text-slate-900 font-semibold tracking-wide hover:bg-slate-50"
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
      <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">Our Work Portfolio</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Showcasing the Quality of Our Trophies and Services
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-7xl mx-auto">
            {galleryItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className="group relative block aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-card border shadow-sm hover:shadow-xl focus-visible:ring-2 focus-visible:ring-brand-dark/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-300"
                aria-label={`View ${item.title} in products`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6 text-primary-foreground">
                  <p className="text-xs sm:text-sm font-medium opacity-90 mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold">
                    {item.title}
                  </h3>
                  <span className="mt-2 sm:mt-3 inline-flex items-center text-xs sm:text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                    Explore Product
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-10 md:mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-brand-dark/60 uppercase mb-2 sm:mb-3">
              Support
            </p>
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
                  className="border-0"
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
