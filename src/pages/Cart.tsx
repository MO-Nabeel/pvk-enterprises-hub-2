import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CART_COUNT_EVENT,
  CartEventDetail,
  CartItem,
  getCartItems,
  updateCartItemQuantity
} from "@/lib/cart";
import { Trash2, Plus, Minus } from "lucide-react";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2
});

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getCartItems());

    const handleCartChange = (event: Event) => {
      const detail = (event as CustomEvent<number | CartEventDetail>).detail;

      if (detail && typeof detail === "object" && "items" in detail) {
        setItems(detail.items);
      } else {
        setItems(getCartItems());
      }
    };

    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener(CART_COUNT_EVENT, handleCartChange as EventListener);
    return () => window.removeEventListener(CART_COUNT_EVENT, handleCartChange as EventListener);
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxes = Number((subtotal * 0.18).toFixed(2));
    const total = subtotal + taxes;
    return { subtotal, taxes, total };
  }, [items]);

  const handleQuantityInput = (id: string, value: string) => {
    const parsed = Number(value);

    if (Number.isNaN(parsed) || parsed < 1) {
      return;
    }

    setItems(updateCartItemQuantity(id, parsed));
  };

  const handleIncrement = (id: string, currentQuantity: number) => {
    setItems(updateCartItemQuantity(id, currentQuantity + 1));
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      setItems(updateCartItemQuantity(id, currentQuantity - 1));
    }
  };

  const handleRemoveClick = (item: CartItem) => {
    setItemToRemove(item);
    setIsRemoveDialogOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      setItems(updateCartItemQuantity(itemToRemove.id, 0));
      setItemToRemove(null);
      setIsRemoveDialogOpen(false);
    }
  };

  const handleCancelRemove = () => {
    setItemToRemove(null);
    setIsRemoveDialogOpen(false);
  };

  const handleDialogOpenChange = (open: boolean) => {
    setIsRemoveDialogOpen(open);
    if (!open) {
      // Clear the item to remove when dialog closes (via ESC, outside click, etc.)
      setItemToRemove(null);
    }
  };

  const isCartEmpty = items.length === 0;
  const canCheckout = totals.total > 0 && !isCartEmpty;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30 overflow-x-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="mb-6 sm:mb-8 md:mb-10 text-center">
            <p className="text-xs sm:text-sm font-semibold text-primary tracking-wide uppercase">Your Cart</p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 sm:mt-3 px-2">
              Review & Checkout
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto px-4">
              Review the products you have added, adjust quantities and proceed securely to checkout.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] xl:grid-cols-[minmax(0,2fr)_minmax(350px,1fr)]">
            <section className="rounded-2xl bg-background shadow-sm border border-border/80 order-2 lg:order-1">
              <header className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 sm:gap-4 border-b px-4 sm:px-6 py-4 sm:py-5">
                <div className="w-full sm:w-auto">
                  <p className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground">Cart Details</p>
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mt-1">Items & Quantities</h2>
                </div>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm px-3 sm:px-4 w-full sm:w-auto hover:bg-[#111827] hover:text-white transition-colors duration-200 ease-in-out" asChild>
                  <Link to="/category">Continue Shopping</Link>
                </Button>
              </header>

              {isCartEmpty ? (
                <div className="px-4 sm:px-6 py-10 sm:py-12 md:py-16 text-center text-muted-foreground">
                  <p className="text-base sm:text-lg md:text-xl font-medium">Your cart is waiting for products.</p>
                  <p className="mt-2 text-sm sm:text-base md:text-lg">
                    Add items from any product listing to see them appear here.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 py-5 sm:py-6 md:py-7"
                    >
                      <div className="flex w-full gap-3 sm:gap-4 md:gap-5">
                        <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col gap-2 sm:gap-3">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground break-words">
                                  {item.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                  Unit Price: {currencyFormatter.format(item.price)}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs sm:text-sm text-muted-foreground hover:text-destructive hover:bg-[#111827] transition-colors duration-200 ease-in-out self-start sm:self-auto shrink-0"
                                onClick={() => handleRemoveClick(item)}
                              >
                                <Trash2 className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                <span>Remove</span>
                              </Button>
                            </div>
                            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                              <label
                                className="text-xs sm:text-sm font-medium text-muted-foreground"
                                htmlFor={`qty-${item.id}`}
                              >
                                Quantity
                              </label>
                              <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 sm:h-10 w-9 sm:w-10 rounded-none hover:bg-muted"
                                  onClick={() => handleDecrement(item.id, item.quantity)}
                                  disabled={item.quantity <= 1}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                  id={`qty-${item.id}`}
                                  type="number"
                                  min={1}
                                  value={item.quantity}
                                  onChange={(event) => handleQuantityInput(item.id, event.target.value)}
                                  className="w-16 sm:w-20 md:w-24 h-9 sm:h-10 border-0 rounded-none text-center focus-visible:ring-0 focus-visible:ring-offset-0 px-2"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-9 sm:h-10 w-9 sm:w-10 rounded-none hover:bg-muted"
                                  onClick={() => handleIncrement(item.id, item.quantity)}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <span className="ml-auto text-sm sm:text-base md:text-lg font-semibold text-foreground">
                                {currencyFormatter.format(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <aside className="rounded-2xl bg-background shadow-sm border border-border/80 h-fit sticky top-20 sm:top-24 md:top-28 lg:top-32 order-1 lg:order-2">
              <header className="border-b border-border px-4 sm:px-6 py-4 sm:py-5">
                <p className="text-xs sm:text-sm uppercase tracking-wide text-muted-foreground">Order Summary</p>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-foreground mt-1">Totals & Actions</h2>
              </header>
              <div className="px-4 sm:px-6 py-5 sm:py-6 md:py-7 space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between text-xs sm:text-sm md:text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {currencyFormatter.format(totals.subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm md:text-base">
                  <span className="text-muted-foreground">Taxes & Fees (18%)</span>
                  <span className="font-semibold text-foreground">{currencyFormatter.format(totals.taxes)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4 sm:pt-5">
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-foreground">Total</span>
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary">
                    {currencyFormatter.format(totals.total)}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-semibold mt-2 sm:mt-3"
                  disabled={!canCheckout}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-xs sm:text-sm text-muted-foreground text-center pt-2">
                  Shipping, discounts, and final taxes will be confirmed during checkout.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      {/* Remove Item Confirmation Modal */}
      <AlertDialog open={isRemoveDialogOpen} onOpenChange={handleDialogOpenChange}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Item?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove <strong>{itemToRemove?.name}</strong> from your cart? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelRemove}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Remove It
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cart;

