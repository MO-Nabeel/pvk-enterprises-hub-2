import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Checkout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 bg-muted/30">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-background border rounded-2xl shadow-sm p-8 text-center space-y-6">
          <p className="text-sm font-semibold text-primary tracking-wide uppercase">Checkout</p>
          <h1 className="text-3xl font-bold text-foreground">Secure Checkout Experience</h1>
          <p className="text-muted-foreground">
            This placeholder page is ready for your checkout flow. Integrate your preferred payment providers, billing
            forms, address collection, and confirmation steps here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/category">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Checkout;

