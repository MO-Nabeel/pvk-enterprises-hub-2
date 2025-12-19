import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import GlobalSkeleton from "@/components/GlobalSkeleton";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Category = lazy(() => import("./pages/Category"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutUploadDesign = lazy(() => import("./pages/CheckoutUploadDesign"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Refund = lazy(() => import("./pages/Refund"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Terms = lazy(() => import("./pages/Terms"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminSpecialServices = lazy(() => import("./pages/admin/AdminSpecialServices"));
const AdminCustomers = lazy(() => import("./pages/admin/AdminCustomers"));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("./pages/admin/AdminOrders"));
const AdminSales = lazy(() => import("./pages/admin/AdminSales"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs"));
const AdminParameters = lazy(() => import("./pages/admin/AdminParameters"));
const CustomerProfile = lazy(() => import("./pages/CustomerProfile"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <Suspense fallback={<GlobalSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/upload-design" element={<CheckoutUploadDesign />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/privacy.html" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/refund.html" element={<Refund />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/shipping.html" element={<Shipping />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/terms.html" element={<Terms />} />
            <Route path="/profile" element={<CustomerProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/special-services" element={<AdminSpecialServices />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/sales" element={<AdminSales />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/blogs" element={<AdminBlogs />} />
            <Route path="/admin/parameters" element={<AdminParameters />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
