import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart as LineChartIcon,
  Package,
  ShoppingBag,
  Users,
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
} from "@/data/adminMockData";

const AdminDashboard = () => {
  const monthlySales = getMonthlySalesTotal(mockOrders);
  const newOrders7Days = getNewOrdersCount(mockOrders, 7);
  const productsCount = allProducts.length;
  const newLeads7Days = getNewLeadsCount(mockLeads, 7);

  return (
    <AdminLayout title="Admin Overview">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sales (This Month)
            </CardTitle>
            <LineChartIcon className="h-5 w-5 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              ₹{monthlySales.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Sales analytics will appear here once orders start flowing in.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Orders (7 days)
            </CardTitle>
            <ShoppingBag className="h-5 w-5 text-sky-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {newOrders7Days}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              All incoming WhatsApp and online orders will be tracked here.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Products in Catalogue
            </CardTitle>
            <Package className="h-5 w-5 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {productsCount}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Loaded from the PVK mock catalogue (local mock database).
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Leads (7 days)
            </CardTitle>
            <Users className="h-5 w-5 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {newLeads7Days}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Leads from contact forms and special popups will be summarised
              here.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="order-2 border-border bg-card text-card-foreground shadow-sm lg:order-1 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold text-foreground">
                  Orders &amp; Customers
                </CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  High-level view of recent orders and customer activity.
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 text-[11px] uppercase tracking-wide text-white shadow-sm">
                Realtime-ready
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="orders" className="space-y-4">
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

              <TabsContent value="orders" className="space-y-3">
                <div className="rounded-md border border-dashed border-border bg-muted px-4 py-3 text-center text-xs text-muted-foreground sm:text-sm">
                  Showing recent mock orders captured from WhatsApp style enquiries and store walk-ins. Replace this
                  with a real API when backend is ready.
                </div>
                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Order ID
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Customer
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Date
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Grand Total
                        </TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="text-xs font-mono text-muted-foreground">{order.id}</TableCell>
                          <TableCell className="text-sm">{order.customerName}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("en-IN")}
                          </TableCell>
                          <TableCell className="text-sm">
                            ₹{order.total.toLocaleString("en-IN")}
                          </TableCell>
                          <TableCell className="text-xs">
                            <Badge variant="outline" className="text-[11px]">
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="customers" className="space-y-3">
                <div className="rounded-md border border-dashed border-border bg-muted px-4 py-3 text-center text-xs text-muted-foreground sm:text-sm">
                  Key customers aggregated from mock orders. Connect to your CRM or backend customer API when ready.
                </div>
                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Customer</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Email</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Phone</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">City</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Total Orders</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Last Order Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockCustomers.map((customer) => (
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
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="order-1 border-border bg-card text-card-foreground shadow-sm lg:order-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Sales Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-dashed border-border bg-muted px-4 py-6 text-center text-sm text-muted-foreground">
              Plug in your preferred charting library or use the built-in chart
              component to visualise weekly and monthly sales trends.
            </div>
            <div className="space-y-3 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Top Selling Products</span>
                <span className="text-foreground">Coming soon</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Average Order Value</span>
                <span className="text-foreground">Coming soon</span>
              </div>
              <div className="flex items-center justify-between">
                <span>New Orders (7 days)</span>
                <span className="text-foreground">0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Lead Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Use this space to track leads from the general <span className="font-semibold">Contact Us</span> form
              and from <span className="font-semibold">Special Service Popups</span>. Separate them as{" "}
              <span className="font-semibold">warm</span> or <span className="font-semibold">hot</span> leads based on
              interest.
            </p>
            <p>
              A dedicated table view for each lead source can be added here with filters, assignment to team members,
              and follow-up reminders.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">
              Admin Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Capture operational reminders for PVK Enterprises, such as low-stock thresholds, upcoming campaigns, or
              important customers to prioritise.
            </p>
            <p>
              This panel is intentionally open and spacious, optimised for quick reading and manual data entry on
              desktop, tablet, and mobile.
            </p>
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboard;


