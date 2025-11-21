import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import pvkLogo from "@/assets/pvk logo (1).png";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center justify-center gap-2">
              <img 
                src={pvkLogo} 
                alt="PVK Enterprises Logo" 
                className="h-14 sm:h-16 md:h-20 lg:h-24 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px] object-contain"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Leading manufacturer of trophies, awards, and custom metal artifacts, dedicated to quality craftsmanship
              and exceptional service.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/category" className="hover:text-primary transition-colors">
                  PRODUCTS
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary transition-colors">
                  Shipping &amp; Exchange
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact &amp; Support</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/90">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-1" />
                <span>
                  PVK TOWER, Near Village Office, Maranchery Centre, Marancheri, Malappuram, Kerala 679581
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-1" />
                <a href="mailto:pvkmaranchery707@gmail.com" className="hover:text-primary transition-colors">
                  pvkmaranchery707@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-1" />
                <div className="space-y-1">
                  <div className="flex flex-wrap gap-3">
                    <a href="tel:+919142107707" className="hover:text-primary transition-colors">
                      +91-9142107707
                    </a>
                    <span className="text-primary-foreground/50">/</span>
                    <a href="tel:+919072331707" className="hover:text-primary transition-colors">
                      +91-9072331707
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="tel:+918891515015" className="hover:text-primary transition-colors">
                      +91-8891515015
                    </a>
                    <span className="text-primary-foreground/50">/</span>
                    <a href="tel:+919072333707" className="hover:text-primary transition-colors">
                      +91-9072333707
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-primary-foreground/80">
            © Copyrights 2025 - 2026. PVK ENTERPRISES. All Rights Reserved.
          </p>
          <div className="flex items-center justify-start gap-4 md:justify-end">
            <a
              href="https://www.facebook.com/pvkenterprisesmry?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/pvkenterprises7707?igshid=YmMyMTA2M2Y%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
