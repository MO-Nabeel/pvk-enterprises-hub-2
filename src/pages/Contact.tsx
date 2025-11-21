import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import supportImage from "@/assets/hero-headphones.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    message: ""
  });

  const address = "PVK TOWER, Near Village Office, Maranchery Centre, Marancheri, Malappuram, Kerala 679581";
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0!2d76.0!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiA3NsKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ fullName: "", mobile: "", email: "", message: "" });
  };

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PageBanner
          title="Contact Us"
          subtitle="We’re here to help with product enquiries, custom orders, and support."
          backgroundImage={supportImage}
        />

        {/* Contact Content */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Get In Touch</h2>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                    We'd love to hear from you. Fill out the form or use our contact information below.
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold mb-1">Address</h3>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer break-words"
                      >
                        PVK TOWER, Near Village Office,<br />
                        Maranchery Centre, Marancheri,<br />
                        Malappuram, Kerala 679581
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold mb-1">Phone</h3>
                      <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                        <div>
                          <a href="tel:+919142107707" className="hover:text-primary transition-colors break-all">
                            +91-9142107707
                          </a>
                        </div>
                        <div>
                          <a href="tel:+919072331707" className="hover:text-primary transition-colors break-all">
                            +91-9072331707
                          </a>
                        </div>
                        <div>
                          <a href="tel:+918891515015" className="hover:text-primary transition-colors break-all">
                            +91-8891515015
                          </a>
                        </div>
                        <div>
                          <a href="tel:+919072333707" className="hover:text-primary transition-colors break-all">
                            +91-9072333707
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold mb-1">Email</h3>
                      <a
                        href="mailto:pvkmaranchery707@gmail.com"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        pvkmaranchery707@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-semibold mb-1">Working Hours</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Mon – Sat : 09:00 AM – 07:30 PM / 12:00 AM – 12:00 AM<br />
                        Sun : Closed / 12:00 AM – 12:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card rounded-xl p-4 sm:p-6 lg:p-8 border shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Mobile Number *
                    </label>
                    <Input
                      id="mobile"
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="Enter your mobile number"
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Email ID *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message..."
                      rows={4}
                      className="text-sm sm:text-base resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full text-sm sm:text-base" size="lg">
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-8 sm:py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="bg-card rounded-xl sm:rounded-2xl overflow-hidden border shadow-lg">
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
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold mb-2">PVK ENTERPRISES</h2>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base lg:text-lg text-muted-foreground hover:text-primary transition-colors cursor-pointer block break-words"
                      >
                        {address}
                      </a>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleGetDirections}
                    className="w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Navigation className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Get Directions
                  </Button>
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

export default Contact;
