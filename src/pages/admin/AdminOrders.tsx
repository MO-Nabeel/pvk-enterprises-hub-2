import { useMemo, useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockOrders, type MockOrder, type OrderStatus, type MockCustomer } from "@/data/adminMockData";
import { extractCustomersFromOrders } from "@/lib/extractCustomersFromOrders";
import { getLocalOrders } from "@/lib/orderStorage";
import { OrderPayload } from "@/lib/orderSubmission";
import { cartHasVisitingCard } from "@/lib/cartRules";
import { ShoppingBag, Users, FileImage } from "lucide-react";

type OrdersTab = "orders" | "customers";

const statusOptions: (OrderStatus | "All")[] = ["All", "New", "Processing", "Shipped", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState<OrdersTab>("orders");
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [customerSearch, setCustomerSearch] = useState("");
  const [allOrders, setAllOrders] = useState<MockOrder[]>(mockOrders);
  const [customers, setCustomers] = useState<MockCustomer[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<MockOrder | null>(null);

  // Load local orders on mount
  useEffect(() => {
    const local = getLocalOrders();
    const formattedLocal: MockOrder[] = local.map((o) => ({
      id: o.id,
      customerName: o.customer.name || o.customer.companyName || "Unknown",
      createdAt: o.submittedAt,
      total: o.totals.total,
      status: "New", // Default status for new local orders
      designUrl: cartHasVisitingCard(o.cart) ? o.designUpload?.url : undefined,
      details: {
        email: o.customer.email,
        phone: o.customer.phone,
        address: o.customer.address,
        items: o.cart,
        paymentMethod: o.fulfillmentMethod,
        additionalInfo: o.customer
      }
    }));

    // Merge: Newest local orders first, then mock orders
    const mergedOrders = [...formattedLocal, ...mockOrders];
    setAllOrders(mergedOrders);

    // Extract customers from all orders
    const extractedCustomers = extractCustomersFromOrders(mergedOrders);
    setCustomers(extractedCustomers);
  }, []);

  const filteredOrders = useMemo(() => {
    const query = orderSearch.trim().toLowerCase();
    return allOrders.filter((order) => {
      const matchesStatus = statusFilter === "All" ? true : order.status === statusFilter;
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [allOrders, orderSearch, statusFilter]);

  const filteredCustomers = useMemo(() => {
    const query = customerSearch.trim().toLowerCase();
    if (!query) return customers;
    return customers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.city.toLowerCase().includes(query)
      );
    });
  }, [customerSearch, customers]);

  const totalRevenue = allOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = allOrders.length;
  const totalCustomers = customers.length;

  return (
    <AdminLayout title="Orders & Customers">
      {/* KPI row */}
      {/* KPI row */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-blue-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <ShoppingBag className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-blue-600/80 dark:text-blue-400">
              Total Revenue
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-blue-100 dark:ring-blue-900/30 group-hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="mt-3 text-xs font-semibold text-blue-600/80 dark:text-blue-400 flex items-center gap-1.5 bg-blue-50/50 dark:bg-blue-900/20 w-fit px-2 py-1 rounded-full">
              <span className="text-lg leading-none">↑</span> 12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-emerald-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <FileImage className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-600/80 dark:text-emerald-400">
              Active Orders
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
              <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{allOrders.length}</span>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {totalOrders}
            </div>
            <p className="mt-3 text-xs font-semibold text-emerald-600/80 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Encrypted & Secure
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-sky-50/80 via-white to-sky-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-sky-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Users className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-sky-600/80 dark:text-sky-400">
              Total Customers
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-sky-100 dark:ring-sky-900/30 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {totalCustomers}
            </div>
            <p className="mt-3 text-xs font-semibold text-sky-600/80 dark:text-sky-400 flex items-center gap-1.5 bg-sky-50/50 dark:bg-sky-900/20 w-fit px-2 py-1 rounded-full">
              Across all regions
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Main Orders & Customers workspace */}
      <section className="space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-premium group transition-all hover:bg-white/80 dark:hover:bg-slate-950/80">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              Orders & Customers
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Manage your orders and customer relationships.
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrdersTab)} className="w-full md:w-auto">
            <TabsList className="bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-full w-full md:w-auto border border-slate-200/50 dark:border-slate-800/50">
              <TabsTrigger
                value="orders"
                className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="customers"
                className="rounded-full px-6 py-2.5 text-sm font-semibold transition-all data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
              >
                Customers
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} className="space-y-6">
          {/* Orders tab */}
          <TabsContent value="orders" className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2 max-w-md">
                <div className="relative w-full">
                  {/* Search Icon Placeholder */}
                  <Input
                    placeholder="Search orders..."
                    className="h-10 w-full bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-slate-400 pl-4"
                    value={orderSearch}
                    onChange={(event) => setOrderSearch(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as OrderStatus | "All")}
                >
                  <SelectTrigger className="h-10 w-full md:w-[180px] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status} className="focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">
                        {status === "All" ? "All Statuses" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-premium overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-12 w-[140px] px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                        Total
                      </TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</TableHead>
                      <TableHead className="h-12 w-[80px] px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Design</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        className="cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 last:border-0"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <TableCell className="px-6 py-4">
                          <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded">
                            {order.id}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{order.customerName}</div>
                            {order.details?.email && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]" title={order.details.email}>
                                {order.details.email}
                              </div>
                            )}
                            {order.details?.phone && (
                              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                                {order.details.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-sm text-slate-500">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: '2-digit', month: 'short', year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-slate-100 text-right">
                          ₹{order.total.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-center">
                          <Badge
                            variant="outline"
                            className={`
                                    px-2.5 py-0.5 text-[11px] font-medium border-0 rounded-full
                                    ${order.status === 'New' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                                    ${order.status === 'Processing' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                                    ${order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : ''}
                                    ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                                    ${order.status === 'Cancelled' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                                `}
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-center">
                          {order.designUrl ? (
                            <a
                              href={order.designUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-blue-900/20 mx-auto"
                              title="View Design"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FileImage className="h-4 w-4" />
                            </a>
                          ) : (
                            <span className="text-slate-300 dark:text-slate-700">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredOrders.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-500">
                            <ShoppingBag className="h-8 w-8 mb-2 opacity-20" />
                            <p className="text-sm">No orders found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Customers tab */}
          <TabsContent value="customers" className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Search by name, email, or city..."
                  className="h-10 text-sm bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  value={customerSearch}
                  onChange={(event) => setCustomerSearch(event.target.value)}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-premium overflow-hidden">
              <div className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader className="bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">City</TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                        Total Orders
                      </TableHead>
                      <TableHead className="h-12 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Last Order Date
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow
                        key={customer.id}
                        className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 last:border-0"
                      >
                        <TableCell className="px-6 py-4">
                          <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{customer.name}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-400 break-all max-w-[250px]">{customer.email}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-400 font-mono">{customer.phone}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="text-sm text-slate-600 dark:text-slate-400">{customer.city}</div>
                        </TableCell>
                        <TableCell className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                            {customer.totalOrders}
                          </span>
                        </TableCell>
                        <TableCell className="px-6 py-4">
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(customer.lastOrderDate).toLocaleDateString("en-IN", {
                              day: '2-digit', month: 'short', year: 'numeric'
                            })}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-32 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-500">
                            <Users className="h-8 w-8 mb-2 opacity-20" />
                            <p className="text-sm">No customers found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-none shadow-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl rounded-3xl">
          <DialogHeader className="mb-6 pb-4 border-b border-slate-100 dark:border-slate-800/50">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Order Details
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
              Reference ID: <span className="font-mono font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded text-xs tracking-wide">{selectedOrder?.id}</span>
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Status & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Order Placed On</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN", {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`
                    h-fit px-3 py-1 text-xs font-semibold border-0 ring-1 ring-inset rounded-full
                    ${selectedOrder.status === 'New' ? 'bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-400/30' : ''}
                    ${selectedOrder.status === 'Processing' ? 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-400/30' : ''}
                    ${selectedOrder.status === 'Shipped' ? 'bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-900/20 dark:text-purple-400 dark:ring-purple-400/30' : ''}
                    ${selectedOrder.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-400/30' : ''}
                    ${selectedOrder.status === 'Cancelled' ? 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-400/30' : ''}
                  `}
                >
                  {selectedOrder.status}
                </Badge>
              </div>

              {/* Customer Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-3">
                  <Users className="h-4 w-4" /> Customer & Delivery
                </h4>
                <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-5 space-y-3 text-sm shadow-sm">
                  <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline">
                    <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Customer</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100 break-words">{selectedOrder.customerName}</span>
                  </div>
                  {selectedOrder.details?.email && (
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Email</span>
                      <span className="break-all text-slate-700 dark:text-slate-300">{selectedOrder.details.email}</span>
                    </div>
                  )}
                  {selectedOrder.details?.phone && (
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Phone</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{selectedOrder.details.phone}</span>
                    </div>
                  )}
                  {selectedOrder.details?.address && (
                    <div className="grid grid-cols-[120px_1fr] gap-2 items-baseline border-t border-slate-50 dark:border-slate-800/50 pt-3 mt-1">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Address</span>
                      <span className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">{selectedOrder.details.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Info */}
              {selectedOrder.details?.paymentMethod && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Payment & Fulfillment</h4>
                  <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/30 p-5 text-sm shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-medium uppercase">Method:</span>
                      <Badge variant="secondary" className="font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 rounded-lg">{selectedOrder.details.paymentMethod}</Badge>
                    </div>

                    {/* Show extra bank details if available (Online Payment) */}
                    {selectedOrder.details.paymentMethod === "Online Payment" && selectedOrder.details.additionalInfo && (
                      <div className="mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-700 space-y-1">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase mb-2">Bank Details Provided:</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                            <span className="block text-slate-400 text-[10px] uppercase">Bank</span>
                            <span className="font-medium">{selectedOrder.details.additionalInfo.bankName}</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
                            <span className="block text-slate-400 text-[10px] uppercase">Account</span>
                            <span className="font-medium font-mono">{selectedOrder.details.additionalInfo.accountNumber}</span>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl col-span-2">
                            <span className="block text-slate-400 text-[10px] uppercase">IFSC</span>
                            <span className="font-medium font-mono">{selectedOrder.details.additionalInfo.ifscCode}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-3">
                  <ShoppingBag className="h-4 w-4" /> Order Items
                </h4>
                {selectedOrder.details?.items ? (
                  <div className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-slate-900/30">
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedOrder.details.items.map((item, idx) => (
                        <div key={idx} className="p-4 flex gap-4 text-sm group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                          <div className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="flex-1 min-w-0 py-1">
                            <p className="font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">{item.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Quantity: <span className="font-medium text-slate-700 dark:text-slate-300">{item.quantity}</span></p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Unit Price: <span className="font-medium text-slate-700 dark:text-slate-300">₹{item.price}</span></p>
                          </div>
                          <div className="text-right font-bold text-slate-900 dark:text-slate-100 py-1">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/80 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Amount</span>
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹{selectedOrder.total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Item details not available for this legacy/mock order.</p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout >
  );
};

export default AdminOrders;


