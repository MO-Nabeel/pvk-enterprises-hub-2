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
          className="text-sm text-slate-600 hover:text-primary transition-colors leading-relaxed block"
        >
          PVK TOWER, Near Village Office, <br /> Maranchery Centre, Marancheri, <br /> Malappuram, Kerala 679581
        </a>
      )
    },
    {
      icon: Phone,
      title: "Phone",
      content: (
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 w-full">
          {phoneNumbers.map((number) => (
            <a
              key={number}
              href={`tel:${number.replace(/-/g, "")}`}
              className="w-full sm:w-auto text-sm text-slate-600 hover:text-primary transition-colors rounded-full border border-slate-200 px-4 py-2 text-center sm:text-left"
            >
              {number}
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
          className="text-sm text-slate-600 hover:text-primary transition-colors"
        >
          pvkmaranchery707@gmail.com
        </a>
      )
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: (
        <div className="space-y-1 text-sm text-slate-600">
          {workingHours.map((item) => (
            <p key={item.label}>
              <span className="font-medium text-slate-800">{item.label}:</span> {item.value}
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
      
      <main className="flex-1">
        <PageBanner
          title="Contact Us"
          subtitle="We’re here to help with product enquiries, custom orders, and support."
          backgroundImage={supportImage}
        />

        {/* Contact Content */}
        <section className="relative overflow-hidden bg-slate-50 pt-12 pb-8 sm:pt-16 sm:pb-10 lg:pt-20 lg:pb-12">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-50 opacity-70 blur-3xl" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto mb-10 text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Contact</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                Modern Support for Modern Business
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600">
                Reach out for product consultations, wholesale enquiries, or any help you need. Our dedicated team will
                respond within one business day.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
              {/* Contact Information */}
              <div className="rounded-[32px] border border-white/80 bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur p-5 sm:p-8">
                <div className="flex flex-col gap-3 text-center sm:text-left sm:flex-row sm:items-center sm:justify-between mb-8">
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-500">Get In Touch</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">Reach Out to Us</h3>
                  </div>
                  <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Navigation className="h-5 w-5" />
                  </div>
                </div>

                <div className="space-y-5">
                  {contactDetails.map(({ icon: Icon, title, content }) => (
                    <div
                      key={title}
                      className="flex flex-col sm:flex-row sm:items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-left"
                    >
                      <div className="mx-auto sm:mx-0 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white shadow-inner shadow-slate-200">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1.5 w-full">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
                        <div className="text-sm text-slate-600">{content}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-[32px] border border-transparent bg-white shadow-2xl shadow-slate-200/70 p-5 sm:p-8 lg:p-10">
                <div className="mb-8 sm:mb-10 text-center sm:text-left">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500">Send us a message</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">We’d love to hear from you</h3>
                  <p className="text-slate-600 mt-3 text-sm sm:text-base">
                    Fill in the form and our support team will respond shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="Enter your full name"
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mobile" className="text-sm font-medium text-slate-700">
                        Mobile Number *
                      </label>
                      <Input
                        id="mobile"
                        type="tel"
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        placeholder="Enter your mobile number"
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email ID *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-700">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message..."
                      rows={5}
                      className="rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-2xl bg-[#111827] text-white hover:bg-slate-900 transition"
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Full-width Map */}
        <section className="w-full bg-white">
          <div className="mx-auto w-full max-w-[1400px] px-0 sm:px-6 lg:px-10">
            <div className="rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 overflow-hidden">
              <div className="w-full h-[400px] sm:h-[450px] lg:h-[500px]">
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-5 sm:px-8 py-6 sm:py-8 text-center sm:text-left">
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-slate-500">Visit Us</p>
                  <h4 className="text-2xl font-bold text-slate-900">PVK ENTERPRISES</h4>
                  <p className="text-sm text-slate-600">{address}</p>
                </div>
                <Button
                  onClick={handleGetDirections}
                  className="rounded-2xl bg-[#111827] text-white hover:bg-slate-900 transition w-full sm:w-auto"
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
