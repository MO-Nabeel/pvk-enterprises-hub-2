import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  CART_COUNT_EVENT,
  CartEventDetail,
  CartItem,
  getCartItems
} from "@/lib/cart";
import { cartHasVisitingCard } from "@/lib/cartRules";
import {
  clearStoredDesignUpload,
  formatFileSize,
  getStoredDesignUpload,
  isAcceptedDesignFile,
  persistDesignUpload,
  type DesignUpload
} from "@/lib/designUpload";
import { Upload, FileCheck, FileWarning, ArrowLeft, ArrowRight } from "lucide-react";

const ACCEPT_ATTR = ".pdf,.png,.jpg,.jpeg,.ai,.cdr";

const CheckoutUploadDesign = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>(() => getCartItems());
  const [design, setDesign] = useState<DesignUpload | null>(() => getStoredDesignUpload());
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const requiresDesignUpload = useMemo(() => cartHasVisitingCard(cartItems), [cartItems]);

  useEffect(() => {
    if (!requiresDesignUpload) {
      navigate("/checkout", { replace: true });
    }
  }, [requiresDesignUpload, navigate]);

  useEffect(() => {
    const sync = () => setCartItems(getCartItems());
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<CartEventDetail>).detail;
      if (detail && typeof detail === "object" && "items" in detail) {
        setCartItems(detail.items);
      } else {
        sync();
      }
    };

    window.addEventListener(CART_COUNT_EVENT, listener as EventListener);
    return () => window.removeEventListener(CART_COUNT_EVENT, listener as EventListener);
  }, []);

  const handleFile = async (file: File | null | undefined) => {
    if (!file) return;

    if (!isAcceptedDesignFile(file)) {
      setStatus("Please upload a PDF, PNG, JPG, AI, or CDR file.");
      return;
    }

    setIsSaving(true);
    setStatus(null);

    try {
      const saved = await persistDesignUpload(file);
      setDesign(saved);
    } catch {
      setStatus("We couldn't store your file. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = () => {
    if (!design) {
      setStatus("Upload your visiting card design to continue.");
      return;
    }
    navigate("/checkout");
  };

  const handleRemove = () => {
    clearStoredDesignUpload();
    setDesign(null);
    setStatus("Design removed. Please upload a new file to continue.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <p className="text-xs sm:text-sm font-semibold text-primary tracking-[0.25em] uppercase">
                Checkout
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                Upload Your Visiting Card Design
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Please upload a photo, scan, or design file of the visiting card you want printed.
                If you need a new design service, please contact us and our team will help you create one.
              </p>
            </div>

            <section className="rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 p-6 sm:p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">Design Upload Required</p>
                    <p className="text-xs sm:text-sm text-slate-600">
                      We need your visiting card artwork before proceeding to delivery details.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate("/cart")} className="rounded-2xl">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </Button>
                </div>

                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-6 sm:p-8 flex flex-col gap-4">
                  <label
                    className="cursor-pointer group flex flex-col items-center justify-center gap-3 text-center"
                    htmlFor="design-upload-input"
                  >
                    <div className="rounded-full bg-white border border-slate-200 p-3 shadow-sm group-hover:border-primary transition-colors">
                      <Upload className="h-6 w-6 text-slate-700 group-hover:text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-semibold text-slate-900">
                        Drag & drop or click to upload
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Accepted formats: PDF, PNG, JPG, AI, CDR (max 25 MB recommended)
                      </p>
                    </div>
                  </label>
                  <input
                    id="design-upload-input"
                    type="file"
                    accept={ACCEPT_ATTR}
                    className="hidden"
                    onChange={(event) => handleFile(event.target.files?.[0])}
                  />

                  {design ? (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
                      <FileCheck className="h-5 w-5 text-emerald-600" />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{design.name}</p>
                        <p className="text-xs text-slate-600">
                          {design.type} · {formatFileSize(design.size)}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleRemove} className="text-slate-700">
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                      <FileWarning className="h-5 w-5 text-amber-500" />
                      No file uploaded yet.
                    </div>
                  )}

                  {status && (
                    <div className="text-xs sm:text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                      {status}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto rounded-2xl"
                    onClick={() => navigate("/cart")}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </Button>
                  <Button
                    className="w-full sm:w-auto rounded-2xl bg-[#111827] text-white hover:bg-slate-900"
                    onClick={handleContinue}
                    disabled={!design || isSaving}
                  >
                    Continue to Delivery Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutUploadDesign;

