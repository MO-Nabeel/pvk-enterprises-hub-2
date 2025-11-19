import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import cartBackground from "@/assets/printer-equipment.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CART_COUNT_EVENT,
  CartEventDetail,
  CartItem,
  getCartItems,
  updateCartItemQuantity
} from "@/lib/cart";
import { Trash2 } from "lucide-react";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2
});

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
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

    if (Number.isNaN(parsed)) {
      return;
    }

    setItems(updateCartItemQuantity(id, parsed));
  };

  const handleRemove = (id: string) => {
    setItems(updateCartItemQuantity(id, 0));
  };

  const isCartEmpty = items.length === 0;
  const canCheckout = totals.total > 0 && !isCartEmpty;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        <PageBanner
          title="Cart"
          subtitle="Review your selected products and continue securely to checkout."
          backgroundImage={cartBackground}
        />
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold text-primary tracking-wide uppercase">Your Cart</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-3">Review & Checkout</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Review the products you have added, adjust quantities and proceed securely to checkout.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <section className="rounded-2xl bg-background shadow-sm border">
              <header className="flex flex-wrap items-center justify-between gap-4 border-b px-6 py-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">Cart Details</p>
                  <h2 className="text-xl font-semibold text-foreground">Items & Quantities</h2>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/category">Continue Shopping</Link>
                </Button>
              </header>

              {isCartEmpty ? (
                <div className="px-6 py-12 text-center text-muted-foreground">
                  <p className="text-lg font-medium">Your cart is waiting for products.</p>
                  <p className="mt-2">Add items from any product listing to see them appear here.</p>
                </div>
              ) : (
                <ul className="divide-y">
                  {items.map((item) => (
                    <li key={item.id} className="flex flex-col gap-6 px-6 py-6 sm:flex-row sm:items-start">
                      <div className="flex w-full gap-4 sm:w-auto">
                        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg border bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Unit Price: {currencyFormatter.format(item.price)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleRemove(item.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-4">
                            <label className="text-sm font-medium text-muted-foreground" htmlFor={`qty-${item.id}`}>
                              Quantity
                            </label>
                            <Input
                              id={`qty-${item.id}`}
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(event) => handleQuantityInput(item.id, event.target.value)}
                              className="w-24"
                            />
                            <span className="ml-auto text-base font-semibold text-foreground">
                              {currencyFormatter.format(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <aside className="rounded-2xl bg-background shadow-sm border h-fit">
              <header className="border-b px-6 py-4">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">Order Summary</p>
                <h2 className="text-xl font-semibold text-foreground">Totals & Actions</h2>
              </header>
              <div className="px-6 py-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {currencyFormatter.format(totals.subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Fees (18%)</span>
                  <span className="font-semibold text-foreground">{currencyFormatter.format(totals.taxes)}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-base font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">{currencyFormatter.format(totals.total)}</span>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  disabled={!canCheckout}
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Shipping, discounts, and final taxes will be confirmed during checkout.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

