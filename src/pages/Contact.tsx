import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    message: ""
  });

  const address = "PVK TOWER, Near Village Office, Marancheri, Malappuram, Kerala 679581";
  const phoneNumbers = [
    { number: "+91-9072332707", label: "Please contact this number for printing details" },
    { number: "+91-9072331707", label: "Please contact this number for product details" },
    { number: "+91-8891515015", label: "Please contact this number for pan card details" }
  ];
  const workingHours = [
    { label: "Mon – Sat", value: "09:00 AM – 09:00 PM" },
    { label: "Sun", value: "Closed" }
  ];
  const mapUrl =
    "https://maps.google.com/maps?q=PVK%20TOWER%2C%20Near%20Village%20Office%2C%20Marancheri%2C%20Malappuram%2C%20Kerala%20679581&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const encodedAddress = encodeURIComponent(address);



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
        <section className="relative overflow-hidden pt-8 pb-6 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/50 opacity-70 blur-3xl" />
          </div>
          <div className="relative container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] font-medium text-muted-foreground">Contact</p>
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground mt-4 leading-tight">
                Modern Support for <span className="text-primary">Modern Business</span>
              </h2>
              <p className="mt-4 text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Reach out for product consultations, wholesale enquiries, or any help you need.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-5xl mx-auto items-start">
              {/* Contact Information (Left Card) */}
              <div className="rounded-3xl border border-gray-100 bg-white p-4 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                <div className="flex items-start justify-between mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Get In Touch</p>
                    <h3 className="text-2xl font-bold text-gray-900">Reach Out to Us</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1121] text-white">
                    <Navigation className="h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex gap-3 rounded-xl border border-gray-100 p-3 sm:p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Address</p>
                      <div className="text-sm font-medium text-gray-600 leading-relaxed">
                        PVK TOWER, Near Village Office,<br />
                        Marancheri,<br />
                        Malappuram, Kerala 679581
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="rounded-xl border border-gray-100 p-3 sm:p-4">
                    <div className="flex gap-3 mb-4">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone</p>
                      </div>
                    </div>
                    <TooltipProvider delayDuration={100}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-0 sm:pl-[3.5rem]">
                        {phoneNumbers.map((item) => (
                          <Tooltip key={item.number}>
                            <TooltipTrigger asChild>
                              <a
                                href={`tel:${item.number.replace(/[^0-9]/g, "")}`}
                                className="flex items-center justify-center sm:justify-start gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors w-full"
                              >
                                <Phone className="h-3 w-3 flex-shrink-0" /> <span className="truncate">{item.number}</span>
                              </a>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{item.label}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </TooltipProvider>
                  </div>

                  {/* Email */}
                  <div className="flex gap-3 rounded-xl border border-gray-100 p-3 sm:p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                      <a href="mailto:pvkmaranchery707@gmail.com" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors break-words block">
                        pvkmaranchery707@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex gap-3 rounded-xl border border-gray-100 p-3 sm:p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Working Hours</p>
                      <div className="space-y-1 text-xs sm:text-sm font-medium text-gray-600">
                        {workingHours.map((item) => (
                          <div key={item.label} className="break-words"><span className="text-gray-900 font-bold">{item.label}:</span> {item.value}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form (Right Card) */}
              <div className="rounded-3xl border border-gray-100 bg-white p-4 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                <div className="mb-8">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-bold text-gray-400">Send Message</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">We’d love to hear from you</h3>
                  <p className="text-gray-500 mt-2 text-sm">
                    Fill in the form and our support team will respond shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-bold text-gray-700 ml-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="ex. John Doe"
                        className="h-11 rounded-lg bg-gray-50 border-gray-200 text-sm focus:bg-white focus:border-gray-400 transition-all placeholder:text-gray-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="mobile" className="text-xs font-bold text-gray-700 ml-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="ex. +91 98765 43210"
                        className="h-11 rounded-lg bg-gray-50 border-gray-200 text-sm focus:bg-white focus:border-gray-400 transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-gray-700 ml-1">
                      Email ID <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ex. john@example.com"
                      className="h-11 rounded-lg bg-gray-50 border-gray-200 text-sm focus:bg-white focus:border-gray-400 transition-all placeholder:text-gray-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-gray-700 ml-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={4}
                      className="rounded-lg bg-gray-50 border-gray-200 text-sm focus:bg-white focus:border-gray-400 transition-all min-h-[120px] resize-none placeholder:text-gray-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 rounded-lg bg-[#0B1121] text-white font-bold hover:bg-slate-800 transition-all text-sm uppercase tracking-wider shadow-lg shadow-gray-200 mt-2"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width Map */}
        <section className="w-full bg-background pb-12 transition-colors duration-300">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2.5rem] border border-border/50 bg-card/50 shadow-lg overflow-hidden">
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
