import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import FeatureCard from "@/components/FeatureCard";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
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
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";
import saleBg from "@/assets/sale-banner-bg.jpg";
import panCardImage from "@/assets/pan-card.png";
import jioFiberImage from "@/assets/jio-fiber.png";
import phonePeImage from "@/assets/phonepe-box.png";
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
      src: trophyImage,
      alt: "Premium Trophies & Awards Collection"
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

  const categories = [
    {
      title: "Trophy AWARDS",
      subtitle: "Best",
      image: trophyImage,
      buttonText: "Browse",
      buttonLink: "/category",
      bgColor: "bg-brand-dark",
      textColor: "text-primary-foreground"
    },
    {
      title: "Office STATIONERY",
      subtitle: "Premium",
      image: officeImage,
      buttonText: "Shop",
      buttonLink: "/category",
      bgColor: "bg-brand-yellow",
      textColor: "text-brand-dark"
    },
    {
      title: "Custom STAMPS",
      subtitle: "Quality",
      image: stampImage,
      buttonText: "Browse",
      buttonLink: "/category",
      bgColor: "bg-accent",
      textColor: "text-accent-foreground"
    },
    {
      title: "Printer SUPPLIES",
      subtitle: "Latest",
      image: printerImage,
      buttonText: "Browse",
      buttonLink: "/category",
      bgColor: "bg-muted",
      textColor: "text-brand-dark"
    },
    {
      title: "Mobile ACCESSORIES",
      subtitle: "Trending",
      image: mobileImage,
      buttonText: "Browse",
      buttonLink: "/category",
      bgColor: "bg-brand-green",
      textColor: "text-primary-foreground"
    },
    {
      title: "Studio MATERIALS",
      subtitle: "Professional",
      image: trophyImage,
      buttonText: "Browse",
      buttonLink: "/category",
      bgColor: "bg-brand-blue",
      textColor: "text-primary-foreground"
    }
  ];

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
      date: "2 months ago"
    },
    {
      name: "Venkat Shetty",
      rating: 5,
      text: "We bought trophies from here for my office events. Exceptional quality.",
      date: "3 months ago"
    },
    {
      name: "Priya Kumar",
      rating: 5,
      text: "Excellent service and beautiful trophies. The team was very helpful in customizing our awards.",
      date: "1 month ago"
    },
    {
      name: "Rajesh Nair",
      rating: 5,
      text: "Best trophy shop in Malappuram. Quality products at reasonable prices. Highly recommended!",
      date: "4 months ago"
    },
    {
      name: "Anjali Menon",
      rating: 5,
      text: "Professional service and stunning designs. They delivered exactly what we needed for our college event.",
      date: "2 months ago"
    },
    {
      name: "Mohammed Ali",
      rating: 5,
      text: "Great experience! The staff is knowledgeable and helped us choose the perfect awards for our sports meet.",
      date: "1 month ago"
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
      <section className="relative overflow-hidden min-h-[600px] lg:min-h-[700px]">
        <div className="absolute inset-0">
          <HeroSlider images={heroImages} variant="background" className="h-full" />
          <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 lg:w-1/2 bg-black/40 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/40 via-black/10 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 lg:py-20">
          <div className="flex items-center min-h-[500px]">
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
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 w-full sm:w-auto"
                  onClick={() => {
                    const element = document.getElementById('shop-by-category');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  Shop by Category
                </Button>
                <Link to="/category" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Get Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section id="shop-by-category" className="py-16 bg-background scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
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
            <p className="text-muted-foreground">
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
                  className="w-full bg-primary hover:bg-primary/90"
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trusted by our clients - hear what they say about PVK Enterprises and our services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-brand-yellow fill-brand-yellow" />
                  ))}
                </div>
                <p className="text-card-foreground mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
