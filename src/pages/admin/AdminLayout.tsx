import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
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
  children: ReactNode;
};

const adminMenuButtonClasses =
  "justify-start gap-2 rounded-full px-3 text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors data-[active=true]:bg-gradient-to-r data-[active=true]:from-sky-500 data-[active=true]:to-emerald-400 data-[active=true]:text-white";

const AdminLayout = ({ title = "Dashboard", children }: AdminLayoutProps) => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    // Theme-aware admin shell that follows the global light/dark theme.
    <SidebarProvider className="min-h-screen bg-background text-foreground">
      <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
        <SidebarHeader className="flex items-center gap-2 px-3 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={pvkLogo} alt="PVK Enterprises" className="h-9 w-auto rounded-lg bg-secondary p-1.5 object-contain shadow-sm" />
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold tracking-wide text-foreground">
                PVK Enterprises
              </span>
              <span className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Admin Control
              </span>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Overview
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin")}
                    tooltip="Dashboard"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin">
                      <LayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Operations
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/products")}
                    tooltip="Products & Inventory"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/products">
                      <Package />
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
                      <ShoppingBag />
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
                      <LineChart />
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
                      <Inbox />
                      <span>Lead Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/special-services")}
                    tooltip="Special Services"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/special-services">
                      <Sparkles />
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
                      <Users />
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
                      <FileText />
                      <span>Blog Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Settings
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActivePath("/admin/parameters")}
                    tooltip="Parameters"
                    className={adminMenuButtonClasses}
                  >
                    <Link to="/admin/parameters">
                      <Settings />
                      <span>Parameters</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border bg-sidebar">
          <div className="flex items-center justify-between gap-2 px-3 py-3">
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-xs font-medium text-sidebar-foreground">Admin</span>
              <span className="truncate text-[11px] text-muted-foreground">PVK Enterprises</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              type="button"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-background text-foreground">
        <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border bg-card/95 px-4 shadow-sm backdrop-blur-sm sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-3 md:gap-4">
            <SidebarTrigger className="lg:hidden text-muted-foreground hover:bg-muted" />
            <Separator orientation="vertical" className="h-6 bg-border" />
            <div className="flex min-w-0 flex-col">
              <h1
                className={cn(
                  "truncate text-lg font-semibold tracking-tight text-foreground",
                  "sm:text-xl md:text-2xl",
                )}
              >
                {title}
              </h1>
              <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                Monitor products, orders, sales, and leads for PVK Enterprises.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
          </div>
        </header>
        <main className="flex-1 px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-7 lg:gap-8">
          {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;


