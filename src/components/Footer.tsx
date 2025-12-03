import { Facebook, Instagram, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import pvkLogo from "@/assets/pvk logo (1).png";

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

// Custom Twitter/X Icon Component
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

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
    isImage: false,
  },
  {
    href: "https://www.instagram.com/pvkenterprises7707?igshid=YmMyMTA2M2Y%3D",
    label: "Instagram",
    Icon: Instagram,
    isImage: false,
  },
  {
    href: "https://wa.me/919142107707",
    label: "WhatsApp",
    Icon: WhatsAppIcon,
    isImage: false,
  },
  {
    href: "https://twitter.com/pvkenterprises",
    label: "Twitter",
    Icon: TwitterIcon,
    isImage: false,
  },
  {
    href: "https://www.justdial.com/Malappuram/PVK-ENTERPRISES-Marancheri/9999PX483-X483-230222165740-C4C9_BZDET?via=scode",
    label: "JustDial",
    Icon: null,
    image: null,
    isImage: false,
    isText: true,
    text: "JD",
  },
];

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#040d1f] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 text-sm md:grid-cols-3 lg:grid-cols-3">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={pvkLogo}
                alt="PVK Enterprises Logo"
                loading="lazy"
                decoding="async"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-white/70 leading-relaxed">
              PVK Enterprises crafts trophies, awards, office stationery, and bespoke gifting experiences with meticulous
              attention to detail and dependable timelines.
            </p>
            <div className="h-px w-full bg-white/10" />
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">Maranchery • Kerala</p>
          </div>

          {/* Links cluster: Quick Links + Resources */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
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
              <Phone className="mt-1 h-5 w-5 text-white/60 flex-shrink-0" />
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm flex-1">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-sm text-white/70 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} PVK Enterprises. All Rights Reserved.</p>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            {socialLinks.map(({ href, label, Icon, image, isImage, isText, text }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"
              >
                {isImage && image ? (
                  <img
                    src={image}
                    alt={label}
                    loading="lazy"
                    decoding="async"
                    className="h-4 w-4 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                ) : isText && text ? (
                  <span className="text-xs font-bold opacity-80 hover:opacity-100 transition-opacity">{text}</span>
                ) : (
                  Icon && <Icon className="h-4 w-4" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
