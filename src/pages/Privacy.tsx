import Header from "@/components/Header";
import Footer from "@/components/Footer";

const introParagraphs = [
  "This privacy policy is an electronic record in the form of an electronic contract formed under the Information Technology Act, 2000 and the applicable rules. This privacy policy does not require any physical, electronic, or digital signature.",
  "PVK ENTERPRISES and its affiliates and associate companies care about the privacy of the data and information of all users, including sellers and buyers, whether registered or not, who interact with our Website, mobile site, or mobile applications. Associate Companies shall have the same meaning as ascribed in the Companies Act, 2013.",
  "This Privacy Policy is a contract between you and the respective entity whose website you use or access or with whom you otherwise engage. It must be read together with the relevant Terms of Use or other applicable terms and conditions of the respective entity."
];

const sections = [
  {
    title: "Collection of Personally Identifiable Information",
    description: [
      "We collect information from you when you place an order or subscribe to our Website. When ordering or registering, you may be asked to enter your name, email address, mailing address, phone number, or credit card information.",
      "Our primary goal in collecting this data is to provide you with a safe, efficient, smooth, and customized experience. The information we learn from customers helps us personalize and continually improve your experience while shopping from our web store."
    ]
  },
  {
    title: "Use of Demographic / Profile Data",
    description: [
      "We use personal information to provide the services you request. When we use your personal information for marketing, we offer you the ability to opt out of such communications.",
      "Personal information may also be used to resolve disputes, troubleshoot problems, promote a safe service, collect payments, measure consumer interest in our products and services, and inform you about online and offline offers, products, services, and updates.",
      "In our continuous effort to enhance our offerings, we collect and analyze demographic and profile data about user activity on our Website."
    ]
  },
  {
    title: "Cookies",
    description: [
      "Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow it). These cookies enable the site's systems to recognize your browser and capture certain information.",
      "We use cookies to help remember and process the items in your shopping cart. The cookies do not contain any personally identifiable information."
    ]
  },
  {
    title: "Sharing of Personal Information / Sensitive Data",
    description: [
      "By providing information to PVK ENTERPRISES, you confirm that such disclosure and our use of that information does not violate any third-party agreements, laws, charter documents, judgments, orders, or decrees.",
      "We may disclose personal information when required by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal processes.",
      "PVK ENTERPRISES does not collect sensitive personal data or information except where necessary to provide specific services, fulfill stated purposes, or comply with lawful requirements associated with our functions or activities. Users may browse or search the PVK ENTERPRISES platform without providing personal information; however, certain services may require specific personal data."
    ]
  },
  {
    title: "Security Precautions",
    description: [
      "We strive to ensure the security of your personal information and protect it against unauthorized access, alteration, disclosure, or destruction. Whenever you change or access your account information, we offer the use of a secure server."
    ]
  },
  {
    title: "Choice / Opt-Out",
    description: [
      "We provide all users with the opportunity to opt out of receiving non-essential (promotional or marketing-related) communications from us on behalf of our partners, as well as from us directly after setting up an account.",
      "If we decide to modify our privacy policy, we will post those changes on this page."
    ]
  },
  {
    title: "Children's Information",
    description: [
      "Our Website is accessible to the general public. We do not knowingly collect, process, or store personal data of children below 18 years of age (as defined under applicable Indian law) without the consent of a parent or lawful guardian.",
      "We do not knowingly solicit or collect personal information from children under the age of 13. Use of our platform is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are under the age of 18, you must use our platform or services under the supervision of a parent, legal guardian, or responsible adult."
    ]
  },
  {
    title: "Your Approval",
    description: [
      "By using the Website and/or providing your information, you consent to the collection and use of the information you disclose on the Website in accordance with this Privacy Policy.",
      "If we decide to change our privacy policy, we will post those changes on this page."
    ]
  }
];

const permissions = [
  {
    title: "Identity",
    details:
      "This permission allows the app to access saved accounts on your device, as well as access and change personal information stored on the device. It includes accounts listed under Settings > Accounts, such as Google, Facebook, WhatsApp, Skype, and others."
  },
  {
    title: "SMS",
    details:
      "Under certain circumstances, we may send you emails and SMS messages when we have important announcements regarding your service. Your carrier may charge you to receive messages via SMS."
  },
  {
    title: "Photos / Media / Files",
    details:
      "Apps usually request media and photos permission when external storage access is needed for storing data or for features like sharing images."
  },
  {
    title: "Camera and Microphone",
    details:
      "We may request access to your camera to let you capture product images instantly without saving them beforehand. Microphone access may be needed for voice search. Granting permission prevents repeated prompts."
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
                  How We Handle Your Data
                </h1>
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
                <h2 className="text-2xl font-semibold text-foreground">Permissions</h2>
                <p>
                  The following permissions may be requested to optimize your experience with PVK ENTERPRISES digital
                  properties:
                </p>
                <div className="space-y-6">
                  {permissions.map(({ title, details }) => (
                    <div key={title} className="rounded-2xl border border-border bg-muted/30 p-5">
                      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                      <p className="mt-2">{details}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
                <p>
                  If you have any questions regarding this privacy policy, you may contact us using the information
                  below:
                </p>
                <div className="rounded-2xl border border-border bg-muted/20 p-6 text-sm sm:text-base">
                  <p className="font-semibold text-foreground">PVK ENTERPRISES</p>
                  <p>PVK TOWER, Near Village Office, Maranchery Centre, Marancheri, Malappuram, Kerala 679581</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a href="mailto:pvkmaranchery707@gmail.com" className="text-primary underline-offset-4 hover:underline">
                      pvkmaranchery707@gmail.com
                    </a>
                  </p>
                  <p className="mt-1">
                    Phone:{" "}
                    <a href="tel:+919142107707" className="text-primary underline-offset-4 hover:underline">
                      +91-9142107707
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

export default Privacy;

