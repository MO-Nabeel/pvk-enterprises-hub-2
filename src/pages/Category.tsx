import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import trophyImage from "@/assets/trophy-product.jpg";
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";

const Category = () => {
  const products = [
    {
      name: "Golden Trophy with Laurel Wreath",
      price: 2500,
      image: trophyImage,
      discount: 10
    },
    {
      name: "THERMAL PAPER ROLL 80mm x 50m",
      price: 450,
      image: printerImage
    },
    {
      name: "COLOP Printer 38 Dater Self-inking Stamp",
      price: 1250,
      image: stampImage,
      discount: 15
    },
    {
      name: "Premium Office Notebook A4 Size",
      price: 350,
      image: officeImage
    },
    {
      name: "Sorakshi Quartz Photo Frame With Clock",
      price: 2800,
      image: trophyImage
    },
    {
      name: "Smartphone Case & Screen Protector Bundle",
      price: 650,
      image: mobileImage,
      discount: 20
    },
    {
      name: "JMD Gold Lamination Pouch 125 Micron",
      price: 890,
      image: officeImage
    },
    {
      name: "TNPL COPIER PAPEL GSM A4 Size 500 Sheets",
      price: 420,
      image: printerImage
    },
    {
      name: "Crystal Trophy with Wooden Base",
      price: 3500,
      image: trophyImage,
      discount: 5
    },
    {
      name: "Professional Rubber Stamp Set",
      price: 1800,
      image: stampImage
    },
    {
      name: "Premium Wireless Earbuds",
      price: 2200,
      image: mobileImage,
      discount: 25
    },
    {
      name: "Executive Pen Set with Box",
      price: 950,
      image: officeImage
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Product Categories</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Browse our extensive collection of quality products
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    index === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
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
