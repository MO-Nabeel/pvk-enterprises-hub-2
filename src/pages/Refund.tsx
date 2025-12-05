import Header from "@/components/Header";
import Footer from "@/components/Footer";

const refundHighlights = [
  {
    title: "Digital Products",
    summary: "Full refund when requested within 30 days of purchase.",
    details: [
      "Time limit: 30 calendar days from the purchase date to submit a refund request.",
      "Usage requirement: Product must fail to deliver its core advertised function (e.g., license key is invalid).",
      "Non-refundable: Items that are substantially used or downloaded (e.g., over 90% of an online course completed)."
    ]
  },
  {
    title: "Physical Products",
    summary: "Return within 14 days in original condition for refund or replacement.",
    details: [
      "Return period: Initiate returns within 14 calendar days of delivery.",
      "Product state: Items must be unused, in original packaging, and in the same condition received.",
      "Defective or damaged: Eligible for replacement or full refund, including shipping.",
      "Shipping costs: We cover return shipping only if the error is ours (wrong/defective item). Other returns incur a flat $15 fee."
    ]
  }
];

const nonRefundableItems = [
  "Gift cards or vouchers (e.g., $100 gift card).",
  "Downloadable software fulfilled by a third-party vendor.",
  "Items not in their original condition, damaged, or missing parts for non-company-related reasons.",
  "Subscription services used for over 7 days."
];

const processingSteps = [
  {
    title: "1. Request Initiation",
    description:
      "Contact support@yourcompany.com with your order number (e.g., #XYZ12345) and the reason for the refund request."
  },
  {
    title: "2. Inspection (Physical Goods)",
    description:
      "Once the product is received, we inspect it and notify you via email about the approval or rejection of your refund."
  },
  {
    title: "3. Approval & Payout",
    description:
      "Approved refunds are processed back to the original payment method within 7–10 business days."
  },
  {
    title: "4. Late or Missing Refunds",
    description:
      "If funds are delayed after the stated window, check with your bank or card issuer before contacting us for further assistance."
  }
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
                  Refund Policy
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Returns &amp; Refunds
                </h1>
              </header>
              <div className="space-y-4">
                <p>
                  This Refund Policy explains how [Your Company Name] (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) handles refund
                  requests for digital and physical purchases. We want you to be fully satisfied with every order and are here
                  to help when expectations are not met.
                </p>
                <p className="font-semibold text-foreground">
                  Dummy Policy Summary: We offer a full refund for digital products requested within 30 days, and a replacement or credit
                  for physical goods that arrive damaged.
                </p>
              </div>

              <div className="mt-10 space-y-8">
                <h2 className="text-2xl font-semibold text-foreground">1. General Policy Overview</h2>
                <p>
                  Refund requests are reviewed on a case-by-case basis, provided that the conditions outlined below are met. To
                  keep processing straightforward, please retain your proof of purchase and contact us as soon as you believe a
                  refund is necessary.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">2. Eligibility for Refunds</h2>
                <p>The specific eligibility requirements depend on the product type.</p>

                <div className="grid gap-6">
                  {refundHighlights.map(({ title, summary, details }) => (
                    <div key={title} className="rounded-2xl border border-border bg-muted/30 p-6 space-y-4">
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide text-primary">{title}</p>
                        <p className="mt-2 font-semibold text-foreground">{summary}</p>
                      </div>
                      <ul className="list-disc space-y-2 pl-5">
                        {details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">3. Non-Refundable Items</h2>
                <ul className="list-disc space-y-2 pl-6">
                  {nonRefundableItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">4. Processing Your Refund</h2>
                <div className="space-y-4">
                  {processingSteps.map(({ title, description }) => (
                    <div key={title} className="rounded-2xl border border-border bg-muted/20 p-5">
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="mt-2">{description}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Please allow 7–10 business days for approved refunds to appear on your original payment method. Processing
                  times may vary depending on your bank or payment provider.
                </p>
              </div>

              <div className="mt-12 space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Contact Us</h2>
                <p>
                  Questions about this Refund Policy? Reach our support team at{" "}
                  <a href="mailto:support@yourcompany.com" className="text-primary underline">
                    support@yourcompany.com
                  </a>{" "}
                  and include your order number for faster assistance.
                </p>
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 text-sm sm:text-base">
                <p className="font-semibold text-foreground">🗓 Effective Date</p>
                <p className="mt-2">This Refund Policy is effective as of [Dummy Date: January 1, 2024].</p>
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


