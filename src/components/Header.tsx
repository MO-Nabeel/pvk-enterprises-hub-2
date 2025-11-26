import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { CART_COUNT_EVENT, CartEventDetail, getCartCount } from "@/lib/cart";
import pvkLogo from "@/assets/pvk logo (1).png";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchBarOpen) {
        setSearchBarOpen(false);
      }
    };

    if (searchBarOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [searchBarOpen]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    const target = trimmed ? `/category?search=${encodeURIComponent(trimmed)}` : "/category";

    if (location.pathname + location.search !== target) {
      navigate(target);
    } else if (location.pathname === "/category") {
      window.dispatchEvent(new CustomEvent("pvk:search-submit", { detail: trimmed }));
    }
    setSearchBarOpen(false);
  };

  const cartHasItems = cartCount > 0;

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/category", label: "PRODUCTS" },
    { to: "/contact", label: "CONTACT" },
  ];

  const navActiveClasses = "bg-foreground text-background shadow-sm";
  const navInactiveClasses = "text-muted-foreground hover:bg-foreground/10 hover:text-foreground";

  return (
    <header className="fixed top-0 left-0 w-full z-[999] border-b border-border/70 bg-background/90 text-foreground shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4">
          {/* Left Section: Logo */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0 pr-2 sm:pr-3 md:pr-4 lg:pr-6"
          >
            <img 
              src={pvkLogo} 
              alt="PVK Enterprises Logo" 
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] object-contain"
            />
          </Link>

          {/* Center Section: Main Navigation Links (Desktop & Tablet) */}
          <nav className="hidden md:flex lg:flex items-center flex-1 justify-center">
            <div className="flex items-center border-2 border-border rounded-full px-3 md:px-4 lg:px-5 py-2 md:py-2.5 gap-1.5 md:gap-2 bg-background/80">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 md:px-4 lg:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                    isActive(link.to) ? navActiveClasses : navInactiveClasses
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Section: Search Icon & Utility Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
            <ThemeToggle className="inline-flex sm:inline-flex" />
            {/* Search Icon */}
            <Button
              size="icon"
              className="nav-icon-button"
              onClick={() => setSearchBarOpen(!searchBarOpen)}
              aria-label="Search"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Shopping Cart Icon - Only visible when cart has items */}
            {cartHasItems && (
              <div className="relative">
                <Button
                  asChild
                  size="icon"
                  className="nav-icon-button"
                  aria-label={`View cart (${cartCount} item${cartCount === 1 ? "" : "s"})`}
                >
                  <Link to="/cart">
                    <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <span
                  className="pointer-events-none absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 inline-flex h-4 sm:h-5 min-w-[16px] sm:min-w-[20px] items-center justify-center rounded-full bg-foreground px-1 sm:px-1.5 text-[10px] sm:text-xs font-bold leading-none text-background shadow-lg"
                  aria-live="polite"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              </div>
            )}

            {/* User Profile Icon - Hidden on mobile, visible on tablet and up */}
            <Button
              size="icon"
              className="hidden sm:flex nav-icon-button"
              aria-label="Profile"
            >
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-muted rounded-full p-2 h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-4 space-y-3">
              <nav className="flex flex-col items-center">
                <div className="flex flex-col w-full max-w-xs border-2 border-border rounded-2xl px-2 py-2 space-y-1 bg-background/90">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium text-center transition-all duration-200 ${
                        isActive(link.to) ? navActiveClasses : navInactiveClasses
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>
              {/* Mobile User Profile */}
              <div className="flex items-center justify-center pt-2">
                <Button
                  size="icon"
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full shadow-md h-10 w-10"
                  aria-label="Profile"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center justify-center pt-2">
                <ThemeToggle className="sm:hidden" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {searchBarOpen && (
        <div className="absolute top-full left-0 w-full border-b border-border bg-background shadow-lg z-[1000] animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for Trophies, Awards, or Services..."
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 h-10 sm:h-12 text-sm sm:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12"
                onClick={() => setSearchBarOpen(false)}
                aria-label="Close search"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
