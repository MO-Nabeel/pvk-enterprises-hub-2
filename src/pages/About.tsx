import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import trophyBanner from "@/assets/trophy-product.jpg";
import pvkShopImage from "@/assets/pvk shop.webp";
import { Award, Users, Target, Heart, ArrowRight } from "lucide-react";

const valueHighlights = [
  {
    title: "Quality Excellence",
    description:
      "We maintain the highest standards in trophy manufacturing, ensuring every piece meets our rigorous quality requirements.",
    tag: "Craftsmanship",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    icon: Award,
  },
  {
    title: "Expert Team",
    description:
      "Our dedicated and experienced team brings creativity and expertise to every project we undertake.",
    tag: "People First",
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    icon: Users,
  },
  {
    title: "Custom Solutions",
    description:
      "We offer personalized trophy designs tailored to your specific requirements and preferences.",
    tag: "Tailored Design",
    gradient: "from-emerald-400 via-teal-500 to-blue-600",
    icon: Target,
  },
  {
    title: "Customer Commitment",
    description:
      "We are dedicated to delivering quality products and exceptional service to all our customers.",
    tag: "Service",
    gradient: "from-rose-400 via-orange-500 to-amber-500",
    icon: Heart,
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <PageBanner
          title="About Us"
          subtitle="Excellence in trophy manufacturing with quality craftsmanship and service."
          backgroundImage={trophyBanner}
        />

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
              <div className="group overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-border transition duration-500 hover:-translate-y-2 hover:shadow-[0_35px_90px_-35px_rgba(15,23,42,0.6)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted after:absolute after:inset-0 after:bg-gradient-to-br after:from-transparent after:to-black/10 after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-100">
                  <img
                    src={pvkShopImage}
                    alt="PVK Enterprises storefront exterior"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition duration-700 group-hover:opacity-100 group-hover:bg-white/10" />
                </div>
              </div>

              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Our Story</p>
                  <h2 className="mt-2 text-3xl font-bold text-foreground">Crafting Memories Since 2010</h2>
                </div>
                <p>
                  We, <strong>PVK ENTERPRISES</strong>, situated at Marancheri, Malappuram, Kerala,
                  are recognized as one of the best trophy and awards manufacturing companies. We
                  design elegant, traditional and modern trophies made from a selection of metals that
                  the clients can take their pick from.
                </p>
                <p>
                  We are committed to deliver quality products to our customers with our creative
                  approach in design and with the help of our dedicated and experienced team.
                </p>
              </div>
            </div>

            {/* Values Grid */}
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/70">Why PVK</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">What Sets Us Apart</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From design innovation to end-to-end craftsmanship, we deliver trophies and memorabilia that
                honor every achievement with excellence.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
              {valueHighlights.map(({ title, description, tag, gradient, icon: Icon }) => (
                <article
                  key={title}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-[1px] shadow-xl transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl`}
                >
                  <div className="relative flex h-full flex-col gap-6 rounded-[calc(1.5rem-1px)] bg-white/10 p-6 sm:p-8 text-white backdrop-blur">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em]">
                      {tag}
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                      <Icon className="h-7 w-7" strokeWidth={1.5} />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
                      <p className="text-base/relaxed text-white/90">{description}</p>
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
