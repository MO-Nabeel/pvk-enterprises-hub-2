import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart as LineChartIcon,
  Package,
  ShoppingBag,
  Users,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { allProducts } from "@/data/productData";
import {
  getMonthlySalesTotal,
  getNewLeadsCount,
  getNewOrdersCount,
  mockCustomers,
  mockLeads,
  mockOrders,
  type MockOrder,
  type MockCustomer
} from "@/data/adminMockData";
import { useState, useEffect } from "react";
import { getLocalOrders } from "@/lib/orderStorage";
import { extractCustomersFromOrders } from "@/lib/extractCustomersFromOrders";

const AdminDashboard = () => {
  const [allOrders, setAllOrders] = useState<MockOrder[]>(mockOrders);
  const [allCustomers, setAllCustomers] = useState<MockCustomer[]>(mockCustomers);

  // Load local orders and merge with mock data
  useEffect(() => {
    const localOrders = getLocalOrders();
    // Transform local orders to match MockOrder type if needed, 
    // but getLocalOrders returns OrderPayload which is slightly different.
    // We need to map OrderPayload to MockOrder.
    // Actually getLocalOrders returns OrderPayload[].
    // MockOrder has { id, customerName, createdAt, total, status, details... }

    // Let's create a mapper function or map inline.
    const formattedLocal: MockOrder[] = localOrders.map(order => ({
      id: order.id,
      customerName: order.customer.name || order.customer.companyName || "Unknown",
      createdAt: order.submittedAt,
      total: order.totals.total,
      status: "New", // Default status for local orders
      details: {
        email: order.customer.email || "",
        phone: order.customer.phone || "",
        address: order.customer.address || "",
        items: order.cart,
        paymentMethod: order.fulfillmentMethod
      }
    }));

    const mergedOrders = [...formattedLocal, ...mockOrders];
    setAllOrders(mergedOrders);

    // Extract customers from merged orders to ensure consistency
    // Note: extractCustomersFromOrders puts newest first
    const extractedCustomers = extractCustomersFromOrders(mergedOrders);

    // If we want to keep the mock customers that might NOT be in orders (unlikely for mock data logic but possible),
    // we could merge. But extractCustomersFromOrders is based on ORDERS.
    // The current mockCustomers are static. Let's just use the extracted ones + mockCustomers merge?
    // Actually, extractCustomersFromOrders(mergedOrders) will only get customers FROM the orders.
    // Mock orders are in mergedOrders, so their customers will be extracted.
    // This is cleaner.
    setAllCustomers(extractedCustomers);
  }, []);

  const monthlySales = getMonthlySalesTotal(allOrders);
  const newOrders7Days = getNewOrdersCount(allOrders, 7);
  const productsCount = allProducts.length;
  const newLeads7Days = getNewLeadsCount(mockLeads, 7);

  return (
    <AdminLayout title="Admin Overview">
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-emerald-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <LineChartIcon className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-600/80 dark:text-emerald-400">
              Total Sales
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
              <LineChartIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              ₹{monthlySales.toLocaleString("en-IN")}
            </div>
            <p className="mt-3 text-xs font-semibold text-emerald-600/80 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">
              +4.5% vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-sky-50/80 via-white to-sky-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-sky-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <ShoppingBag className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-sky-600/80 dark:text-sky-400">
              New Orders (7d)
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-sky-100 dark:ring-sky-900/30 group-hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {newOrders7Days}
            </div>
            <p className="mt-3 text-xs font-semibold text-sky-600/80 dark:text-sky-400 flex items-center gap-1.5 bg-sky-50/50 dark:bg-sky-900/20 w-fit px-2 py-1 rounded-full">
              Processing & Ready
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-violet-50/80 via-white to-violet-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-violet-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Package className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-violet-600/80 dark:text-violet-400">
              Products
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-violet-100 dark:ring-violet-900/30 group-hover:scale-110 transition-transform duration-300">
              <Package className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {productsCount}
            </div>
            <p className="mt-3 text-xs font-semibold text-violet-600/80 dark:text-violet-400 flex items-center gap-1.5 bg-violet-50/50 dark:bg-violet-900/20 w-fit px-2 py-1 rounded-full">
              Active Catalogue Items
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-amber-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Users className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-600/80 dark:text-amber-400">
              New Leads (7d)
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-amber-100 dark:ring-amber-900/30 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {newLeads7Days}
            </div>
            <p className="mt-3 text-xs font-semibold text-amber-600/80 dark:text-amber-400 flex items-center gap-1.5 bg-amber-50/50 dark:bg-amber-900/20 w-fit px-2 py-1 rounded-full">
              Waiting for action
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="order-2 lg:order-1 lg:col-span-2 min-w-0 rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-slate-950/50">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100/50 dark:border-slate-800/50">
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Orders &amp; Customers
                </CardTitle>
                <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Recent activity overview
                </p>
              </div>
              {/* Simplified tabs for dashboard view */}
              <Tabs defaultValue="orders" className="w-auto">
                <TabsList className="bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
                  <TabsTrigger value="orders" className="rounded-full px-4 text-xs font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white">Orders</TabsTrigger>
                  <TabsTrigger value="customers" className="rounded-full px-4 text-xs font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white">Customers</TabsTrigger>
                </TabsList>

                {/* Content will be outside because we need it to span full width below header */}
                {/* Note: This structure with Tabs inside header but Content outside is tricky in React without separation. 
                         For simplicity in this file, we will keep Tabs structure wrapping specific contents or refactor slightly.
                         Let's keep the original structure but style it.
                      */}
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="orders" className="w-full">
              {/* Hidden tabs list to control state if we had separated triggers, 
                   but here we will just put the triggers back inside the content area for standard behavior 
                   OR (Better) - Just use a standard Tabs layout inside CardContent if simplification is desired.
                   
                   Let's stick to a cleaner unified layout.
                */}
              <div className="p-4 sm:p-6">
                <Tabs defaultValue="orders">
                  <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Recent Records
                      </h3>
                    </div>
                    {/* Using the outer tabs list mostly, but keeping this for structure if needed later, hidden for now to avoid duplication visually */}
                    <div className="hidden">
                      <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-lg h-8">
                        <TabsTrigger value="orders" className="text-xs h-6 px-3 rounded-md">Orders</TabsTrigger>
                        <TabsTrigger value="customers" className="text-xs h-6 px-3 rounded-md">Customers</TabsTrigger>
                      </TabsList>
                    </div>
                  </div>

                  <TabsContent value="orders" className="mt-0">
                    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-sm bg-white dark:bg-slate-950">
                      <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                          <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                            <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pl-6 h-12">Order ID</TableHead>
                            <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Customer</TableHead>
                            <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Total</TableHead>
                            <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pr-6 h-12 text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allOrders.slice(0, 5).map((order) => (
                            <TableRow key={order.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 border-slate-100 dark:border-slate-800 transition-colors">
                              <TableCell className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400 pl-6 py-4 group-hover:text-blue-600 transition-colors">{order.id}</TableCell>
                              <TableCell className="text-sm font-semibold text-slate-900 dark:text-slate-200 py-4">{order.customerName}</TableCell>
                              <TableCell className="text-sm font-medium text-slate-900 dark:text-slate-200 py-4">₹{order.total.toLocaleString("en-IN")}</TableCell>
                              <TableCell className="text-xs pr-6 py-4 text-right">
                                <Badge variant="outline" className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border-0 rounded-full shadow-sm
                                        ${order.status === 'New' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-400/20' : ''}
                                        ${order.status === 'Processing' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-700/10 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-400/20' : ''}
                                        ${order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-700/10 dark:bg-purple-900/20 dark:text-purple-400 dark:ring-purple-400/20' : ''}
                                        ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-400/20' : ''}
                                    `}>
                                  {order.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="mt-4 text-center">
                      <a href="/admin/orders" className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors py-2 px-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50">
                        View all orders <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </TabsContent>

                  <TabsContent value="customers" className="mt-0">
                    <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-sm bg-white dark:bg-slate-950">
                      <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                          <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                            <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pl-6 h-12">Customer</TableHead>
                            <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">City</TableHead>
                            <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pr-6 h-12 text-right">Orders</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {allCustomers.slice(0, 5).map((customer) => (
                            <TableRow key={customer.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 border-slate-100 dark:border-slate-800 transition-colors">
                              <TableCell className="text-sm font-semibold text-slate-900 dark:text-slate-200 pl-6 py-4 group-hover:text-violet-600 transition-colors">{customer.name}</TableCell>
                              <TableCell className="text-sm text-slate-500 py-4">{customer.city}</TableCell>
                              <TableCell className="text-xs pr-6 py-4 text-right">
                                <span className="inline-flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 h-6 px-3 rounded-full text-[11px] font-bold shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
                                  {customer.totalOrders}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-4 text-center">
                      <a href="/admin/customers" className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors py-2 px-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50">
                        View customer directory <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Tabs>
          </CardContent>
        </Card >

        <Card className="order-1 lg:order-2 min-w-0 rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-slate-950/50 group">
          <CardHeader className="border-b border-slate-100/50 dark:border-slate-800/50 pb-4">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Sales Snapshot
            </CardTitle>
            <p className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
              Real-time performance
            </p>
          </CardHeader>
          <CardContent className="space-y-8 pt-8">
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-10 text-center text-sm text-slate-500 relative overflow-hidden group-hover:border-slate-400 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent dark:from-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <LineChartIcon className="h-12 w-12 mx-auto mb-4 text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500" />
              <p className="max-w-[80%] mx-auto font-medium leading-relaxed">
                Plug in your preferred charting library or use the built-in chart
                component to visually track weekly and monthly sales trends.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <span>Top Selling Products</span>
                  <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full text-[10px]">Coming soon</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[0%] relative">
                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  <span>Average Order Value</span>
                  <span className="text-sky-600 bg-sky-50 dark:bg-sky-900/30 px-2 py-0.5 rounded-full text-[10px]">Coming soon</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-sky-500 to-blue-400 w-[0%] relative">
                    <div className="absolute inset-0 bg-white/30 animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section >

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white/80 to-amber-50/50 dark:from-slate-950/80 dark:to-amber-900/10 backdrop-blur-sm group min-w-0 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 translate-y--10 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20 transition-colors pointer-events-none" />
          <CardHeader className="pb-3 border-b border-amber-100/50 dark:border-amber-900/10">
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-sm ring-1 ring-amber-200/50 dark:ring-amber-700/30">
                <Users className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Lead Management
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 text-sm text-slate-600 dark:text-slate-400 relative z-10">
            <p className="leading-relaxed">
              Use this space to track leads from the general <span className="font-bold text-slate-900 dark:text-slate-200">Contact Us</span> form
              and from <span className="font-bold text-slate-900 dark:text-slate-200">Special Service Popups</span>.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
                Warm Leads
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-900/30">
                Hot Leads
              </span>
            </div>
            <div className="pt-2">
              <a href="/admin/leads" className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 transition-colors py-2.5 px-5 rounded-full bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 shadow-sm hover:shadow-md ring-1 ring-amber-200/50 dark:ring-amber-800/50">
                Go to Lead Board <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl transition-all duration-300 bg-white/50 backdrop-blur-sm dark:bg-slate-950/50 group min-w-0 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 translate-y--10 rounded-full bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-colors pointer-events-none" />
          <CardHeader className="pb-3 border-b border-slate-100/50 dark:border-slate-800/50">
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm ring-1 ring-indigo-200/50 dark:ring-indigo-700/30">
                <FileText className="h-4 w-4" />
              </div>
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Admin Notes
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4 text-sm text-slate-600 dark:text-slate-400 relative z-10">
            <p className="leading-relaxed">
              Capture operational reminders for PVK Enterprises, such as low-stock thresholds, upcoming campaigns, or
              important customers to prioritise.
            </p>
            <div className="bg-yellow-50/80 dark:bg-yellow-900/20 border border-yellow-200/60 dark:border-yellow-900/30 rounded-2xl p-4 text-xs italic text-yellow-800 dark:text-yellow-200 shadow-sm">
              <div className="flex gap-2">
                <span className="font-bold text-yellow-600 dark:text-yellow-400 not-italic">Reminder:</span>
                "Check inventory levels for the new summer collection before Friday."
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </AdminLayout >
  );
};

export default AdminDashboard;


