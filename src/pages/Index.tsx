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
import { Truck, ShieldCheck, Headphones, CreditCard, Star } from "lucide-react";
import trophyImage from "@/assets/trophy-product.jpg";
import heroShowcaseImage from "@/assets/slide 1.jpg";
import trophyBackgroundImage from "@/assets/ct-trophy.png";
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";
import saleBg from "@/assets/sale-banner-bg.jpg";
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
      src: heroShowcaseImage,
      alt: "PVK Enterprises premium showcase"
    },
    {
      src: mobileImage,
      alt: "Mobile Accessories Collection"
    },
    {
      src: stampImage,
      alt: "Custom Stamps & Printing Services"
    },
    {
      src: printerImage,
      alt: "Printer Supplies & Equipment"
    },
    {
      src: officeImage,
      alt: "Office Stationery & Supplies"
    }
  ];

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
    }
  ];

  const categoriesBySlot = categories.reduce<Record<string, typeof categories[number]>>((acc, category) => {
    acc[category.slot] = category;
    return acc;
  }, {});

  const renderCategoryCard = (slot: string) => {
    const category = categoriesBySlot[slot];
    if (!category) return null;

    const isDarkText = category.textTone === "dark";
    const accentColorClass = "text-white/85";
    const titleColorClass = "text-white";
    const descriptionColorClass = "text-white/90";
    return (
      <Link
        key={slot}
        to={category.link}
        data-slot={slot}
        className={`category-card block cursor-pointer transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl ${
          isDarkText ? "category-card--dark" : "category-card--light"
        }`}
      >
        <div
          className="category-card__image"
          style={{
            backgroundImage: `url(${category.image})`,
            backgroundPosition: category.imagePosition || "center center",
          }}
        />
        <div className="relative z-10 flex flex-col gap-2.5 h-full">
          <div className="space-y-0.5">
          <span
            className={`inline-flex items-center text-[8px] uppercase tracking-[0.32em] relative z-10 ${accentColorClass}`}
          >
              {category.accent}
            </span>
            <h3 className={`text-base font-semibold leading-tight relative z-10 ${titleColorClass}`}>
              {category.title}
            </h3>
          </div>
          <p className={`text-[11px] flex-1 leading-snug relative z-10 ${descriptionColorClass}`}>
            {category.description}
          </p>
          <span
            className={`mt-auto inline-flex w-fit rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide shadow-md relative z-10 ${
              isDarkText
                ? "bg-white/90 text-slate-900 border border-white/60"
                : "bg-black/35 text-white border border-white/30"
            }`}
            aria-hidden="true"
          >
            View Products
          </span>
        </div>
      </Link>
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
    { image: trophyImage, title: "Gold Trophy", category: "Trophies & Awards" },
    { image: officeImage, title: "Office Supplies", category: "Stationery" },
    { image: stampImage, title: "Custom Stamps", category: "Printing Services" },
    { image: printerImage, title: "Printer Equipment", category: "Technology" },
    { image: mobileImage, title: "Mobile Accessories", category: "Accessories" },
    { image: trophyImage, title: "Silver Trophy", category: "Trophies & Awards" },
    { image: officeImage, title: "Premium Notebooks", category: "Stationery" },
    { image: stampImage, title: "Business Stamps", category: "Printing Services" },
    { image: printerImage, title: "Ink Cartridges", category: "Technology" }
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
      <section className="relative overflow-hidden min-h-screen mt-0 pb-24">
        <div className="absolute inset-0 h-full">
          <HeroSlider images={heroImages} variant="background" className="h-full" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20 min-h-screen flex items-center">
          <div className="flex items-center w-full">
            <div className="w-full max-w-2xl lg:max-w-xl space-y-6 text-white drop-shadow-[0_15px_35px_rgba(0,0,0,0.45)]">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Welcome to PVK Enterprises
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Trophies & Awards
                <span className="block text-white/80 mt-2">Excellence</span>
              </h1>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl">
                We design elegant, traditional and modern trophies made from a selection of metals that clients can take their pick from.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <Link to="/category" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full sm:w-auto hover:bg-[#111827] hover:border-[#111827] hover:text-white transition-colors"
                  >
                    Get Products
                  </Button>
                </Link>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button 
                    size="lg" 
                    className="w-full sm:w-auto text-white hover:opacity-90"
                    style={{ backgroundColor: '#111827' }}
                  >
                    Contact
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="shop-by-category" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4" style={{ paddingLeft: "70px", paddingRight: "70px" }}>
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="text-lg text-muted-foreground">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Sale Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div
            className="relative rounded-3xl overflow-hidden bg-accent p-12 lg:p-20"
            style={{
              backgroundImage: `url(${saleBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="relative z-10 max-w-xl">
              <p className="text-sm font-semibold text-accent-foreground/90 mb-2">
                SPECIAL OFFER
              </p>
              <h2 className="text-5xl lg:text-6xl font-bold text-accent-foreground mb-4">
                FINAL
                <span className="block">SALE</span>
              </h2>
              <p className="text-accent-foreground/90 mb-2">15 Nov To 7 Dec</p>
              <p className="text-lg text-accent-foreground/90 mb-6">
                Save up to 40% on selected items
              </p>
              <Button size="lg" variant="secondary">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Seller Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Best Seller Products</h2>
            <p className="text-muted-foreground text-[1.125rem]">
              There are many variations of products available
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Special Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Streamlining Your Digital & Business Needs with Exclusive Offerings.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((service, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-lg text-center flex flex-col items-center">
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-40 object-cover rounded-xl mb-6 drop-shadow-md"
                    loading="lazy"
                  />
                )}
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground border border-primary hover:bg-transparent hover:text-primary transition-colors"
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Work Portfolio</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing the Quality of Our Trophies and Services
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-xl bg-card border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <p className="text-sm font-medium opacity-90 mb-1">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <p className="text-sm font-semibold tracking-[0.25em] text-brand-dark/60 uppercase">
              Support
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get quick answers about our custom trophy manufacturing, delivery, and finishing services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-background rounded-3xl shadow-xl shadow-black/5 border border-black/5 overflow-hidden">
            <Accordion type="single" collapsible className="divide-y divide-border">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-0"
                >
                  <AccordionTrigger className="px-6 text-left text-base sm:text-lg font-semibold text-card-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-muted-foreground text-base leading-relaxed">
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
