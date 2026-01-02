import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Inbox,
  LayoutDashboard,
  LineChart,
  LogOut,
  Package,
  Plus,
  ShoppingBag,
  Sparkles,
  Users,
  FileText,
  Settings,
} from "lucide-react";
import pvkLogo from "@/assets/pvk logo (1).png";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";

type AdminLayoutProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
};

const adminMenuButtonClasses =
  "justify-start gap-3 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all duration-200 data-[active=true]:bg-white data-[active=true]:text-slate-900 data-[active=true]:font-semibold data-[active=true]:shadow-lg mb-0.5";

const AdminLayout = ({ title = "Dashboard", subtitle, children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActivePath = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    // Dark navy theme inspired by modern admin interfaces
    <SidebarProvider className="min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground font-sans">
      <Sidebar
        collapsible="icon"
        className="border-r-0 transition-all duration-300 z-50 overflow-hidden [&>div[data-sidebar='content']]:!overflow-hidden [&_[data-sidebar='sidebar']]:!bg-gradient-to-b [&_[data-sidebar='sidebar']]:!from-slate-900 [&_[data-sidebar='sidebar']]:!via-slate-900 [&_[data-sidebar='sidebar']]:!to-slate-950 [&_[data-sidebar='sidebar']]:!overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, rgb(15 23 42), rgb(15 23 42), rgb(2 6 23))',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)'
        } as React.CSSProperties}
      >
        <SidebarHeader className="flex items-center gap-2 px-6 py-4 pb-3">
          <Link to="/" className="flex items-center gap-3 group w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-30 rounded-full group-hover:opacity-40 transition-opacity" />
              <img src={pvkLogo} alt="PVK Enterprises" className="relative h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-base font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                PVK Enterprises
              </span>
              <span className="truncate text-[10px] font-medium uppercase tracking-widest text-slate-400">
                Admin Control
              </span>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarSeparator className="mx-6 my-0 bg-slate-700/50" />
        <SidebarContent className="gap-0 py-0">
          {/* Added consistent gap-0 and py-2 to sidebar content for better spacing control, relying on group margins */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="px-3 gap-0 mt-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin")}
                    tooltip="Dashboard"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin">
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="px-3 gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/products")}
                    tooltip="Products & Inventory"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/products">
                      <Package className="h-4 w-4" />
                      <span>Products &amp; Inventory</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/orders")}
                    tooltip="Orders & Customers"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/orders">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Orders &amp; Customers</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/sales")}
                    tooltip="Sales & Reporting"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/sales">
                      <LineChart className="h-4 w-4" />
                      <span>Sales &amp; Reporting</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/leads")}
                    tooltip="Lead Management"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/leads">
                      <Inbox className="h-4 w-4" />
                      <span>Lead Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-6 mt-5 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-3 gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/special-services")}
                    tooltip="Special Services"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/special-services">
                      <Sparkles className="h-4 w-4" />
                      <span>Special Services</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/customers")}
                    tooltip="Customer Directory"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/customers">
                      <Users className="h-4 w-4" />
                      <span>Customer Directory</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/blogs")}
                    tooltip="Blog Management"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/blogs">
                      <FileText className="h-4 w-4" />
                      <span>Blog Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>

        <SidebarFooter className="p-3 bg-transparent">
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                A
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold text-white">Admin User</span>
                <span className="truncate text-[10px] text-slate-400">PVK Enterprises</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700/50 transition-colors"
              type="button"
              onClick={() => navigate("/")}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-background text-foreground overflow-x-hidden w-full">
        <header className="sticky top-0 z-20 flex min-h-20 h-auto items-center border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/95 px-6 py-4 backdrop-blur-xl shadow-sm dark:shadow-slate-950/50 sm:px-8 lg:px-10">
          <div className="flex flex-1 items-center gap-4 md:gap-6">
            <SidebarTrigger className="lg:hidden shrink-0 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" />
            <Separator orientation="vertical" className="hidden sm:block h-8 bg-slate-200 dark:bg-slate-700" />
            <div className="flex min-w-0 flex-col gap-1.5">
              <h1
                className={cn(
                  "truncate text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent",
                  "sm:text-2xl md:text-3xl",
                )}
              >
                {title}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-tight break-words whitespace-normal font-medium">
                {subtitle || "Monitor products, orders, sales, and leads for PVK Enterprises."}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle className="hidden sm:inline-flex" />
          </div>
        </header>
        <main className="flex-1 px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-7 lg:gap-8">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
              {children}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;


