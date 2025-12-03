import AdminLayout from "./AdminLayout";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

type ServiceStatus = "active" | "paused" | "draft";

type SpecialService = {
  id: number;
  name: string;
  category: string;
  channel: string;
  status: ServiceStatus;
  avgResponseTime: string;
  monthlyLeads: number;
  description: string;
};

const mockSpecialServices: SpecialService[] = [
  {
    id: 1,
    name: "PAN / Aadhaar Updates",
    category: "Government",
    channel: "WhatsApp + Store",
    status: "active",
    avgResponseTime: "15 min",
    monthlyLeads: 32,
    description: "UTI PAN card, Aadhaar updates, and related ID services for walk‑in and online customers.",
  },
  {
    id: 2,
    name: "Custom Corporate Printing",
    category: "Printing",
    channel: "Website form",
    status: "active",
    avgResponseTime: "30 min",
    monthlyLeads: 18,
    description: "High-volume visiting cards, letterheads, envelopes, and marketing collateral for companies.",
  },
  {
    id: 3,
    name: "Jio Fiber & Recharges",
    category: "Services",
    channel: "Phone + Store",
    status: "paused",
    avgResponseTime: "—",
    monthlyLeads: 9,
    description: "New fibre and recharge activations. Can be resumed for seasonal or promotional pushes.",
  },
  {
    id: 4,
    name: "Awards / Trophy Projects",
    category: "Corporate",
    channel: "Website + WhatsApp",
    status: "draft",
    avgResponseTime: "—",
    monthlyLeads: 4,
    description: "End‑to‑end trophy and awards projects for schools, corporates, and events.",
  },
];

const statusBadgeStyles: Record<ServiceStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/40",
  paused: "bg-amber-500/10 text-amber-500 border-amber-500/40",
  draft: "bg-slate-500/10 text-slate-400 border-slate-500/40",
};

