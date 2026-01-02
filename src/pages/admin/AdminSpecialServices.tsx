import AdminLayout from "./AdminLayout";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Sparkles, Edit, Trash2 } from "lucide-react";
import {
  getAllServices,
  getActiveServices,
  saveAllServices,
  addService,
  updateService,
  deleteService,
  updateServiceStatus,
  type SpecialService,
  type ServiceStatus,
} from "@/data/serviceStore";

const statusBadgeStyles: Record<ServiceStatus, string> = {
  Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/40",
  Paused: "bg-amber-500/10 text-amber-500 border-amber-500/40",
  Draft: "bg-slate-500/10 text-slate-400 border-slate-500/40",
};

const AdminSpecialServices = () => {
  const [services, setServices] = useState<SpecialService[]>(getAllServices());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ServiceStatus>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<Omit<SpecialService, "id">>({
    title: "",
    description: "",
    imageURL: "",
    status: "Active",
    monthlyLeads: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);

  // Load services from store on mount
  useEffect(() => {
    setServices(getAllServices());
  }, []);

  // Save services to store whenever they change
  useEffect(() => {
    saveAllServices(services);
  }, [services]);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();
    return services.filter((service) => {
      const matchesStatus = statusFilter === "all" ? true : service.status === statusFilter;
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, services]);

  const totalLeads = useMemo(
    () => services.reduce((total, service) => total + (service.monthlyLeads || 0), 0),
    [services],
  );

  const activeCount = useMemo(
    () => services.filter((service) => service.status === "Active").length,
    [services],
  );

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormState({
      title: "",
      description: "",
      imageURL: "",
      status: "Active",
      monthlyLeads: 0,
    });
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (service: SpecialService) => {
    setEditingId(service.id);
    const { id, ...rest } = service;
    setFormState(rest);
    setImagePreview(service.imageURL || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteService(id);
    setServices(getAllServices());
    setDeleteServiceId(null);
  };

  const handleStatusChange = (id: string, status: ServiceStatus) => {
    updateServiceStatus(id, status);
    setServices(getAllServices());
  };

  const handleFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("File must be an image"));
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageFile = async (file: File) => {
    try {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (PNG, JPG, JPEG, GIF, etc.)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        return;
      }

      const base64 = await handleFileToBase64(file);
      setFormState((prev) => ({ ...prev, imageURL: base64 }));
      setImagePreview(base64);
    } catch (error) {
      console.error("Error processing image:", error);
      alert("Failed to process image. Please try again.");
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setFormState((prev) => ({ ...prev, imageURL: "" }));
    setImagePreview(null);
  };

  const handleSubmit = () => {
    const trimmedTitle = formState.title.trim();
    if (!trimmedTitle || !formState.description.trim() || !formState.imageURL.trim()) {
      alert("Please fill in all required fields (Title, Description, and Service Card Image).");
      return;
    }

    if (editingId == null) {
      addService({ ...formState, title: trimmedTitle });
    } else {
      updateService(editingId, { ...formState, title: trimmedTitle });
    }

    setServices(getAllServices());
    setIsDialogOpen(false);
    setImagePreview(null);
  };

  return (
    <AdminLayout title="Special Services Management">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-pink-50/80 via-white to-pink-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-pink-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Sparkles className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-pink-600/80 dark:text-pink-400">
              Active Services
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-pink-100 dark:ring-pink-900/30 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {activeCount}
            </div>
            <p className="mt-3 text-xs font-semibold text-pink-600/80 dark:text-pink-400 flex items-center gap-1.5 bg-pink-50/50 dark:bg-pink-900/20 w-fit px-2 py-1 rounded-full">
              Services currently visible on the frontend Special Services section.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-sky-50/80 via-white to-sky-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-sky-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Sparkles className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-sky-600/80 dark:text-sky-400">
              Monthly lead volume (mock)
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-sky-100 dark:ring-sky-900/30 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 mt-2 group-hover:translate-x-1 transition-transform duration-300">
              {totalLeads}
            </div>
            <p className="mt-3 text-xs font-semibold text-sky-600/80 dark:text-sky-400 flex items-center gap-1.5 bg-sky-50/50 dark:bg-sky-900/20 w-fit px-2 py-1 rounded-full">
              Combined enquiry volume from all special services. Data is sample-only and safe for local testing.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-white/60 dark:border-white/5 shadow-premium hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-slate-50/80 via-white to-slate-50/20 dark:from-slate-900 dark:via-slate-900/50 dark:to-slate-900/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12">
            <Edit className="h-32 w-32 -mr-10 -mt-10" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-600/80 dark:text-slate-400">
              Next actions
            </CardTitle>
            <div className="h-10 w-10 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ring-1 ring-slate-100 dark:ring-slate-800/30 group-hover:scale-110 transition-transform duration-300">
              <Edit className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2 mt-2 relative z-10">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Manage service visibility
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed max-w-[90%]">
              Active services appear on the frontend. Edit content, images, and status below.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Services List View */}
      <section className="mt-6 space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold text-foreground">Special Services</CardTitle>
            <p className="text-xs text-muted-foreground">
              Manage the services displayed in the frontend Special Services section. Only Active services are visible to customers.
            </p>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 px-4 text-xs font-semibold tracking-wide text-white shadow-sm hover:from-sky-500/90 hover:to-emerald-400/90"
            type="button"
            onClick={handleOpenCreate}
          >
            + Add Service
          </Button>
        </div>

        {/* Card Grid View */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="flex h-full flex-col justify-between rounded-xl border-none shadow-premium hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-900 group overflow-hidden"
            >
              <CardContent className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                {/* Service Image Preview */}
                {service.imageURL && (
                  <div className="relative w-full h-32 sm:h-36 md:h-40 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={service.imageURL}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EImage not found%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-500">
                        Special service
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${statusBadgeStyles[service.status]}`}
                      >
                        {service.status}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                  </div>
                </div>

                {/* Lead Tracking (Admin only) */}
                {service.monthlyLeads !== undefined && service.monthlyLeads > 0 && (
                  <div className="mt-2">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {service.monthlyLeads} monthly leads (mock)
                    </span>
                  </div>
                )}
              </CardContent>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 px-4 py-3 sm:px-5">
                <Select
                  value={service.status}
                  onValueChange={(value) => handleStatusChange(service.id, value as ServiceStatus)}
                >
                  <SelectTrigger className="h-9 text-xs flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-full px-3 text-xs font-medium text-muted-foreground hover:bg-[#111827] hover:text-white transition-colors duration-200"
                  type="button"
                  onClick={() => handleOpenEdit(service)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-full px-3 text-xs font-medium text-destructive hover:bg-[#111827] delete-button-hover"
                  type="button"
                  onClick={() => setDeleteServiceId(service.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
          {filteredServices.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-border/70 bg-muted/40 p-6 text-center text-xs text-muted-foreground">
              No services match your filters yet. Use{" "}
              <span className="font-semibold text-foreground">"+ Add Service"</span> to create one.
            </div>
          )}
        </div>
      </section>

      {/* Table View */}
      <section className="mt-8 space-y-4">
        <Card className="border-none shadow-premium bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
          <CardHeader className="px-6 pt-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">Services List View</CardTitle>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  All services in a table format for quick management. Optimized for desktop, tablet, and mobile.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Search by title or description..."
                  className="h-9 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-slate-900 dark:focus-visible:ring-indigo-600"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 md:w-52">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as "all" | ServiceStatus)}
                >
                  <SelectTrigger className="h-9 text-xs sm:text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
                  <TableRow className="border-b border-slate-100 dark:border-slate-800">
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 pl-6 h-10">Service</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">Description</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">Status</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">Monthly leads</TableHead>
                    <TableHead className="whitespace-nowrap text-xs font-semibold text-slate-500 h-10">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 last:border-0 transition-colors">
                      <TableCell className="text-sm font-medium pl-6 text-slate-900 dark:text-slate-100">{service.title}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-md truncate">
                        {service.description}
                      </TableCell>
                      <TableCell className="text-xs">
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-2 py-0.5 rounded-full border-0 ${service.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : service.status === 'Paused'
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                              : 'bg-slate-50 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400'
                            }`}
                        >
                          {service.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                        {service.monthlyLeads || 0}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-xs">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 rounded-full px-3 text-[11px] font-medium text-muted-foreground hover:bg-slate-900 hover:text-white dark:hover:bg-slate-800 transition-colors duration-200"
                            type="button"
                            onClick={() => handleOpenEdit(service)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 rounded-full px-3 text-[11px] font-medium text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/30 dark:hover:text-rose-400 transition-colors duration-200"
                            type="button"
                            onClick={() => setDeleteServiceId(service.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredServices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
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

      {/* Edit/Create Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setImagePreview(null);
            setIsDragging(false);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base sm:text-lg">
              {editingId == null ? "Add Special Service" : "Edit Special Service"}
            </DialogTitle>
            <DialogDescription>
              {editingId == null
                ? "Create a new service that will appear in the frontend Special Services section when set to Active."
                : "Update the service details. Changes will reflect on the frontend immediately for Active services."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="service-title">Service Title *</Label>
              <Input
                id="service-title"
                placeholder="e.g., PAN / Aadhaar Updates"
                value={formState.title}
                onChange={(event) => setFormState((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="service-description">Description *</Label>
              <textarea
                id="service-description"
                rows={3}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="e.g., UTI PAN card, Aadhaar updates, and related ID services for walk‑in and online customers."
                value={formState.description}
                onChange={(event) =>
                  setFormState((prev) => ({ ...prev, description: event.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="service-image">Service Card Image *</Label>
              <div
                className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border/80 bg-muted/40 px-3 py-2.5 text-xs transition hover:bg-muted"
                onClick={() => document.getElementById("service-image")?.click()}
                onDragOver={(event) => {
                  event.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  setIsDragging(false);
                  const file = event.dataTransfer.files?.[0];
                  if (file) {
                    handleImageFile(file);
                  }
                }}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-foreground">Click to browse</span>
                  <span className="text-[11px] text-muted-foreground">
                    or drag & drop an image file here (JPG, PNG, WEBP)
                  </span>
                </div>
                {imagePreview && (
                  <div className="h-10 w-10 overflow-hidden rounded-md border border-border/60 bg-background">
                    <img
                      src={imagePreview}
                      alt="Service preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect fill='%23ddd' width='40' height='40'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='10' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EError%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                )}
              </div>
              <input
                type="file"
                id="service-image"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
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
                    <SelectItem value="Active">Active (visible on frontend)</SelectItem>
                    <SelectItem value="Paused">Paused (not visible)</SelectItem>
                    <SelectItem value="Draft">Draft (not visible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="service-leads">Monthly leads (mock)</Label>
                <Input
                  id="service-leads"
                  type="number"
                  min={0}
                  value={formState.monthlyLeads || 0}
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      monthlyLeads: Number(event.target.value) || 0,
                    }))
                  }
                />
                <p className="text-xs text-muted-foreground">For admin tracking purposes only</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" type="button" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-sky-500 to-emerald-400 text-white hover:from-sky-500/90 hover:to-emerald-400/90"
              onClick={handleSubmit}
            >
              {editingId == null ? "Create Service" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Service Confirmation */}
      <AlertDialog open={deleteServiceId !== null} onOpenChange={(open) => !open && setDeleteServiceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteServiceId && handleDelete(deleteServiceId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminSpecialServices;
