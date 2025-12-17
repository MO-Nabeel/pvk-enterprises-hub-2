import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  const phoneNumbers = ["+91-9142107707", "+91-9072331707", "+91-8891515015", "+91-9072333707"];
  const workingHours = [
    { label: "Mon – Sat", value: "09:00 AM – 07:30 PM / 12:00 AM – 12:00 AM" },
    { label: "Sun", value: "Closed / 12:00 AM – 12:00 AM" }
  ];
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0!2d76.0!3d11.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzAwLjAiTiA3NsKwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890";
  const encodedAddress = encodeURIComponent(address);

  const contactDetails = [
    {
      icon: MapPin,
      title: "Address",
      content: (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-primary transition-colors leading-relaxed block"
        >
          PVK TOWER, Near Village Office, <br /> Maranchery Centre, Marancheri, <br /> Malappuram, Kerala 679581
        </a>
      )
    },
    {
      icon: Phone,
      title: "Phone",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full">
          {phoneNumbers.map((number) => (
            <a
              key={number}
              href={`tel:${number.replace(/-/g, "")}`}
              className="group flex items-center justify-center sm:justify-start text-sm font-medium text-foreground hover:text-primary hover:bg-background transition-all duration-200 rounded-xl border border-border hover:border-primary/30 hover:shadow-sm px-4 py-2.5 sm:py-3 text-center sm:text-left"
            >
              <Phone className="h-4 w-4 mr-2 text-muted-foreground group-hover:text-primary transition-colors hidden sm:inline-flex" />
              <span>{number}</span>
            </a>
          ))}
        </div>
      )
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <a
          href="mailto:pvkmaranchery707@gmail.com"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          pvkmaranchery707@gmail.com
        </a>
      )
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: (
        <div className="space-y-1 text-sm text-muted-foreground">
          {workingHours.map((item) => (
            <p key={item.label}>
              <span className="font-medium text-foreground">{item.label}:</span> {item.value}
            </p>
          ))}
        </div>
      )
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you soon.");
    setFormData({ fullName: "", mobile: "", email: "", message: "" });
  };

  const handleGetDirections = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16 sm:pt-20 md:pt-24 lg:pt-28 bg-background transition-colors duration-300">
        {/* Contact Content */}
        <section className="relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/50 opacity-70 blur-3xl" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto mb-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Contact</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3">
                Modern Support for Modern Business
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Reach out for product consultations, wholesale enquiries, or any help you need. Our dedicated team will
                respond within one business day.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
              {/* Contact Information */}
              <div className="rounded-[32px] border border-border/60 bg-card/80 shadow-xl shadow-foreground/5 backdrop-blur p-5 sm:p-8 transition-colors duration-300">
                <div className="flex flex-col gap-3 text-center sm:text-left sm:flex-row sm:items-center sm:justify-between mb-8">
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-muted-foreground">Get In Touch</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Reach Out to Us</h3>
                  </div>
                  <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background">
                    <Navigation className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-5">
                  {contactDetails.map(({ icon: Icon, title, content }) => (
                    <div
                      key={title}
                      className="flex flex-col sm:flex-row sm:items-start gap-4 rounded-2xl border border-border bg-muted/40 p-4 text-left transition-colors duration-200 show-hover-effect"
                    >
                      <div className="mx-auto sm:mx-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-background shadow-inner shadow-foreground/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1.5 w-full">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</p>
                        <div className="text-sm text-muted-foreground">{content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-[32px] border border-transparent bg-card shadow-2xl shadow-foreground/5 p-5 sm:p-8 lg:p-10 transition-colors duration-300">
                <div className="mb-8 sm:mb-10 text-center sm:text-left">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-muted-foreground">Send us a message</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-3">We’d love to hear from you</h3>
                  <p className="text-muted-foreground mt-3 text-sm sm:text-base">
                    Fill in the form and our support team will respond shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className="h-12 rounded-2xl border-input bg-background text-sm focus:border-ring focus-visible:ring-ring"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mobile" className="text-sm font-medium text-foreground">
                        Mobile Number *
                      </label>
                      <Input
                        id="mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="Enter your mobile number"
                        className="h-12 rounded-2xl border-input bg-background text-sm focus:border-ring focus-visible:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email ID *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="h-12 rounded-2xl border-input bg-background text-sm focus:border-ring focus-visible:ring-ring"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message (Optional)
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message..."
                      rows={5}
                      className="rounded-2xl border-input bg-background text-sm focus:border-ring focus-visible:ring-ring"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-2xl bg-foreground text-background hover:bg-foreground/90 transition"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width Map */}
        <section className="w-full bg-background transition-colors duration-300">
          <div className="mx-auto w-full max-w-[1400px] px-0 sm:px-6 lg:px-10">
            <div className="rounded-[32px] border border-border bg-card shadow-xl shadow-foreground/5 overflow-hidden transition-colors duration-300">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] bg-muted/20">
                <iframe
                  src={mapUrl}
                  className="absolute inset-0 w-full h-full border-0 dark:grayscale dark:brightness-[0.7] transition-all duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="PVK Enterprises Location"
                />
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 sm:px-8 py-6 sm:py-8 text-center sm:text-left bg-card">
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-muted-foreground">Visit Us</p>
                  <h4 className="text-2xl font-bold text-foreground">PVK ENTERPRISES</h4>
                  <p className="text-sm text-muted-foreground">{address}</p>
                </div>
                <Button
                  onClick={handleGetDirections}
                  className="rounded-2xl bg-foreground text-background hover:bg-foreground/90 transition w-full sm:w-auto"
                  size="lg"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  Get Directions
                </Button>
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
