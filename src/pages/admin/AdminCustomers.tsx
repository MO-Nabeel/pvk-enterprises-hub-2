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
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total customers (mock)</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{totalCustomers}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Sample data only – safe for local testing without exposing real customer information.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Corporate accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{corporateCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Ideal targets for retainers, annual contracts, and bulk printing agreements.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">How to use this view</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>Quickly search by name, phone, city, or last order to prepare for follow-up calls.</p>
            <p>Later you can plug this into a real CRM or billing system without changing the layout.</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold text-foreground">Customer directory</CardTitle>
                <p className="text-xs text-muted-foreground">
                  A clean, responsive table view for all PVK customers. Works nicely on desktop, tablet, and mobile.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Search by name, phone, email, city, or last order..."
                  className="h-9 text-sm"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 md:w-52">
                <Select
                  value={segmentFilter}
                  onValueChange={(value) => setSegmentFilter(value as Segment)}
                >
                  <SelectTrigger className="h-9 text-xs sm:text-sm">
                    <SelectValue placeholder="All segments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="focus:bg-[#111827] focus:text-white">All segments</SelectItem>
                    <SelectItem value="retail" className="focus:bg-[#111827] focus:text-white">Retail</SelectItem>
                    <SelectItem value="corporate" className="focus:bg-[#111827] focus:text-white">Corporate</SelectItem>
                    <SelectItem value="wholesale" className="focus:bg-[#111827] focus:text-white">Wholesale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-border bg-card">
              <Table>
                <TableHeader className="bg-muted/60">
                  <TableRow>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Customer</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Contact</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Segment</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">City</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                      Last order
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="text-sm font-medium">{customer.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        <div className="space-y-0.5">
                          <p>{customer.phone}</p>
                          <p className="truncate text-[11px]">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        <Badge
                          variant="outline"
                          className={`text-[11px] ${segmentBadgeStyles[customer.segment]}`}
                        >
                          {customer.segment.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{customer.city}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {customer.lastOrder}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
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



