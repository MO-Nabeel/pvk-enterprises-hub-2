import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">PVK</span>
            <span className="text-xl font-semibold text-foreground">ENTERPRISES</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4"
              />
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              HOME
            </Link>
            <Link to="/category" className="text-sm font-medium hover:text-primary transition-colors">
              CATEGORY
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              ABOUT US
            </Link>
            <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
              GALLERY
            </Link>
            <Link to="/testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              TESTIMONIALS
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              CONTACT US
            </Link>
            <Link to="/maps" className="text-sm font-medium hover:text-primary transition-colors">
              MAPS
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t">
            <div className="relative md:hidden">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4"
              />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                HOME
              </Link>
              <Link to="/category" className="text-sm font-medium hover:text-primary transition-colors">
                CATEGORY
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                ABOUT US
              </Link>
              <Link to="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
                GALLERY
              </Link>
              <Link to="/testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                TESTIMONIALS
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                CONTACT US
              </Link>
              <Link to="/maps" className="text-sm font-medium hover:text-primary transition-colors">
                MAPS
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
