import Header from "@/components/Header";
import Footer from "@/components/Footer";

const definitions = [
  {
    term: "Service",
    description:
      "Refers to the website operated by [Your Company Name], along with any related products and services."
  },
  {
    term: "User / You",
    description:
      "The individual accessing or using the Service, or the company or other legal entity on whose behalf an individual accesses or uses the Service."
  },
  {
    term: "Company / We / Us / Our",
    description:
      "Refers to [Your Company Name], located at [Dummy Address: 123 Main Street, Anytown, State 12345]."
  },
  {
    term: "Content",
    description:
      "Any text, graphics, images, music, software, audio, video, works of authorship, or other materials made available through the Service."
  }
];

const sections = [
  {
    title: "General Conditions",
    description: [
      "Acceptance: By using the Service, you confirm that you are at least [Dummy Age: 18] years old (or the legal age of majority in your jurisdiction) and capable of entering into a binding contract.",
      "Modification: We reserve the right to modify or replace these Terms at any time. We will provide at least [Dummy Notice Period: 30] days' notice before new terms take effect, and what constitutes a material change will be determined at our sole discretion.",
      "Accuracy: Information on this site is provided for general purposes only. We are not responsible if the material made available is not accurate, complete, or current, and it should not be relied upon as the sole basis for decisions."
    ]
  },
  {
    title: "User Accounts (Dummy Section)",
    description: [
      "If the Service requires account creation, you are responsible for maintaining the confidentiality of your account and password (e.g., Dummy User: JohnDoe123).",
      "You agree to notify us immediately of any unauthorized use of your account.",
      "We reserve the right to terminate or suspend your account for any breach of these Terms."
    ]
  },
  {
    title: "Intellectual Property Rights",
    description: [
      "The Service and its original Content (excluding user-provided Content), features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors.",
      "The Content is protected by copyright, trademark, and other laws of both the [Dummy Jurisdiction: State/Country] and foreign countries.",
      "Your use of the Service does not grant you any right or license to reproduce or otherwise use any [Your Company Name] trademarks or proprietary materials."
    ]
  },
  {
    title: "Prohibited Uses",
    description: [
      "(a) Using the site or its Content for any unlawful purpose (e.g., Dummy Example: Phishing schemes).",
      "(b) Soliciting others to perform or participate in unlawful acts.",
      "(c) Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances.",
      "(d) Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating against others based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability."
    ]
  },
  {
    title: "Limitation of Liability",
    description: [
      "In no event shall [Your Company Name], its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages. This includes, without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from:",
      "(a) Your access to or use of or inability to access or use the Service.",
      "(b) Any conduct or content of any third party on the Service (e.g., Dummy Loss: $5,000 in perceived business loss)."
    ]
  },
  {
    title: "Governing Law",
    description: [
      "These Terms shall be governed and construed in accordance with the laws of [Dummy Jurisdiction: The State of Example], without regard to its conflict of law provisions."
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
                  Terms &amp; Conditions
                </p>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                  Website Terms &amp; Conditions
                </h1>
              </header>
              <div className="space-y-4">
                <p>
                  Please read these Terms and Conditions carefully before using the Service. Your access to and use of the
                  Service is conditioned on your acceptance of and compliance with these Terms. By accessing or using any
                  part of the Service, you agree to be bound by these Terms.
                </p>
              </div>

              <div className="mt-10 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">1. Definitions</h2>
                <div className="space-y-4">
                  {definitions.map(({ term, description }) => (
                    <div key={term} className="rounded-2xl border border-border bg-muted/30 p-5">
                      <p className="font-semibold text-foreground">{term}</p>
                      <p className="mt-2">{description}</p>
                    </div>
                  ))}
                </div>
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

              <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-semibold text-foreground">Contact Information</h2>
                <p>
                  Questions about the Terms and Conditions should be sent to [Dummy Email: legal@yourcompany.com] or via
                  postal mail at the address listed in Section 1.
                </p>
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-muted/20 p-6 text-sm sm:text-base">
                <p className="font-semibold text-foreground">🗓 Effective Date</p>
                <p className="mt-2">These Terms and Conditions are effective as of [Dummy Date: January 1, 2024].</p>
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


