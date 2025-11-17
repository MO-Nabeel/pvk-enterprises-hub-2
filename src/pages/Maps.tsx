import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";

const Maps = () => {
  const address = "PVK TOWER, Near Village Office, Maranchery Centre, Marancheri, Malappuram, Kerala 679581";
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0!2d76.0!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiA3NsKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890";

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Find Us</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Visit our store in Marancheri, Malappuram
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl overflow-hidden border shadow-lg">
                {/* Map Embed */}
                <div className="aspect-video w-full">
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="PVK Enterprises Location"
                  />
                </div>

                {/* Location Details */}
                <div className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">PVK ENTERPRISES</h2>
                      <p className="text-muted-foreground text-lg">
                        {address}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleGetDirections}
                    className="w-full sm:w-auto"
                  >
                    <Navigation className="h-5 w-5 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-card rounded-xl p-6 border">
                  <h3 className="text-xl font-semibold mb-4">Working Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Saturday</span>
                      <span className="font-medium">09:00 AM - 07:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Phone: <span className="font-medium text-foreground">+91-9142107707</span>
                    </p>
                    <p className="text-muted-foreground">
                      Email:{" "}
                      <a
                        href="mailto:pvkmaranchery707@gmail.com"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        pvkmaranchery707@gmail.com
                      </a>
                    </p>
                  </div>
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

export default Maps;
