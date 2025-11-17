import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Users, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Excellence in Trophy Manufacturing Since Years
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  We, <strong>PVK ENTERPRISES</strong>, situated at Marancheri, Malappuram, Kerala, 
                  are recognized as one of the best trophy and awards manufacturing companies. 
                  We design elegant, traditional and modern trophies made from a selection of 
                  metals that the clients can take their pick from.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  We are committed to deliver quality products to our customers with our creative 
                  approach in design and with the help of our dedicated and experienced team.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid md:grid-cols-2 gap-8 mt-16">
                <div className="bg-card rounded-xl p-6 border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality Excellence</h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards in trophy manufacturing, 
                    ensuring every piece meets our rigorous quality requirements.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                  <p className="text-muted-foreground">
                    Our dedicated and experienced team brings creativity and 
                    expertise to every project we undertake.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Custom Solutions</h3>
                  <p className="text-muted-foreground">
                    We offer personalized trophy designs tailored to your 
                    specific requirements and preferences.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer Commitment</h3>
                  <p className="text-muted-foreground">
                    We are dedicated to delivering quality products and 
                    exceptional service to all our customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Visit Our Store</h2>
              <p className="text-lg text-muted-foreground mb-8">
                PVK TOWER, Near Village Office, Maranchery Centre, 
                Marancheri, Malappuram, Kerala 679581
              </p>
              <div className="bg-card rounded-xl p-8 border">
                <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Monday - Saturday: 09:00 AM - 07:30 PM
                  </p>
                  <p className="text-muted-foreground">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
