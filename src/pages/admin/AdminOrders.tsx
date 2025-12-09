import { useMemo, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { mockCustomers, mockOrders, type OrderStatus } from "@/data/adminMockData";
import { ShoppingBag, Users } from "lucide-react";

type OrdersTab = "orders" | "customers";

const statusOptions: (OrderStatus | "All")[] = ["All", "New", "Processing", "Shipped", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [activeTab, setActiveTab] = useState<OrdersTab>("orders");
  const [orderSearch, setOrderSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [customerSearch, setCustomerSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const query = orderSearch.trim().toLowerCase();
    return mockOrders.filter((order) => {
      const matchesStatus = statusFilter === "All" ? true : order.status === statusFilter;
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [orderSearch, statusFilter]);

  const filteredCustomers = useMemo(() => {
    const query = customerSearch.trim().toLowerCase();
    if (!query) return mockCustomers;
    return mockCustomers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.city.toLowerCase().includes(query)
      );
    });
  }, [customerSearch]);

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = mockOrders.length;
  const totalCustomers = mockCustomers.length;

  return (
    <AdminLayout title="Orders & Customers">
      {/* KPI row */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue (mock)
            </CardTitle>
            <ShoppingBag className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Based on sample orders. Connect your real backend API when ready.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders (mock)
            </CardTitle>
            <Badge
              variant="outline"
              className="border-emerald-500/40 bg-emerald-500/5 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-300"
            >
              {totalOrders} total
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Track enquiry-based orders and WhatsApp confirmations in one place.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customers (mock)
            </CardTitle>
            <Users className="h-5 w-5 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {totalCustomers}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Key repeat customers you can sync with your CRM later.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Main Orders & Customers workspace */}
      <section className="space-y-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold text-foreground">
                  Orders &amp; Customers
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Search, filter, and review order activity and customer insights. Fully responsive for desktop and mobile.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as OrdersTab)} className="space-y-4">
              <TabsList className="bg-muted rounded-full p-1 w-full sm:w-auto flex flex-row justify-center sm:justify-start">
                <TabsTrigger
                  value="orders"
                  className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 transition-colors data-[state=active]:!text-white data-[state=active]:shadow-md data-[state=active]:!bg-[linear-gradient(90deg,#00c6ff_0%,#00d97e_100%)] flex-1 sm:flex-initial"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="customers"
                  className="rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 transition-colors data-[state=active]:!text-white data-[state=active]:shadow-md data-[state=active]:!bg-[linear-gradient(90deg,#00c6ff_0%,#00d97e_100%)] flex-1 sm:flex-initial"
                >
                  Customers
                </TabsTrigger>
              </TabsList>

              {/* Orders tab */}
              <TabsContent value="orders" className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      placeholder="Search by order ID or customer..."
                      className="h-9 text-sm"
                      value={orderSearch}
                      onChange={(event) => setOrderSearch(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 md:w-60">
                    <Select
                      value={statusFilter}
                      onValueChange={(value) => setStatusFilter(value as OrderStatus | "All")}
                    >
                      <SelectTrigger className="h-9 text-xs sm:text-sm">
                        <SelectValue placeholder="All statuses" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status === "All" ? "All statuses" : status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border border-border bg-card -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <Table className="min-w-[640px] sm:min-w-full">
                        <TableHeader className="bg-muted/60">
                          <TableRow>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">Order ID</TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">Customer</TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">Date</TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground text-right px-2 sm:px-4">
                              Grand Total
                            </TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="text-[10px] xs:text-xs font-mono text-muted-foreground px-2 sm:px-4">{order.id}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{order.customerName}</TableCell>
                              <TableCell className="text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">
                                {new Date(order.createdAt).toLocaleDateString("en-IN")}
                              </TableCell>
                              <TableCell className="text-xs sm:text-sm text-right px-2 sm:px-4">
                                ₹{order.total.toLocaleString("en-IN")}
                              </TableCell>
                              <TableCell className="text-[10px] xs:text-xs px-2 sm:px-4">
                                <Badge variant="outline" className="text-[10px] xs:text-[11px]">
                                  {order.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredOrders.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="py-6 text-center text-xs text-muted-foreground px-4">
                                No orders match your filters yet.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Customers tab */}
              <TabsContent value="customers" className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      placeholder="Search by name, email, or city..."
                      className="h-9 text-sm"
                      value={customerSearch}
                      onChange={(event) => setCustomerSearch(event.target.value)}
                    />
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border border-border bg-card -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <Table className="min-w-[800px] sm:min-w-full">
                        <TableHeader className="bg-muted/60">
                          <TableRow>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">Customer</TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">Email</TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">Phone</TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">City</TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">
                              Total Orders
                            </TableHead>
                            <TableHead className="whitespace-nowrap text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">
                              Last Order Date
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                              <TableCell className="text-xs sm:text-sm font-medium px-2 sm:px-4">{customer.name}</TableCell>
                              <TableCell className="text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4 break-all">{customer.email}</TableCell>
                              <TableCell className="text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">{customer.phone}</TableCell>
                              <TableCell className="text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">{customer.city}</TableCell>
                              <TableCell className="text-xs sm:text-sm px-2 sm:px-4">{customer.totalOrders}</TableCell>
                              <TableCell className="text-[10px] xs:text-xs text-muted-foreground px-2 sm:px-4">
                                {new Date(customer.lastOrderDate).toLocaleDateString("en-IN")}
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredCustomers.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6} className="py-6 text-center text-xs text-muted-foreground px-4">
                                No customers match your search yet.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdminOrders;


