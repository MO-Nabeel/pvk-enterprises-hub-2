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
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-emerald-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <IndianRupee className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-600/80 dark:text-emerald-400">
              Total Revenue (mock)
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
              <IndianRupee className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              ₹{totalSales.toLocaleString("en-IN")}
            </div>
            <p className="mt-3 text-xs font-semibold text-emerald-600/80 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">
              Replace with live data when your backend API is connected.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-sky-50/80 via-white to-sky-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-sky-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <LineChartIcon className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-sky-600/80 dark:text-sky-400">
              Average Order Value
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-sky-100 dark:ring-sky-900/30 group-hover:scale-110 transition-transform duration-300">
              <LineChartIcon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              ₹{averageOrderValue.toLocaleString("en-IN")}
            </div>
            <p className="mt-3 text-xs font-semibold text-sky-600/80 dark:text-sky-400 flex items-center gap-1.5 bg-sky-50/50 dark:bg-sky-900/20 w-fit px-2 py-1 rounded-full">
              Helps you plan offers &amp; campaign targets.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-violet-50/80 via-white to-violet-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-violet-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <BarChart3 className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-violet-600/80 dark:text-violet-400">
              Channel Performance
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-violet-100 dark:ring-violet-900/30 group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 relative z-10 mt-2">
            {mockChannelBreakdown.map((item) => (
              <div key={item.channel} className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-semibold">{item.channel}</span>
                <span className="flex items-center gap-2">
                  <span className="font-black text-slate-900 dark:text-slate-100">{item.value}%</span>
                  <Badge
                    variant="outline"
                    className="border-0 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-[10px] px-1.5 py-0 rounded-full font-bold shadow-sm"
                  >
                    <ArrowUpRight className="mr-0.5 h-3 w-3" />
                    {item.trend}
                  </Badge>
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-amber-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <TrendingUp className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-600/80 dark:text-amber-400">
              Refunds & Discounts
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-amber-100 dark:ring-amber-900/30 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-xs relative z-10 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">Refunds (approx)</span>
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-black text-sm">
                <ArrowDownRight className="h-4 w-4" />
                2.3%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-400 font-semibold">Average Discount</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                <ArrowUpRight className="h-4 w-4" />
                9.8%
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-amber-600/80 dark:text-amber-400 flex items-center gap-1.5 bg-amber-50/50 dark:bg-amber-900/20 w-fit px-2 py-1 rounded-full">
              Keep these in check to protect margins.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm lg:col-span-2">
          <CardHeader className="px-6 pt-6 pb-2 border-b border-slate-100/50 dark:border-slate-800/50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Sales overview</CardTitle>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Weekly and monthly trends
                </p>
              </div>
              <Badge className="w-fit bg-gradient-to-r from-cyan-500 to-emerald-500 text-[10px] font-bold uppercase tracking-wider text-white shadow-md hover:shadow-lg transition-all border-0 px-3 py-1 rounded-full">
                Mock analytics
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 px-8 py-8">
            <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 px-6 py-16 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent dark:from-slate-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="mx-auto w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform duration-500 relative z-10">
                <BarChart3 className="h-8 w-8 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 transition-colors" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 relative z-10">Chart Component Placeholder</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed relative z-10">
                Plug in a chart component here (e.g. line chart for sales, bar chart for category-wise revenue). The shell is fully responsive.
              </p>
            </div>
            <Tabs defaultValue="weekly" className="space-y-4">
              <TabsList className="bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 h-auto w-fit">
                <TabsTrigger
                  value="weekly"
                  className="rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white transition-all"
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  className="rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white transition-all"
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
              <TabsContent value="weekly" className="text-xs text-slate-500 font-medium pl-2">
                A compact weekly breakdown with mocked numbers. Replace with live API later.
              </TabsContent>
              <TabsContent value="monthly" className="text-xs text-slate-500 font-medium pl-2">
                Summary of the current month&apos;s performance across all channels.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm h-fit">
          <CardHeader className="px-6 pt-6 pb-4 border-b border-slate-100/50 dark:border-slate-800/50">
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 px-6 py-6">
            <div className="space-y-3">
              {mockTopProducts.map((item, i) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 p-4 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shadow-inner">
                      {i + 1}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-[10px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400">Share: {item.share}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                      ₹{item.revenue.toLocaleString("en-IN")}
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">est</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100/50 dark:border-blue-900/20 p-5 mt-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-blue-900/40 rounded-xl shrink-0 shadow-sm text-blue-600 dark:text-blue-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">Growth Insight</h4>
                  <p className="text-xs text-blue-800/80 dark:text-blue-200/80 mt-1 leading-relaxed">
                    Trophies & Awards category has seen a <strong className="font-bold text-blue-700 dark:text-blue-100">15% increase</strong> in revenue.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdminSales;


