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
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 mb-8">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-blue-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Inbox className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-blue-600/80 dark:text-blue-400">
              Total Leads (mock)
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-blue-100 dark:ring-blue-900/30 group-hover:scale-110 transition-transform duration-300">
              <Inbox className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {leadsWithStage.length}
            </div>
            <p className="mt-3 text-xs font-semibold text-blue-600/80 dark:text-blue-400 flex items-center gap-1.5 bg-blue-50/50 dark:bg-blue-900/20 w-fit px-2 py-1 rounded-full">
              Combined from contact form enquiries and special service popups.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-emerald-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <PhoneCall className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-emerald-600/80 dark:text-emerald-400">
              Warm / Hot pipeline
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-emerald-100 dark:ring-emerald-900/30 group-hover:scale-110 transition-transform duration-300">
              <PhoneCall className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 mt-2 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">Warm Leads</span>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                {leadsWithStage.filter((lead) => lead.stage === "warm").length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50/50 dark:bg-emerald-900/20 w-fit px-2 py-1 rounded-full">Hot Leads</span>
              <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                {leadsWithStage.filter((lead) => lead.stage === "hot").length}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-amber-900/10 relative overflow-hidden group">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full bg-amber-500/10 blur-3xl group-hover:bg-amber-500/20 transition-colors" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-amber-600/80 dark:text-amber-400">Follow-up priority</CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-amber-100/50 dark:bg-amber-900/30 flex items-center justify-center ring-1 ring-amber-200 dark:ring-amber-900/30 group-hover:scale-110 transition-transform duration-300">
              <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 mt-2 relative z-10">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {leadsWithStage.filter(l => l.stage === 'hot').length}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Msg High Priority</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Focus on <span className="font-bold text-amber-600 dark:text-amber-400">hot</span> leads first. Integration with CRM coming soon.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
          <CardHeader className="px-6 pt-6 pb-2 border-b border-slate-100/50 dark:border-slate-800/50">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Lead workspace</CardTitle>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  View, filter, and search all PVK leads
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6">
            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "contact" | "special")}
              className="space-y-6"
            >
              <TabsList className="bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50 h-auto w-fit">
                <TabsTrigger
                  value="contact"
                  className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 transition-all"
                >
                  Contact form
                </TabsTrigger>
                <TabsTrigger
                  value="special"
                  className="rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wide data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-slate-900/5 transition-all"
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
                      className="h-9 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-indigo-600"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 md:w-52">
                    <Select
                      value={stageFilter}
                      onValueChange={(value) => setStageFilter(value as LeadStage)}
                    >
                      <SelectTrigger className="h-10 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-slate-900 dark:focus:ring-indigo-600 shadow-sm">
                        <SelectValue placeholder="All stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="focus:bg-slate-100 dark:focus:bg-slate-800">All stages</SelectItem>
                        <SelectItem value="new" className="focus:bg-slate-100 dark:focus:bg-slate-800">New</SelectItem>
                        <SelectItem value="warm" className="focus:bg-slate-100 dark:focus:bg-slate-800">Warm</SelectItem>
                        <SelectItem value="hot" className="focus:bg-slate-100 dark:focus:bg-slate-800">Hot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-sm bg-white dark:bg-slate-950">
                  <Table>
                    <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                      <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pl-6 h-12">Lead</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Email</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Phone</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Stage</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">
                          Created
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
                          <TableCell className="text-sm font-bold text-slate-900 dark:text-slate-100 pl-6 py-4 group-hover:text-blue-600 transition-colors">{lead.name}</TableCell>
                          <TableCell className="text-xs font-medium text-slate-500 dark:text-slate-400 py-4">{lead.email}</TableCell>
                          <TableCell className="text-xs font-mono text-slate-500 dark:text-slate-400 py-4">{lead.phone ?? "—"}</TableCell>
                          <TableCell className="text-xs py-4">
                            <Badge
                              variant="outline"
                              className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border-0 shadow-sm ${lead.stage === 'hot'
                                ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-700/10 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-400/20'
                                : lead.stage === 'warm'
                                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-400/20'
                                  : 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-400/20'
                                }`}
                            >
                              {lead.stage}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs font-medium text-slate-500 dark:text-slate-400 py-4">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: '2-digit' })}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredLeads.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="py-12 text-center text-sm font-medium text-slate-500">
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
                      className="h-9 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-indigo-600"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 md:w-52">
                    <Select
                      value={stageFilter}
                      onValueChange={(value) => setStageFilter(value as LeadStage)}
                    >
                      <SelectTrigger className="h-10 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-slate-900 dark:focus:ring-indigo-600 shadow-sm">
                        <SelectValue placeholder="All stages" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all" className="focus:bg-slate-100 dark:focus:bg-slate-800">All stages</SelectItem>
                        <SelectItem value="new" className="focus:bg-slate-100 dark:focus:bg-slate-800">New</SelectItem>
                        <SelectItem value="warm" className="focus:bg-slate-100 dark:focus:bg-slate-800">Warm</SelectItem>
                        <SelectItem value="hot" className="focus:bg-slate-100 dark:focus:bg-slate-800">Hot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-sm bg-white dark:bg-slate-950">
                  <Table>
                    <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
                      <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 pl-6 h-12">Lead</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Email</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Phone</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">Stage</TableHead>
                        <TableHead className="whitespace-nowrap text-[11px] font-bold uppercase tracking-wider text-slate-500 h-12">
                          Created
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
                          <TableCell className="text-sm font-bold text-slate-900 dark:text-slate-100 pl-6 py-4 group-hover:text-blue-600 transition-colors">{lead.name}</TableCell>
                          <TableCell className="text-xs font-medium text-slate-500 dark:text-slate-400 py-4">{lead.email}</TableCell>
                          <TableCell className="text-xs font-mono text-slate-500 dark:text-slate-400 py-4">{lead.phone ?? "—"}</TableCell>
                          <TableCell className="text-xs py-4">
                            <Badge
                              variant="outline"
                              className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border-0 shadow-sm ${lead.stage === 'hot'
                                ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-700/10 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-400/20'
                                : lead.stage === 'warm'
                                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-700/10 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-400/20'
                                  : 'bg-blue-50 text-blue-700 ring-1 ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-400/20'
                                }`}
                            >
                              {lead.stage}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs font-medium text-slate-500 dark:text-slate-400 py-4">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: '2-digit' })}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredLeads.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="py-12 text-center text-sm font-medium text-slate-500">
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


