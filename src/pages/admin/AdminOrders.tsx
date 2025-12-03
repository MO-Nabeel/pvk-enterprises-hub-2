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
              <TabsList className="bg-muted">
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="customers"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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

                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Order ID</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Customer</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Date</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground text-right">
                          Grand Total
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="text-xs font-mono text-muted-foreground">{order.id}</TableCell>
                          <TableCell className="text-sm">{order.customerName}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("en-IN")}
                          </TableCell>
                          <TableCell className="text-sm text-right">
                            ₹{order.total.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-xs">
                            <Badge variant="outline" className="text-[11px]">
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredOrders.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
                            No orders match your filters yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
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

                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Customer</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Email</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Phone</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">City</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Total Orders
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Last Order Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell className="text-sm font-medium">{customer.name}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{customer.email}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{customer.phone}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{customer.city}</TableCell>
                          <TableCell className="text-sm">{customer.totalOrders}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(customer.lastOrderDate).toLocaleDateString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredCustomers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="py-6 text-center text-xs text-muted-foreground">
                            No customers match your search yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
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


