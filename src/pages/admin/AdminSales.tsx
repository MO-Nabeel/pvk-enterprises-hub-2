import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  LineChart as LineChartIcon,
  BarChart3,
  TrendingUp,
  IndianRupee,
  ArrowDownRight,
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
import { mockOrders } from "@/data/adminMockData";

const AdminSales = () => {
  const totalSales = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = mockOrders.length ? Math.round(totalSales / mockOrders.length) : 0;

  // Simple mock breakdowns
  const mockChannelBreakdown = [
    { channel: "In-store / Walk-in", value: 52, trend: "+8%" },
    { channel: "WhatsApp / Phone", value: 31, trend: "+4%" },
    { channel: "Website Enquiries", value: 17, trend: "+2%" },
  ];

  const mockTopProducts = [
    { name: "Trophies & Awards", share: "38%", revenue: 18450 },
    { name: "Office Stationery", share: "27%", revenue: 13220 },
    { name: "Custom Printing", share: "19%", revenue: 9450 },
    { name: "Printer Supplies", share: "16%", revenue: 7650 },
  ];

  return (
    <AdminLayout title="Sales & Reporting">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue (mock)</CardTitle>
            <IndianRupee className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              ₹{totalSales.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Replace with live data when your backend API is connected.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Order Value</CardTitle>
            <LineChartIcon className="h-5 w-5 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              ₹{averageOrderValue.toLocaleString("en-IN")}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Helps you plan offers &amp; campaign targets.</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Channel Performance</CardTitle>
            <BarChart3 className="h-5 w-5 text-violet-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            {mockChannelBreakdown.map((item) => (
              <div key={item.channel} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{item.channel}</span>
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-foreground">{item.value}%</span>
                  <Badge
                    variant="outline"
                    className="border-emerald-500/40 bg-emerald-500/5 text-[10px] text-emerald-600"
                  >
                    <ArrowUpRight className="mr-0.5 h-3 w-3" />
                    {item.trend}
                  </Badge>
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Refunds & Discounts</CardTitle>
            <TrendingUp className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Refunds (approx)</span>
              <span className="flex items-center gap-1 text-red-500">
                <ArrowDownRight className="h-3 w-3" />
                2.3%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Average Discount</span>
              <span className="flex items-center gap-1 text-emerald-600">
                <ArrowUpRight className="h-3 w-3" />
                9.8%
              </span>
            </div>
            <p className="mt-1">
              Keep these in check to protect margins while still rewarding loyal customers.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border bg-card text-card-foreground shadow-sm lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-base font-semibold text-foreground">Sales overview</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Weekly and monthly trends using your preferred charting library in the future.
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 text-[11px] uppercase tracking-wide text-white shadow-sm">
                Mock analytics
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-dashed border-border bg-muted px-4 py-8 text-center text-sm text-muted-foreground">
              Plug in a chart component here (e.g. line chart for sales, bar chart for category-wise revenue). The shell
              is fully responsive and ready for live data.
            </div>
            <Tabs defaultValue="weekly" className="space-y-3">
              <TabsList className="bg-muted rounded-full p-1">
                <TabsTrigger
                  value="weekly"
                  className="rounded-full px-4 py-2 text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e]"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="rounded-full px-4 py-2 text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e]"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
              <TabsContent value="weekly" className="text-xs text-muted-foreground">
                A compact weekly breakdown with mocked numbers. Replace with live API later.
              </TabsContent>
              <TabsContent value="monthly" className="text-xs text-muted-foreground">
                Summary of the current month&apos;s performance across all channels.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-foreground">Top-performing categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              {mockTopProducts.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-2 rounded-md border border-border/70 px-3 py-2">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground">Share: {item.share}</p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="font-semibold text-foreground">
                      ₹{item.revenue.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[11px] text-muted-foreground">est. revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdminSales;


