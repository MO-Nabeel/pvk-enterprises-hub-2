import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import pvkLogo from "@/assets/pvk logo (1).png";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/category" },
  { label: "Contact", to: "/contact" },
];

const policyLinks = [
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Refund Policy", to: "/refund" },
  { label: "Shipping & Exchange", to: "/shipping" },
];

const phoneNumbers = ["+91 91421 07707", "+91 90723 31707", "+91 88915 15015", "+91 90723 33707"];

const socialLinks = [
  {
    href: "https://www.facebook.com/pvkenterprisesmry?mibextid=ZbWKwL",
    label: "Facebook",
    Icon: Facebook,
  },
  {
    href: "https://www.instagram.com/pvkenterprises7707?igshid=YmMyMTA2M2Y%3D",
    label: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://youtube.com",
    label: "Youtube",
    Icon: Youtube,
  },
];

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#040d1f] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 text-sm md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={pvkLogo} alt="PVK Enterprises Logo" className="h-16 w-auto object-contain" />
            </Link>
            <p className="text-white/70 leading-relaxed">
              PVK Enterprises crafts trophies, awards, office stationery, and bespoke gifting experiences with meticulous
              attention to detail and dependable timelines.
            </p>
            <div className="h-px w-full bg-white/10" />
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Maranchery • Kerala</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-white/70">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-sm transition hover:text-white"
                  >
                    <span className="h-[2px] w-4 bg-white/30" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-3 text-white/70">
              {policyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex items-center gap-2 text-sm transition hover:text-white"
                  >
                    <span className="h-[2px] w-4 bg-white/30" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-white/80">
            <h3 className="text-lg font-semibold text-white">Contact &amp; Support</h3>
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-white/60" />
              <a
                href="https://maps.google.com/?q=PVK+TOWER,+Near+Village+Office,+Maranchery+Centre,+Marancheri,+Malappuram,+Kerala+679581"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm leading-relaxed hover:text-white"
              >
                PVK TOWER, Near Village Office, Maranchery Centre, Malappuram, Kerala 679581
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 text-white/60" />
              <a href="mailto:pvkmaranchery707@gmail.com" className="text-sm hover:text-white">
                pvkmaranchery707@gmail.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-white/60" />
              <div className="grid gap-1 text-sm">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                    className="hover:text-white"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} PVK Enterprises. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
