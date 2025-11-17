import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import FeatureCard from "@/components/FeatureCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";
import heroImage from "@/assets/hero-headphones.jpg";
import trophyImage from "@/assets/trophy-product.jpg";
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";
import saleBg from "@/assets/sale-banner-bg.jpg";

const Index = () => {
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
      name: "THERMAL PAPER ROLL",
      price: 450,
      image: printerImage
    },
    {
      name: "COLOP Printer 38 Dater Self-inking stamp",
      price: 1250,
      image: stampImage,
      discount: 10
    },
    {
      name: "Sorakshi Quartz Photo Frame With Clock",
      price: 2800,
      image: trophyImage
    },
    {
      name: "PRISMAJET NOVA RESIN COATED GLOSSY",
      price: 3200,
      image: officeImage,
      discount: 15
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                Welcome to PVK Enterprises
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Trophies & Awards
                <span className="block text-muted-foreground mt-2">Excellence</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                We design elegant, traditional and modern trophies made from a selection of metals that clients can take their pick from.
              </p>
              <Button size="lg" className="bg-accent hover:bg-accent/90">
                Shop by Category
              </Button>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Featured Product"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-background">
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
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* UTI Service Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">UTI PAN CARD SERVICE</h3>
              <p className="text-muted-foreground mb-6">
                UTI Infrastructure Technology And Services Limited
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
