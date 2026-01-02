import AdminLayout from "./AdminLayout";
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";

type Segment = "all" | "retail" | "corporate" | "wholesale";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  segment: Segment;
  city: string;
  lastOrder: string;
};

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Sathish Kumar",
    email: "sathish@example.com",
    phone: "+91 98765 12345",
    segment: "retail",
    city: "Chennai",
    lastOrder: "Visiting cards",
  },
  {
    id: 2,
    name: "Athira Agencies",
    email: "billing@athira-agencies.com",
    phone: "+91 90031 56789",
    segment: "wholesale",
    city: "Chennai",
    lastOrder: "Printer supplies (bulk)",
  },
  {
    id: 3,
    name: "Kavin Tech Solutions",
    email: "admin@kavintech.in",
    phone: "+91 95510 33445",
    segment: "corporate",
    city: "Bengaluru",
    lastOrder: "Corporate ID cards",
  },
  {
    id: 4,
    name: "Priya Arts",
    email: "orders@priyaarts.in",
    phone: "+91 98400 77889",
    segment: "retail",
    city: "Chennai",
    lastOrder: "Custom mugs & T-shirts",
  },
];

const segmentBadgeStyles: Record<Segment, string> = {
  all: "",
  retail: "bg-sky-500/10 text-sky-500 border-sky-500/40",
  corporate: "bg-violet-500/10 text-violet-500 border-violet-500/40",
  wholesale: "bg-amber-500/10 text-amber-500 border-amber-500/40",
};

const AdminCustomers = () => {
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<Segment>("all");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return mockCustomers.filter((customer) => {
      const matchesSegment = segmentFilter === "all" ? true : customer.segment === segmentFilter;
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.city.toLowerCase().includes(query) ||
        customer.lastOrder.toLowerCase().includes(query);

      return matchesSegment && matchesSearch;
    });
  }, [search, segmentFilter]);

  const totalCustomers = mockCustomers.length;

  const corporateCount = useMemo(
    () => mockCustomers.filter((customer) => customer.segment === "corporate").length,
    [],
  );

  return (
    <AdminLayout title="Customer Directory">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-violet-50/80 via-white to-violet-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-violet-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Users className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-violet-600/80 dark:text-violet-400">
              Total customers (mock)
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-violet-100 dark:ring-violet-900/30 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {totalCustomers}
            </div>
            <p className="mt-3 text-xs font-semibold text-violet-600/80 dark:text-violet-400 flex items-center gap-1.5 bg-violet-50/50 dark:bg-violet-900/20 w-fit px-2 py-1 rounded-full">
              Sample data only – safe for local testing without exposing real customer information.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-indigo-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Users className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-indigo-600/80 dark:text-indigo-400">
              Corporate accounts
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-indigo-100 dark:ring-indigo-900/30 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {corporateCount}
            </div>
            <p className="mt-3 text-xs font-semibold text-indigo-600/80 dark:text-indigo-400 flex items-center gap-1.5 bg-indigo-50/50 dark:bg-indigo-900/20 w-fit px-2 py-1 rounded-full">
              Ideal targets for retainers, annual contracts, and bulk printing agreements.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Users className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-600/80 dark:text-slate-400">
              How to use this view
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-slate-100 dark:ring-slate-800/30 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 mt-2 relative z-10">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Quickly search &amp; filter
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-[90%]">
              Search by name, phone, city, or last order. Plug into a real CRM later without changing layout.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">

        <Card className="border-none shadow-premium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
          <CardHeader className="px-6 pt-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Customer directory</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  A clean, responsive table view for all PVK customers. Works nicely on desktop, tablet, and mobile.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Search by name, phone, email, city, or last order..."
                  className="h-9 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-indigo-600"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 md:w-52">
                <Select
                  value={segmentFilter}
                  onValueChange={(value) => setSegmentFilter(value as Segment)}
                >
                  <SelectTrigger className="h-9 text-xs sm:text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="All segments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="focus:bg-slate-100 dark:focus:bg-slate-800">All segments</SelectItem>
                    <SelectItem value="retail" className="focus:bg-slate-100 dark:focus:bg-slate-800">Retail</SelectItem>
                    <SelectItem value="corporate" className="focus:bg-slate-100 dark:focus:bg-slate-800">Corporate</SelectItem>
                    <SelectItem value="wholesale" className="focus:bg-slate-100 dark:focus:bg-slate-800">Wholesale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                  <TableRow className="border-b border-slate-100 dark:border-slate-800">
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 pl-6 h-10">Customer</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">Contact</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">Segment</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">City</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">
                      Last order
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
                      <TableCell className="text-sm font-medium pl-6 text-slate-900 dark:text-slate-100">{customer.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        <div className="space-y-0.5">
                          <p>{customer.phone}</p>
                          <p className="truncate text-[11px] opacity-80">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0.5 rounded-full border-0 ${customer.segment === 'retail'
                            ? 'bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400'
                            : customer.segment === 'corporate'
                              ? 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}
                        >
                          {customer.segment.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 dark:text-slate-400">{customer.city}</TableCell>
                      <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                        {customer.lastOrder}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                        No customers match your filters yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </AdminLayout>
  );
};

export default AdminCustomers;



