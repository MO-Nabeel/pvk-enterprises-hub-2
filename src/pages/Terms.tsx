import Header from "@/components/Header";
import Footer from "@/components/Footer";

const introParagraphs = [
  "Welcome to PVK Enterprises. By accessing or placing an order on our website, you agree to the following Terms & Conditions. Please read them carefully."
];

const sections = [
  {
    title: "1. General Information",
    description: [
      "PVK Enterprises operates as a retail and wholesale provider of printing, trophies, stationery, and customized products. All users must comply with applicable laws and regulations while using our website."
    ]
  },
  {
    title: "2. Ordering & Payment",
    description: [
      "Customers can place orders directly through the website and complete payment using our integrated payment gateway.",
      "All orders are processed only after successful payment confirmation."
    ]
  },
  {
    title: "3. Pricing",
    description: [
      "All prices displayed on the website are subject to change without prior notice based on market and supplier conditions."
    ]
  },
  {
    title: "4. Product & Custom Orders",
    description: [
      "For stationery items, custom products, printing items, and gift items, the specifications provided by the customer will be considered final while placing the order.",
      "PVK Enterprises is not responsible for spelling, design, or information errors provided by the customer."
    ]
  },
  {
    title: "5. Delivery",
    description: [
      "Delivery availability depends on location. Estimated delivery timelines may vary.",
      "If items are damaged before handover to the customer, the product can be exchanged as per our return policy."
    ]
  },
  {
    title: "6. Intellectual Property",
    description: [
      "All content including logos, text, product images, and designs belong to PVK Enterprises and cannot be copied or used without written permission."
    ]
  },
  {
    title: "7. Limitation of Liability",
    description: [
      "PVK Enterprises is not liable for product misuse, delays caused by logistics partners, or incorrect information entered by customers."
    ]
  },
  {
    title: "8. Governing Law",
    description: [
      "All terms are governed by applicable Indian laws and jurisdiction."
    ]
  }
];

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 sm:pt-24 lg:pt-28">
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <article className="mx-auto max-w-4xl rounded-3xl bg-card p-8 text-base leading-relaxed text-muted-foreground shadow-lg ring-1 ring-border sm:p-10">
              <header className="mb-6 sm:mb-8 text-center space-y-2">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-primary uppercase">
                  Terms & Conditions
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Terms & Conditions – PVK Enterprises
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
                {sections.map(({ title, description }) => (
                  <div key={title} className="space-y-4">
                    <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
                    {description.map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-12 space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
                <p>
                  If you have any questions regarding these terms and conditions, you may contact us using the information
                  below:
                </p>
                <div className="rounded-2xl border border-border bg-muted/20 p-6 text-sm sm:text-base">
                  <p className="font-semibold text-foreground">PVK ENTERPRISES</p>
                  <p>PVK TOWER, Near Village Office, Marancheri, Malappuram, Kerala 679581</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a href="mailto:pvkmaranchery707@gmail.com" className="text-primary underline-offset-4 hover:underline">
                      pvkmaranchery707@gmail.com
                    </a>
                  </p>
                  <p className="mt-1">
                    Phone:{" "}
                    <a href="tel:+919072332707" className="text-primary underline-offset-4 hover:underline">
                      +91-9072332707
                    </a>
                    {" / "}
                    <a href="tel:+919072331707" className="text-primary underline-offset-4 hover:underline">
                      +91-9072331707
                    </a>
                  </p>
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

export default Terms;