const AdminSpecialServices = () => {
  const [services, setServices] = useState<SpecialService[]>(mockSpecialServices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ServiceStatus>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formState, setFormState] = useState<Omit<SpecialService, "id">>({
    name: "",
    category: "",
    channel: "",
    status: "active",
    avgResponseTime: "—",
    monthlyLeads: 0,
    description: "",
  });

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();
    return services.filter((service) => {
      const matchesStatus = statusFilter === "all" ? true : service.status === statusFilter;
      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.channel.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, services]);

  const totalLeads = useMemo(
    () => services.reduce((total, service) => total + service.monthlyLeads, 0),
    [services],
  );

  const activeCount = useMemo(
    () => services.filter((service) => service.status === "active").length,
    [services],
  );

  // Persist a lightweight version of active services for the public homepage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const publicCards = services
      .filter((service) => service.status === "active")
      .slice(0, 3)
      .map((service) => ({
        title: service.name,
        description: service.description,
        buttonText: "Enquire Now",
        buttonLink: "/contact",
      }));

    window.localStorage.setItem("pvk-special-services", JSON.stringify(publicCards));
  }, [services]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormState({
      name: "",
      category: "",
      channel: "",
      status: "active",
      avgResponseTime: "—",
      monthlyLeads: 0,
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (service: SpecialService) => {
    setEditingId(service.id);
    const { id, ...rest } = service;
    setFormState(rest);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setServices((current) => current.filter((service) => service.id !== id));
  };

  const handleSubmit = () => {
    const trimmedName = formState.name.trim();
    if (!trimmedName) {
      return;
    }

    setServices((current) => {
      if (editingId == null) {
        const nextId = current.length ? Math.max(...current.map((service) => service.id)) + 1 : 1;
        return [...current, { id: nextId, ...formState, name: trimmedName }];
      }

      return current.map((service) =>
        service.id === editingId ? { ...service, ...formState, name: trimmedName } : service,
      );
    });

    setIsDialogOpen(false);
  };

  return (
    <AdminLayout title="Special Services">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Live special services</CardTitle>
            <Sparkles className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{activeCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Services currently visible to customers via website, WhatsApp, or in-store workflows.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly lead volume (mock)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{totalLeads}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Combined enquiry volume from all special services. Data is sample-only and safe for local testing.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs text-muted-foreground">
            <p>Decide which services you want to keep live all year vs. seasonal campaigns.</p>
            <p>Later you can connect this view to your CRM or WhatsApp automation without redesigning the UI.</p>
          </CardContent>
        </Card>
      </section>

      {/* Card-style preview of each special service, inspired by the public site cards */}
      <section className="mt-6 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-foreground">Special service cards</CardTitle>
            <p className="text-xs text-muted-foreground">
              Preview how each service will look as a customer-facing card with a clear enquiry action.
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-4 text-xs font-semibold tracking-wide text-white shadow-sm hover:from-sky-500/90 hover:to-emerald-400/90"
            type="button"
            onClick={handleOpenCreate}
          >
            + Add special service
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="flex h-full flex-col justify-between rounded-3xl border border-border/70 bg-gradient-to-b from-background to-background/60 shadow-sm"
            >
              <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-500">
                      Special service
                    </p>
                    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {service.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`mt-1 text-[11px] ${statusBadgeStyles[service.status]}`}
                  >
                    {service.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {service.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {service.channel}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {service.monthlyLeads} monthly leads (mock)
                  </span>
                </div>
              </CardContent>
              <div className="flex items-center justify-between gap-2 border-t border-border/70 bg-slate-950/5 px-4 py-3 sm:px-5">
                <Button
                  variant="secondary"
                  className="h-9 flex-1 rounded-full bg-slate-900 text-xs font-semibold text-slate-50 shadow-sm hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                  type="button"
                >
                  Enquire Now (preview)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs font-medium text-muted-foreground hover:bg-muted"
                  type="button"
                  onClick={() => handleOpenEdit(service)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs font-medium text-destructive hover:bg-destructive/10"
                  type="button"
                  onClick={() => handleDelete(service.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border/70 bg-muted/40 p-6 text-center text-xs text-muted-foreground">
              No special services match your filters yet. Use{" "}
              <span className="font-semibold text-foreground">“+ Add special service”</span> to create one.
            </div>
          )}
        </div>
      </section>

      <section className="mt-8 space-y-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-base font-semibold text-foreground">Special services workspace</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Review all PVK special services in a single place. Optimised for desktop, tablet, and mobile.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Search by service, category, or channel..."
                  className="h-9 text-sm"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 md:w-52">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as "all" | ServiceStatus)}
                >
                  <SelectTrigger className="h-9 text-xs sm:text-sm">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-border bg-card">
              <Table>
                <TableHeader className="bg-muted/60">
                  <TableRow>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Service</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Category</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Channel</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Status</TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                      Avg. response
                    </TableHead>
                    <TableHead className="whitespace-nowrap text-xs text-muted-foreground">
                      Monthly leads
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="text-sm font-medium">{service.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{service.category}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{service.channel}</TableCell>
                      <TableCell className="text-xs">
                        <Badge
                          variant="outline"
                          className={`text-[11px] ${statusBadgeStyles[service.status]}`}
                        >
                          {service.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {service.avgResponseTime}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {service.monthlyLeads}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 rounded-full px-3 text-[11px] font-medium text-muted-foreground hover:bg-muted"
                          type="button"
                          onClick={() => handleOpenEdit(service)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredServices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-6 text-center text-xs text-muted-foreground">
                        No services match your filters yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {editingId == null ? "Add special service" : "Edit special service"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="service-name">Service name</Label>
              <Input
                id="service-name"
                placeholder="e.g. UTI PAN card service"
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="service-category">Category</Label>
                <Input
                  id="service-category"
                  placeholder="e.g. Government"
                  value={formState.category}
                  onChange={(event) => setFormState((prev) => ({ ...prev, category: event.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-channel">Channel</Label>
                <Input
                  id="service-channel"
                  placeholder="e.g. WhatsApp + Store"
                  value={formState.channel}
                  onChange={(event) => setFormState((prev) => ({ ...prev, channel: event.target.value }))}
                />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="service-status">Status</Label>
                <Select
                  value={formState.status}
                  onValueChange={(value) =>
                    setFormState((prev) => ({ ...prev, status: value as ServiceStatus }))
                  }
                >
                  <SelectTrigger id="service-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-response">Avg. response time</Label>
                <Input
                  id="service-response"
                  placeholder="e.g. 20 min"
                  value={formState.avgResponseTime}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, avgResponseTime: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-leads">Monthly leads (mock)</Label>
                <Input
                  id="service-leads"
                  type="number"
                  min={0}
                  value={formState.monthlyLeads}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      monthlyLeads: Number(event.target.value) || 0,
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="service-description">Short description</Label>
              <textarea
                id="service-description"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="One or two lines that will show on the card, similar to the public website."
                value={formState.description}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, description: event.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-sky-500 to-emerald-400 text-white hover:from-sky-500/90 hover:to-emerald-400/90"
              onClick={handleSubmit}
            >
              {editingId == null ? "Create service" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminSpecialServices;



