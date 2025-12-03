import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getCartItems, getCartTotals } from "@/lib/cart";

type CustomerFormState = {
  name: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  notes: string;
};

const INITIAL_FORM: CustomerFormState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  pincode: "",
  notes: ""
};

const Checkout = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CustomerFormState>(INITIAL_FORM);

  const cartItems = useMemo(() => getCartItems(), []);
  const cartTotals = useMemo(() => getCartTotals(), []);

  const handleChange = (field: keyof CustomerFormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const isFormValid = useMemo(() => {
    const nameValid = form.name.trim().length > 0;
    const phoneValid = form.phone.trim().length > 0;
    const addressValid = form.address.trim().length > 0;
    return nameValid && phoneValid && addressValid && cartItems.length > 0;
  }, [form.name, form.phone, form.address, cartItems.length]);

  const generateWhatsAppMessage = (): string => {
    const lines: string[] = [];

    lines.push("🛒 *New Order / Enquiry*");
    lines.push("");
    lines.push("*Customer Details*");
    lines.push(`• Name: ${form.name}`);
    lines.push(`• Phone: ${form.phone}`);
    if (form.email.trim()) {
      lines.push(`• Email: ${form.email}`);
    }
    lines.push(`• Address: ${form.address}`);
    if (form.pincode.trim()) {
      lines.push(`• Pincode: ${form.pincode}`);
    }
    if (form.notes.trim()) {
      lines.push(`• Notes: ${form.notes}`);
    }

    lines.push("");
    lines.push("*Order Summary*");

    if (cartItems.length === 0) {
      lines.push("No items in cart (please verify).");
    } else {
      cartItems.forEach((item, index) => {
        lines.push(
          `${index + 1}. ${item.name} — Qty: ${item.quantity} — Price: ₹${item.price.toFixed(2)}`
        );
      });

      lines.push("");
      lines.push(
        `Subtotal: ₹${cartTotals.subtotal.toFixed(2)} | Taxes (18%): ₹${cartTotals.taxes.toFixed(
          2
        )}`
      );
      lines.push(`Total: ₹${cartTotals.total.toFixed(2)}`);
    }

    lines.push("");
    lines.push("Sent via PVK Enterprises website checkout.");

    return lines.join("\n");
  };

  const handleShareOnWhatsApp = () => {
    if (!isFormValid) {
      return;
    }

    const message = generateWhatsAppMessage();

    // Default business number; adjust as needed
    const phoneNumber = "919142107707";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-primary tracking-[0.25em] uppercase">
                Checkout
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Confirm Order &amp; Delivery Details
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Share your details so we can confirm your order and delivery over WhatsApp in a smooth,
                personalised conversation.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)] items-start">
              {/* Customer Details Form */}
              <section className="rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 p-5 sm:p-8 lg:p-10">
                <div className="mb-6 sm:mb-8 space-y-2">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900">
                    Customer &amp; Delivery Details
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Please fill in the required fields so we can process your WhatsApp order enquiry.
                  </p>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleShareOnWhatsApp();
                  }}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="customer-name-input"
                        className="text-sm font-medium text-slate-700"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="customer-name-input"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange("name")}
                        placeholder="Enter your full name"
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="customer-phone-input"
                        className="text-sm font-medium text-slate-700"
                      >
                        Mobile Number *
                      </label>
                      <Input
                        id="customer-phone-input"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange("phone")}
                        placeholder="Enter your mobile number"
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="customer-email-input" className="text-sm font-medium text-slate-700">
                        Email Address (Optional)
                      </label>
                      <Input
                        id="customer-email-input"
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        placeholder="Enter your email address"
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="customer-pincode-input" className="text-sm font-medium text-slate-700">
                        Pincode / ZIP Code
                      </label>
                      <Input
                        id="customer-pincode-input"
                        type="text"
                        value={form.pincode}
                        onChange={handleChange("pincode")}
                        placeholder="e.g. 679581"
                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="customer-address-input"
                      className="text-sm font-medium text-slate-700"
                    >
                      Complete Delivery Address *
                    </label>
                    <Textarea
                      id="customer-address-input"
                      required
                      value={form.address}
                      onChange={handleChange("address")}
                      placeholder="House / Building, Street, Landmark, City, State"
                      rows={4}
                      className="rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="customer-notes-input"
                      className="text-sm font-medium text-slate-700"
                    >
                      Notes / Special Instructions (Optional)
                    </label>
                    <Textarea
                      id="customer-notes-input"
                      value={form.notes}
                      onChange={handleChange("notes")}
                      placeholder="Add any delivery notes, timing preferences, or custom requests."
                      rows={3}
                      className="rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto rounded-2xl bg-[#111827] text-white hover:bg-slate-900 transition"
                      disabled={!isFormValid}
                    >
                      Place Order
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto rounded-2xl"
                      onClick={handleBackToCart}
                    >
                      Back to Cart
                    </Button>
                  </div>

                  {!isFormValid && !isCartEmpty && (
                    <p className="text-xs sm:text-sm text-amber-600 mt-1">
                      Please fill in your name, mobile number, and complete delivery address to continue.
                    </p>
                  )}

                  {isCartEmpty && (
                    <p className="text-xs sm:text-sm text-red-600 mt-1">
                      Your cart is empty. Please add items to your cart before sending a WhatsApp order enquiry.
                    </p>
                  )}
                </form>
              </section>

              {/* Order Summary Panel */}
              <aside className="rounded-3xl border border-slate-200 bg-white/90 shadow-lg shadow-slate-200/70 p-5 sm:p-6 lg:p-7 space-y-4">
                <div>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-slate-500">
                    Order Summary
                  </p>
                  <h2 className="mt-2 text-lg sm:text-xl font-semibold text-slate-900">
                    Items &amp; Estimated Total
                  </h2>
                </div>

                {isCartEmpty ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-6 text-sm text-slate-600 space-y-2">
                    <p className="font-medium text-slate-800">Your cart is empty</p>
                    <p>Go back to products and add items before confirming your WhatsApp order.</p>
                    <Button asChild variant="outline" size="sm" className="mt-2 rounded-2xl">
                      <Link to="/category">Browse Products</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-56 overflow-y-auto pr-1 space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2.5 text-xs sm:text-sm"
                        >
                          <div className="space-y-1">
                            <p className="font-medium text-slate-900">{item.name}</p>
                            <p className="text-slate-500">
                              Qty: {item.quantity} &middot; ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="font-semibold text-slate-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 border-t border-slate-200 pt-4 text-xs sm:text-sm">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{cartTotals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Taxes &amp; Fees (18%)</span>
                        <span className="font-medium">₹{cartTotals.taxes.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-dashed border-slate-200 mt-1">
                        <span className="text-sm font-semibold text-slate-900">Estimated Total</span>
                        <span className="text-lg sm:text-xl font-bold text-primary">
                          ₹{cartTotals.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Final price, shipping, and any customisations will be confirmed with you directly on WhatsApp
                      before completing the order.
                    </p>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;

