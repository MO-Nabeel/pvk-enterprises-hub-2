import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nonEligibleItems = [
  "Printing items",
  "Customized products",
  "Personalized gift items"
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Shipping &amp; Exchange Policy – PVK Enterprises</h1>
                <p className="text-[11px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Last Updated: 10/12/2025
                </p>
              </header>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Shipping</h2>
                <p>Delivery is available for selected locations.</p>
                <p>Shipping charges may vary depending on area and product category.</p>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Delivery Time</h2>
                <p>Estimated delivery time will be shown during checkout and may vary based on location and availability.</p>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Order Status</h2>
                <p>Customers can contact us for delivery updates through the website or customer service.</p>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Damage on Delivery</h2>
                <p>If an item is damaged before receiving the product, it can be exchanged.</p>
                <p>Refunds are not provided for damaged items—exchange only.</p>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Non-eligible Items</h2>
                <p>The following items are strictly not eligible for return or refund:</p>
                <ul className="list-disc space-y-2 pl-6 mt-4">
                  {nonEligibleItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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


