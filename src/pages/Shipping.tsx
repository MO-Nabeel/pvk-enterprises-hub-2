import Header from "@/components/Header";
import Footer from "@/components/Footer";

const processingDetails = [
  {
    title: "Order Processing",
    description:
      "All orders are processed within [Dummy Days: 1-3] business days (excluding weekends and holidays) after receiving your order confirmation email."
  },
  {
    title: "Shipping Cut-Off",
    description: "Orders placed after [Dummy Time: 12:00 PM] local time will be processed the following business day."
  },
  {
    title: "Shipment Notification",
    description: "You will receive an email notification with tracking details once your package leaves our facility."
  }
];

const shippingMethods = [
  {
    method: "Standard Ground",
    eta: "[Dummy Days: 5-8] business days (after processing)",
    cost: "[Dummy Price: $8.99]"
  },
  {
    method: "Express / Priority",
    eta: "[Dummy Days: 2-3] business days (after processing)",
    cost: "[Dummy Price: $24.99]"
  },
  {
    method: "International",
    eta: "[Dummy Days: 10-20] business days (after processing)",
    cost: "Calculated at checkout"
  }
];

const exchangeEligibility = [
  {
    title: "Time Limit",
    description: "Exchange requests must be initiated within [Dummy Days: 30] days of the delivery date."
  },
  {
    title: "Product State",
    description: "Items must be unused, unwashed, and in the same condition received, with all original tags attached."
  },
  {
    title: "Exchange Reasons",
    description: "Eligible for size swaps (e.g., Medium to Large) or defective/damaged items. Different-product swaps are not allowed."
  }
];

const exchangeProcessSteps = [
  {
    title: "1. Initiate Request",
    description:
      "Email [Dummy Email: exchanges@yourcompany.com] with your Order Number [Dummy ID: #XYZ12345], the item you wish to exchange, and the new size or replacement required."
  },
  {
    title: "2. Return Shipping",
    description:
      "Size Swap: Customer covers the cost of returning the original item; we ship the replacement at [Dummy Fee: $0.00]. Defective/Damaged: We provide a pre-paid return shipping label."
  },
  {
    title: "3. Replacement Timeline",
    description:
      "Once we receive and inspect the original item, the replacement is processed and shipped within [Dummy Days: 3-5] business days."
  }
];

const missingPackageGuidelines = [
  "Contact us if you have not received your package within [Dummy Days: 7] days of the estimated delivery date.",
  "We coordinate with the carrier to track the package and keep you informed.",
  'If tracking shows "Delivered" but you have not received it, file a claim with the carrier (e.g., Dummy Carrier: FedEx, USPS, DHL). We will assist with supporting documentation.'
];

const Shipping = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 sm:pt-24 lg:pt-28">
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <article className="mx-auto max-w-5xl rounded-3xl bg-card p-8 text-base leading-relaxed text-muted-foreground shadow-lg ring-1 ring-border sm:p-10">
              <header className="space-y-4 text-foreground text-center mb-4">
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                  Shipping &amp; Exchange Policy
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Shipping &amp; Exchange Details</h1>
                <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                  We are committed to delivering your order accurately, in good condition, and on time. Below you&apos;ll find
                  information about processing times, shipping options, exchanges, and support for missing packages.
                </p>
                <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Last updated: [Dummy Date: January 1, 2024]
                </p>
              </header>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">A. Processing Times (Dummy Data)</h2>
                <p>Every order starts with careful verification and packaging. Note the timelines below when planning your purchase.</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {processingDetails.map(({ title, description }) => (
                    <div key={title} className="rounded-2xl border border-border bg-muted/20 p-5">
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="mt-2">{description}</p>
                    </div>
                  ))}
                </div>
                <p className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
                  Free Shipping Offer: Enjoy free Standard Ground shipping on orders over [Dummy Threshold: $75].
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">B. Shipping Rates & Delivery Estimates</h2>
                <p>Shipping charges are calculated and displayed at checkout. Estimated timelines apply after processing is complete.</p>
                <div className="overflow-x-auto rounded-2xl border border-border -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-[500px] sm:min-w-full divide-y divide-border text-sm">
                        <thead className="bg-muted/40 text-left text-foreground">
                          <tr>
                            <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm">Shipping Method</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm">Estimated Delivery</th>
                            <th scope="col" className="px-3 sm:px-6 py-3 sm:py-4 font-semibold text-xs sm:text-sm">Cost</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {shippingMethods.map(({ method, eta, cost }) => (
                            <tr key={method} className="text-foreground">
                              <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-sm">{method}</td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{eta}</td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">C. International Shipping</h2>
                <p>We ship to most countries worldwide. Please review the customs and duties information below.</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Your order may incur import duties and taxes (including VAT) once the shipment reaches your destination country.</li>
                  <li>[Your Company Name] is not responsible for these charges; they are the customer&apos;s responsibility.</li>
                  <li>International timelines are estimates and may be delayed due to customs processing in the destination country.</li>
                </ul>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">D. Tracking Your Order</h2>
                <p>
                  When your order ships, we email a tracking number so you can follow its journey. Please allow [Dummy Time: 48] hours
                  for tracking information to become available after you receive the notification.
                </p>
              </div>

              <div className="mt-16 border-t border-border pt-10">
                <h2 className="text-3xl font-bold text-foreground">2. Exchange Policy</h2>
                <p className="mt-4">
                  We understand that sizing issues or manufacturing defects can occur. Review the criteria below to ensure your request
                  qualifies for an exchange.
                </p>

                <div className="mt-10 space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">A. Eligibility for Exchange (Dummy Data)</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {exchangeEligibility.map(({ title, description }) => (
                      <div key={title} className="rounded-2xl border border-border bg-muted/20 p-5">
                        <p className="font-semibold text-foreground">{title}</p>
                        <p className="mt-2">{description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    Dummy Example: We cannot exchange a product for a completely different item (e.g., swapping a pair of shoes for a necklace).
                  </p>
                </div>

                <div className="mt-10 space-y-6">
                  <h3 className="text-xl font-semibold text-foreground">B. Exchange Process</h3>
                  <div className="space-y-5">
                    {exchangeProcessSteps.map(({ title, description }) => (
                      <div key={title} className="rounded-2xl border border-border bg-muted/10 p-5">
                        <p className="font-semibold text-foreground">{title}</p>
                        <p className="mt-2">{description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">C. Stock Availability</h3>
                  <p>
                    Exchanges depend on the availability of the requested replacement item. If the desired item is out of stock, we will
                    offer a full refund of the original purchase price or provide store credit instead.
                  </p>
                </div>
              </div>

              <div className="mt-16 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">3. Missing or Lost Packages</h2>
                <p>
                  We&apos;re here to help if your shipment encounters delays or cannot be located. Follow the steps below for the fastest resolution.
                </p>
                <ul className="list-disc space-y-3 pl-6">
                  {missingPackageGuidelines.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 text-sm sm:text-base">
                <p className="font-semibold text-foreground">Need More Help?</p>
                <p className="mt-2">
                  Reach our support team at{" "}
                  <a href="mailto:support@yourcompany.com" className="text-primary underline">
                    support@yourcompany.com
                  </a>{" "}
                  with your order number for faster assistance.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;


