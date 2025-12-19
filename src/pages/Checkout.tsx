import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getCartItems, getCartTotals } from "@/lib/cart";
import { cartHasVisitingCard } from "@/lib/cartRules";
import { getStoredDesignUpload } from "@/lib/designUpload";
import { buildOrderPayload, sendOrderCommunications } from "@/lib/orderSubmission";

type FulfillmentMethod = "Cash on Delivery" | "Get a Quote" | "Online Payment";

type CustomerFormState = {
  name: string;
  companyName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  landmark: string;
  pincode: string;
  notes: string;
  projectScope: string;
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
};

const INITIAL_FORM: CustomerFormState = {
  name: "",
  companyName: "",
  phone: "",
  whatsappNumber: "",
  email: "",
  address: "",
  landmark: "",
  pincode: "",
  notes: "",
  projectScope: "",
  accountHolderName: "",
  accountNumber: "",
  bankName: "",
  ifscCode: ""
};

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const singleItem = location.state?.checkoutItem;

  const [form, setForm] = useState<CustomerFormState>(INITIAL_FORM);
  const [fulfillmentMethod, setFulfillmentMethod] = useState<FulfillmentMethod>("Cash on Delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const cartItems = useMemo(() => {
    if (singleItem) return [singleItem];
    return getCartItems();
  }, [singleItem]);

  const cartTotals = useMemo(() => {
    if (singleItem) {
      const subtotal = singleItem.price * singleItem.quantity;
      const taxRate = singleItem.tax !== undefined ? singleItem.tax / 100 : 0.18;
      const taxes = Number((subtotal * taxRate).toFixed(2));
      const total = subtotal + taxes;
      return { subtotal, taxes, total };
    }
    return getCartTotals();
  }, [singleItem]);
  const requiresDesignUpload = useMemo(() => cartHasVisitingCard(cartItems), [cartItems]);
  const designUpload = useMemo(() => getStoredDesignUpload(), []);
  const orderId = useMemo(() => `PVK-${Date.now()}`, []);

  useEffect(() => {
    if (requiresDesignUpload && !designUpload) {
      navigate("/checkout/upload-design", { replace: true });
    }
  }, [requiresDesignUpload, designUpload, navigate]);

  const handleChange = (field: keyof CustomerFormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const isFormValid = useMemo(() => {
    const phoneValid = form.phone.trim().length > 0;
    const addressValid = form.address.trim().length > 0;

    if (fulfillmentMethod === "Get a Quote") {
      const companyValid = form.companyName.trim().length > 0;
      const projectScopeValid = form.projectScope.trim().length > 0;
      return companyValid && phoneValid && addressValid && projectScopeValid && cartItems.length > 0;
    }

    if (fulfillmentMethod === "Online Payment") {
      const nameValid = form.name.trim().length > 0;
      const emailValid = form.email.trim().length > 0;
      const pincodeValid = form.pincode.trim().length > 0;
      const accountHolderValid = form.accountHolderName.trim().length > 0;
      const accountNumberValid = form.accountNumber.trim().length > 0;
      const bankNameValid = form.bankName.trim().length > 0;
      const ifscValid = form.ifscCode.trim().length > 0;
      return (
        nameValid &&
        phoneValid &&
        emailValid &&
        addressValid &&
        pincodeValid &&
        accountHolderValid &&
        accountNumberValid &&
        bankNameValid &&
        ifscValid &&
        cartItems.length > 0 &&
        (!requiresDesignUpload || !!designUpload)
      );
    }

    const nameValid = form.name.trim().length > 0;
    const emailValid = form.email.trim().length > 0;
    const pincodeValid = form.pincode.trim().length > 0;
    return (
      nameValid &&
      phoneValid &&
      emailValid &&
      addressValid &&
      pincodeValid &&
      cartItems.length > 0 &&
      (!requiresDesignUpload || !!designUpload)
    );
  }, [
    form.name,
    form.companyName,
    form.phone,
    form.whatsappNumber,
    form.email,
    form.address,
    form.landmark,
    form.pincode,
    form.projectScope,
    form.accountHolderName,
    form.accountNumber,
    form.bankName,
    form.ifscCode,
    fulfillmentMethod,
    cartItems.length,
    designUpload,
    requiresDesignUpload
  ]);

  const generateWhatsAppMessage = (): string => {
    const lines: string[] = [];

    lines.push("🛒 *New Order / Enquiry*");
    lines.push("");
    lines.push(`Order ID: ${orderId}`);
    lines.push("");
    lines.push("*Fulfillment Method*");
    lines.push(`• Method: ${fulfillmentMethod}`);
    lines.push("");
    lines.push("*Customer Details*");

    if (fulfillmentMethod === "Get a Quote") {
      lines.push(`• Company Name: ${form.companyName}`);
      lines.push(`• Contact Number: ${form.phone}`);
      lines.push(`• Company Address: ${form.address}`);
      if (form.projectScope.trim()) {
        lines.push(`• Project Scope / Customization Details: ${form.projectScope}`);
      }
    } else {
      lines.push(`• Name: ${form.name}`);
      lines.push(`• Phone: ${form.phone}`);
      if (form.whatsappNumber.trim()) {
        lines.push(`• WhatsApp Number: ${form.whatsappNumber}`);
      }
      lines.push(`• Email: ${form.email}`);
      lines.push(`• Address: ${form.address}`);
      if (form.landmark.trim()) {
        lines.push(`• Landmark: ${form.landmark}`);
      }
      lines.push(`• Pincode: ${form.pincode}`);
      if (form.notes.trim()) {
        lines.push(`• Notes: ${form.notes}`);
      }
    }

    if (fulfillmentMethod === "Online Payment") {
      lines.push("");
      lines.push("*Client Bank Details (For Invoice)*");
      lines.push(`• Account Holder Name: ${form.accountHolderName}`);
      lines.push(`• Account Number: ${form.accountNumber}`);
      lines.push(`• Bank Name: ${form.bankName}`);
      lines.push(`• IFSC Code: ${form.ifscCode}`);
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

    if (requiresDesignUpload && designUpload) {
      lines.push("");
      lines.push("*Visiting Card Design Upload*");
      lines.push(`• File: ${designUpload.name} (${designUpload.type || "file"})`);
      lines.push(`• Size: ${(designUpload.size / (1024 * 1024)).toFixed(2)} MB`);
      const urlPreview = designUpload.url.length > 120
        ? `${designUpload.url.slice(0, 120)}...`
        : designUpload.url;
      lines.push(`• File Reference: ${urlPreview}`);
    }

    lines.push("");
    lines.push("Sent via PVK Enterprises website checkout.");

    return lines.join("\n");
  };

  const handleShareOnWhatsApp = () => {
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
                <div className="mb-6 sm:mb-8 space-y-3">
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-2xl px-3 sm:px-4 text-xs sm:text-sm hover:bg-[#111827] hover:text-white"
                      onClick={handleBackToCart}
                    >
                      ← Back to Cart
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900">
                      Customer &amp; Delivery Details
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Please fill in the required fields so we can process your WhatsApp order enquiry.
                    </p>
                  </div>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    if (!isFormValid || isSubmitting) return;

                    setIsSubmitting(true);
                    setSubmitError(null);

                    try {
                      const payload = buildOrderPayload({
                        id: orderId,
                        fulfillmentMethod,
                        cart: cartItems,
                        totals: cartTotals,
                        customer: form as unknown as Record<string, string>,
                        designUpload
                      });

                      await sendOrderCommunications(payload);
                      handleShareOnWhatsApp();
                    } catch (error) {
                      console.error(error);
                      setSubmitError("We could not send your order details. Please try again.");
                      return;
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  {/* Fulfillment Method Selection - Moved to Top */}
                  <div className="space-y-4 pb-6 border-b border-slate-200">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                        Select Fulfillment Method
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Choose how you would like to complete your order.
                      </p>
                    </div>
                    <RadioGroup
                      value={fulfillmentMethod}
                      onValueChange={(value) => setFulfillmentMethod(value as FulfillmentMethod)}
                      className="grid grid-cols-1 md:grid-cols-3 gap-5"
                    >
                      <div className="flex items-start space-x-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <RadioGroupItem value="Cash on Delivery" id="cod" className="mt-0.5" />
                        <Label
                          htmlFor="cod"
                          className="flex-1 cursor-pointer text-sm font-medium text-slate-900"
                        >
                          Cash on Delivery (COD)
                          <span className="block text-xs font-normal text-slate-600 mt-1">
                            The standard purchase method
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <RadioGroupItem value="Get a Quote" id="quote" className="mt-0.5" />
                        <Label
                          htmlFor="quote"
                          className="flex-1 cursor-pointer text-sm font-medium text-slate-900"
                        >
                          Get a Quote
                          <span className="block text-xs font-normal text-slate-600 mt-1">
                            For large or custom orders requiring negotiation
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3 p-4 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                        <RadioGroupItem value="Online Payment" id="online" className="mt-0.5" />
                        <Label
                          htmlFor="online"
                          className="flex-1 cursor-pointer text-sm font-medium text-slate-900"
                        >
                          Online Payment
                          <span className="block text-xs font-normal text-slate-600 mt-1">
                            For standard immediate payment via a gateway
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {fulfillmentMethod === "Get a Quote" ? (
                    <>
                      <div className="space-y-2">
                        <label
                          htmlFor="company-name-input"
                          className="text-sm font-medium text-slate-700"
                        >
                          Company Name *
                        </label>
                        <Input
                          id="company-name-input"
                          type="text"
                          required
                          value={form.companyName}
                          onChange={handleChange("companyName")}
                          placeholder="Enter your company name"
                          className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                        />
                      </div>

                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <label
                            htmlFor="customer-phone-input"
                            className="text-sm font-medium text-slate-700"
                          >
                            Contact Number *
                          </label>
                          <Input
                            id="customer-phone-input"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={handleChange("phone")}
                            placeholder="Enter your contact number"
                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="customer-address-input"
                          className="text-sm font-medium text-slate-700"
                        >
                          Company Address *
                        </label>
                        <Textarea
                          id="customer-address-input"
                          required
                          value={form.address}
                          onChange={handleChange("address")}
                          placeholder="Office / Building, Street, Landmark, City, State"
                          rows={4}
                          className="rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="project-scope-input"
                          className="text-sm font-medium text-slate-700"
                        >
                          Project Scope / Customization Details *
                        </label>
                        <Textarea
                          id="project-scope-input"
                          required
                          value={form.projectScope}
                          onChange={handleChange("projectScope")}
                          placeholder="Describe requirements, customization needs, quantities, timeline, and any specifics needed for a quote."
                          rows={5}
                          className="rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Row 1: Name + Mobile */}
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

                      {/* Row 2: WhatsApp + Email */}
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <label
                            htmlFor="whatsapp-number-input"
                            className="text-sm font-medium text-slate-700"
                          >
                            WhatsApp Number
                          </label>
                          <Input
                            id="whatsapp-number-input"
                            type="tel"
                            value={form.whatsappNumber}
                            onChange={handleChange("whatsappNumber")}
                            placeholder="Enter your WhatsApp number"
                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="customer-email-input" className="text-sm font-medium text-slate-700">
                            Email Address *
                          </label>
                          <Input
                            id="customer-email-input"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange("email")}
                            placeholder="Enter your email address"
                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                          />
                        </div>
                      </div>

                      {/* Address full width */}
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
                          placeholder="House / Building, Street, City, State"
                          rows={4}
                          className="rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                        />
                      </div>

                      {/* Row 3: Pincode + Landmark */}
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <label htmlFor="customer-pincode-input" className="text-sm font-medium text-slate-700">
                            Pincode / ZIP Code *
                          </label>
                          <Input
                            id="customer-pincode-input"
                            type="text"
                            required
                            value={form.pincode}
                            onChange={handleChange("pincode")}
                            placeholder="e.g. 679581"
                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                          />
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor="landmark-input"
                            className="text-sm font-medium text-slate-700"
                          >
                            Landmark
                          </label>
                          <Input
                            id="landmark-input"
                            type="text"
                            value={form.landmark}
                            onChange={handleChange("landmark")}
                            placeholder="Enter nearby landmark (e.g. Near Metro Station, Opposite Mall)"
                            className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                          />
                        </div>
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

                      {/* Bank Details Section for Online Payment */}
                      {fulfillmentMethod === "Online Payment" && (
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                          <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                              Client Bank Details (For Invoice)
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600">
                              Please provide your bank account details for invoice generation.
                            </p>
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <label
                                htmlFor="account-holder-input"
                                className="text-sm font-medium text-slate-700"
                              >
                                Account Holder Name *
                              </label>
                              <Input
                                id="account-holder-input"
                                type="text"
                                required
                                value={form.accountHolderName}
                                onChange={handleChange("accountHolderName")}
                                placeholder="Enter account holder name"
                                className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor="account-number-input"
                                className="text-sm font-medium text-slate-700"
                              >
                                Account Number *
                              </label>
                              <Input
                                id="account-number-input"
                                type="text"
                                required
                                value={form.accountNumber}
                                onChange={handleChange("accountNumber")}
                                placeholder="Enter account number"
                                className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                              />
                            </div>
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                              <label
                                htmlFor="bank-name-input"
                                className="text-sm font-medium text-slate-700"
                              >
                                Bank Name *
                              </label>
                              <Input
                                id="bank-name-input"
                                type="text"
                                required
                                value={form.bankName}
                                onChange={handleChange("bankName")}
                                placeholder="e.g. HDFC Bank, Axis Bank"
                                className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200"
                              />
                            </div>

                            <div className="space-y-2">
                              <label
                                htmlFor="ifsc-code-input"
                                className="text-sm font-medium text-slate-700"
                              >
                                IFSC Code *
                              </label>
                              <Input
                                id="ifsc-code-input"
                                type="text"
                                required
                                value={form.ifscCode}
                                onChange={handleChange("ifscCode")}
                                placeholder="Enter 11-character IFSC code"
                                maxLength={11}
                                className="h-12 rounded-2xl border-slate-200 bg-slate-50 text-sm focus:border-slate-400 focus-visible:ring-slate-200 uppercase"
                                style={{ textTransform: "uppercase" }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto rounded-2xl bg-[#111827] text-white hover:bg-[#111827]/90 transition"
                      disabled={
                        isSubmitting ||
                        !isFormValid ||
                        (fulfillmentMethod === "Get a Quote" && !form.projectScope.trim())
                      }
                    >
                      {isSubmitting
                        ? "Submitting..."
                        : fulfillmentMethod === "Cash on Delivery"
                          ? "Place order"
                          : fulfillmentMethod === "Get a Quote"
                            ? "Request Quote"
                            : "Proceed to Payment Gateway"}
                    </Button>
                  </div>

                  {!isFormValid && !isCartEmpty && (
                    <p className="text-xs sm:text-sm text-amber-600 mt-1">
                      Please fill in all required fields{" "}
                      {fulfillmentMethod === "Get a Quote"
                        ? "(company name, contact number, company address, and project scope)"
                        : fulfillmentMethod === "Online Payment"
                          ? "(name, mobile number, email address, pincode, complete delivery address, and all bank details)"
                          : "(name, mobile number, email address, pincode, and complete delivery address)"}
                      {" "}to continue.
                    </p>
                  )}

                  {isCartEmpty && (
                    <p className="text-xs sm:text-sm text-red-600 mt-1">
                      Your cart is empty. Please add items to your cart before sending a WhatsApp order enquiry.
                    </p>
                  )}

                  {submitError && (
                    <p className="text-xs sm:text-sm text-red-600 mt-1">
                      {submitError}
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
                        <span>Taxes &amp; GST</span>
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

