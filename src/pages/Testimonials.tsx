import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star } from "lucide-react";

const Testimonials = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Customer Testimonials</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              What our valued customers say about us
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
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

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Join Our Satisfied Customers
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience the quality and service that our customers rave about. 
                Contact us today for your trophy and award needs.
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
                  Browse Products
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

export default Testimonials;
