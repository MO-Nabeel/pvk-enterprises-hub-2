import Header from "@/components/Header";
import Footer from "@/components/Footer";

const introParagraphs = [
  "PVK Enterprises respects your privacy and is committed to protecting your personal information. This policy explains how we collect, store, and use your data."
];

const sections = [
  {
    title: "1. Information We Collect",
    description: [
      "We may collect:",
      "• Name",
      "• Contact number",
      "• Email address",
      "• Delivery address",
      "• Payment details",
      "• Purchase history"
    ]
  },
  {
    title: "2. How We Use Your Information",
    description: [
      "We use your information to:",
      "• Process orders",
      "• Deliver products",
      "• Provide customer service",
      "• Improve website experience",
      "• Send order updates",
      "",
      "We do not sell or share customer information with third parties except payment gateway and delivery partners necessary for transaction and shipping."
    ]
  },
  {
    title: "3. Payment Information",
    description: [
      "Our website uses a secure payment gateway.",
      "We do not store your full payment details on our servers."
    ]
  },
  {
    title: "4. Cookies",
    description: [
      "We may use cookies to improve website performance and user experience."
    ]
  },
  {
    title: "5. Data Protection",
    description: [
      "We implement reasonable security measures to protect personal information."
    ]
  },
  {
    title: "6. Contact",
    description: [
      "For questions or concerns, please contact PVK Enterprises through our website contact page."
    ]
  }
];

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20 sm:pt-24 lg:pt-28">
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <article className="mx-auto max-w-4xl rounded-3xl bg-card p-8 text-base leading-relaxed text-muted-foreground shadow-lg ring-1 ring-border sm:p-10">
              <header className="mb-6 sm:mb-8 text-center space-y-2">
                <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-primary uppercase">
                  Privacy Policy
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Privacy Policy – PVK Enterprises
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
                    {description.map((text, index) => 
                      text === "" ? (
                        <div key={`${title}-${index}`} className="mt-4" />
                      ) : (
                        <p key={`${title}-${index}`}>{text}</p>
                      )
                    )}
                  </div>
                ))}
              </div>

            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;

