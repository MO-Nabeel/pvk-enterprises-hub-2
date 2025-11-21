import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent } from "react";
import { CART_COUNT_EVENT, CartEventDetail, getCartCount } from "@/lib/cart";
import pvkLogo from "@/assets/pvk logo (1).png";

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

  const navBaseClasses =
    "px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200";
  const navActiveClasses = "bg-[#111827] text-white shadow-sm";
  const navInactiveClasses = "text-gray-600 hover:bg-[#111827] hover:text-white";

  return (
    <header className="fixed top-0 left-0 w-full z-[999] bg-white/95 backdrop-blur">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 py-3 sm:py-4">
          {/* Left Section: Logo */}
          <Link 
            to="/" 
            className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0 pr-3 sm:pr-4 lg:pr-6"
          >
            <img 
              src={pvkLogo} 
              alt="PVK Enterprises Logo" 
              className="h-10 sm:h-12 md:h-14 w-auto max-w-[180px] sm:max-w-[220px] md:max-w-[260px] object-contain"
            />
          </Link>

          {/* Center Section: Main Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center flex-1 justify-center">
            <div className="flex items-center border-2 border-gray-300 rounded-full px-5 py-2.5 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${navBaseClasses} ${
                    isActive(link.to) ? navActiveClasses : navInactiveClasses
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Section: Contact Button, Search Icon & Utility Icons */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
            {/* Search Icon */}
            <Button
              size="icon"
              className="text-white bg-[#111827] hover:bg-[#0c1220] rounded-full p-2.5 shadow-md"
              onClick={() => setSearchBarOpen(!searchBarOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Shopping Cart Icon - Only visible when cart has items */}
            {cartHasItems && (
              <div className="relative">
                <Button
                  asChild
                  size="icon"
                  className="text-white bg-[#111827] hover:bg-[#0c1220] rounded-full p-2.5 shadow-md"
                  aria-label={`View cart (${cartCount} item${cartCount === 1 ? "" : "s"})`}
                >
                  <Link to="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </Button>
                <span
                  className="pointer-events-none absolute -top-1.5 -right-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full text-white px-1.5 text-xs font-bold leading-none shadow-lg"
                  style={{ backgroundColor: '#111827' }}
                  aria-live="polite"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              </div>
            )}

            {/* User Profile Icon */}
            <Button
              size="icon"
              className="hidden sm:flex text-white bg-[#111827] hover:bg-[#0c1220] rounded-full p-2.5 shadow-md"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 hover:bg-gray-100 rounded-full p-2.5"
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
          <div className="lg:hidden py-4 space-y-3 border-t border-gray-200">
            <nav className="flex flex-col items-center">
              <div className="flex flex-col w-full max-w-sm border-2 border-gray-300 rounded-full px-1 py-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${navBaseClasses} text-center ${
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
                className="text-white bg-[#111827] hover:bg-[#0c1220] rounded-full shadow-md"
                aria-label="Profile"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar */}
      {searchBarOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-[1000]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for Trophies, Awards, or Services..."
                  className="w-full pl-10 pr-12 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                onClick={() => setSearchBarOpen(false)}
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
