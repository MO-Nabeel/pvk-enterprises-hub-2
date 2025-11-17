import Header from "@/components/Header";
import Footer from "@/components/Footer";
import trophyImage from "@/assets/trophy-product.jpg";
import officeImage from "@/assets/office-supplies.jpg";
import stampImage from "@/assets/rubber-stamps.jpg";
import printerImage from "@/assets/printer-equipment.jpg";
import mobileImage from "@/assets/mobile-accessories.jpg";

const Gallery = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore our collection of products and services
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
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

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Interested in Our Products?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contact us today to discuss your requirements and get a custom quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Contact Us
                </a>
                <a
                  href="/category"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
                >
                  View Products
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
