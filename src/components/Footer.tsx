import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm hover:text-primary transition-colors">
                  PRIVACY POLICY
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary transition-colors">
                  ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm hover:text-primary transition-colors">
                  TESTIMONIALS
                </Link>
              </li>
              <li>
                <Link to="/maps" className="text-sm hover:text-primary transition-colors">
                  MAPS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  PVK TOWER, Near Village Office, Maranchery Centre, Marancheri, Malappuram, Kerala 679581
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:pvkmaranchery707@gmail.com" className="text-sm hover:text-primary transition-colors">
                  pvkmaranchery707@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <div className="text-sm">
                  <div>+91-9142107707</div>
                  <div>+91-8891515015</div>
                  <div>+91-907233707</div>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm">
            © Copyrights 2025 - 2026. PVK ENTERPRISES. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Powered By</span>
            <span className="font-bold text-sm">JustDial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
