import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { CART_COUNT_EVENT, CartEventDetail, getCartCount } from "@/lib/cart";
import pvkLogo from "@/assets/pvk logo (1).png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const applyStoredCount = () => {
      setCartCount(getCartCount());
    };

    applyStoredCount();

    const handleCartChange = (event: Event) => {
      const detail = (event as CustomEvent<number | CartEventDetail>).detail;

      if (typeof detail === "number") {
        setCartCount(detail);
        return;
      }

      if (detail && typeof detail === "object" && "count" in detail) {
        setCartCount(detail.count);
        return;
      }

      applyStoredCount();
    };

    if (typeof window !== "undefined") {
      window.addEventListener(CART_COUNT_EVENT, handleCartChange as EventListener);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(CART_COUNT_EVENT, handleCartChange as EventListener);
      }
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get("search") || "";
    setSearchQuery(value);
  }, [location.search]);

  const cartHasItems = cartCount > 0;

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmed = searchQuery.trim();
    const target = trimmed ? `/category?search=${encodeURIComponent(trimmed)}` : "/category";

    if (location.pathname + location.search !== target) {
      navigate(target);
    } else if (location.pathname === "/category") {
      // trigger event for same route to allow Category page to react
      window.dispatchEvent(new CustomEvent("pvk:search-submit", { detail: trimmed }));
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <img 
              src={pvkLogo} 
              alt="PVK Enterprises Logo" 
              className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[320px] object-contain"
            />
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form className="relative w-full" onSubmit={handleSearchSubmit}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </form>
          </div>

          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              HOME
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              ABOUT US
            </Link>
            <Link to="/category" className="text-sm font-medium hover:text-primary transition-colors">
              PRODUCTS
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              CONTACT
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="bg-[#FF0000] text-white hover:bg-[#E00000]"
                aria-label={`View cart (${cartCount} item${cartCount === 1 ? "" : "s"})`}
              >
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </Link>
              </Button>
              {cartHasItems && (
                <span
                  className="pointer-events-none absolute -top-1.5 -right-1.5 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#FF0000] px-1 text-xs font-semibold leading-none text-white shadow-sm"
                  aria-live="polite"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex bg-[#FF0000] text-white hover:bg-[#E00000]"
              aria-label="Profile"
            >
              <User className="h-5 w-5 text-white" />
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
            <form className="relative md:hidden" onSubmit={handleSearchSubmit}>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                HOME
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
                ABOUT US
              </Link>
              <Link to="/category" className="text-sm font-medium hover:text-primary transition-colors">
                PRODUCTS
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                CONTACT
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
