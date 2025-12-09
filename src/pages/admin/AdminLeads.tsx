import AdminLayout from "./AdminLayout";
import { useMemo, useState } from "react";
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
import { mockLeads } from "@/data/adminMockData";
import { Inbox, PhoneCall, Star } from "lucide-react";

type LeadStage = "all" | "new" | "warm" | "hot";

const AdminLeads = () => {
  const [activeTab, setActiveTab] = useState<"contact" | "special">("contact");
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<LeadStage>("all");

  const leadsWithStage = useMemo(
    () =>
      mockLeads.map((lead, index) => ({
        ...lead,
        stage: (["new", "warm", "hot"] as LeadStage[])[index % 3] ?? "new",
      })),
    [],
  );

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leadsWithStage.filter((lead) => {
      const matchesSource =
        activeTab === "contact" ? lead.source === "Contact" : lead.source === "Special";

      const matchesStage = stageFilter === "all" ? true : lead.stage === stageFilter;

      const matchesSearch =
        !query ||
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        (lead.phone ?? "").toLowerCase().includes(query);

      return matchesSource && matchesStage && matchesSearch;
    });
  }, [activeTab, stageFilter, search, leadsWithStage]);

  return (
    <AdminLayout title="Lead Management">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Leads (mock)</CardTitle>
            <Inbox className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">
              {leadsWithStage.length}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Combined from contact form enquiries and special service popups.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Warm / Hot pipeline</CardTitle>
            <PhoneCall className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Warm Leads</span>
              <span className="font-semibold text-foreground">
                {leadsWithStage.filter((lead) => lead.stage === "warm").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Hot Leads</span>
              <span className="font-semibold text-foreground">
                {leadsWithStage.filter((lead) => lead.stage === "hot").length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Follow-up priority</CardTitle>
            <Star className="h-5 w-5 text-amber-400" />
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>
              Prioritise <span className="font-semibold">hot</span> and{" "}
              <span className="font-semibold">warm</span> leads first for quick conversions.
            </p>
            <p>
              You can later plug this into a CRM, reminder system, or WhatsApp automation tool without changing the UI.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold text-foreground">Lead workspace</CardTitle>
                <p className="text-xs text-muted-foreground">
                  View, filter, and search all PVK leads. Optimised for desktop, tablet, and mobile.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "contact" | "special")}
              className="space-y-4"
            >
              <TabsList className="bg-muted rounded-full p-1">
                <TabsTrigger
                  value="contact"
                  className="rounded-full px-4 py-2 text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e]"
                >
                  Contact form
                </TabsTrigger>
                <TabsTrigger
                  value="special"
                  className="rounded-full px-4 py-2 text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e]"
                >
                  Special services
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact" className="space-y-4">
                {/* Filters shared across tabs */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      placeholder="Search by name, email, or phone..."
                      className="h-9 text-sm"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 md:w-52">
                    <Select
                      value={stageFilter}
                      onValueChange={(value) => setStageFilter(value as LeadStage)}
                    >
                      <SelectTrigger className="h-9 text-xs sm:text-sm">
                        <SelectValue placeholder="All stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All stages</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="hot">Hot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Lead</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Email</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Phone</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Stage</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Created
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="text-sm font-medium">{lead.name}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{lead.email}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{lead.phone ?? "—"}</TableCell>
                          <TableCell className="text-xs">
                            <Badge variant="outline" className="text-[11px]">
                              {lead.stage.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredLeads.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
                            No leads match your filters yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="special" className="space-y-4">
                {/* We reuse the same filters & table because `filteredLeads` is already scoped by tab */}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <Input
                      placeholder="Search by name, email, or phone..."
                      className="h-9 text-sm"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 md:w-52">
                    <Select
                      value={stageFilter}
                      onValueChange={(value) => setStageFilter(value as LeadStage)}
                    >
                      <SelectTrigger className="h-9 text-xs sm:text-sm">
                        <SelectValue placeholder="All stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All stages</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="hot">Hot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Lead</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Email</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Phone</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Stage</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                          Created
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="text-sm font-medium">{lead.name}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{lead.email}</TableCell>
                          <TableCell className="text-xs text-muted-foreground">{lead.phone ?? "—"}</TableCell>
                          <TableCell className="text-xs">
                            <Badge variant="outline" className="text-[11px]">
                              {lead.stage.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredLeads.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="py-6 text-center text-xs text-muted-foreground">
                            No leads match your filters yet.
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

export default AdminLeads;


