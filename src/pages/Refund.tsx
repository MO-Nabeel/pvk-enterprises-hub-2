import Header from "@/components/Header";
import Footer from "@/components/Footer";

const introParagraphs = [
  "We aim to provide quality products and customer satisfaction. Kindly review our return and refund rules below."
];

const returnReplacementItems = [
  {
    icon: "✔",
    text: "Stationery items (without package damage) can be returned within 3 to 7 days of purchase."
  },
  {
    icon: "❌",
    text: "Printed items are non-returnable and non-refundable"
  },
  {
    icon: "❌",
    text: "Custom gift items are non-returnable and non-refundable"
  }
];

const productConditionItems = [
  "unused",
  "undamaged",
  "in original packaging"
];

const Refund = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 sm:pt-24 lg:pt-28">
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <article className="mx-auto max-w-4xl rounded-3xl bg-card p-8 text-base leading-relaxed text-muted-foreground shadow-lg ring-1 ring-border sm:p-10">
              <header className="mb-6 sm:mb-8 text-center space-y-2">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-primary uppercase">
                  Refund & Return Policy
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Refund & Return Policy – PVK Enterprises
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Last Updated: 10/12/2025
                </p>
              </header>
              <div className="space-y-5 text-lg">
                {introParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Returns & Replacement</h2>
                  <div className="space-y-3">
                    {returnReplacementItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-lg mt-0.5">{item.icon}</span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Product Condition</h2>
                  <p>Returned items must be:</p>
                  <ul className="list-disc space-y-2 pl-6">
                    {productConditionItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Damage Policy</h2>
                  <p>If items are damaged before handover during delivery, customers may request an exchange only. No refund is applicable.</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Refunds</h2>
                  <p>Only applicable for eligible stationery returns after inspection and approval.</p>
                  <p>Approved refunds will be processed to the customer's original payment method within 7–10 working days.</p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Refund;


