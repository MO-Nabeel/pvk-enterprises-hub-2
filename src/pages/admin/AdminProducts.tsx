import { useMemo, useRef, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Package, Layers, AlertTriangle, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { allProducts, type Product } from "@/data/productData";
import {
  getAllProductsWithExtras,
  saveExtraProducts,
  setProductVisibility,
  markProductDeleted,
  getExtraProducts,
  registerBrandForCategory,
  getCategoryOverrideMap,
  updateCategoryOverride,
} from "@/data/productStore";
import { mockCategories } from "@/data/adminMockData";

type AdminProductStatus = "active" | "draft" | "hidden";

type AdminProduct = Product & {
  sku: string;
  stock: number;
  status: AdminProductStatus;
};

const LOW_STOCK_THRESHOLD = 10;

const AdminProducts = () => {
  const [products, setProducts] = useState<AdminProduct[]>(() => {
    const merged = getAllProductsWithExtras();
    return merged.map((p) => ({
      ...p,
      sku: p.id,
      stock: 25,
      status: "active",
    }));
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [customCategories, setCustomCategories] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("pvk-admin-custom-categories");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as string[]) : [];
    } catch {
      return [];
    }
  });
  const [editingCategoryName, setEditingCategoryName] = useState<string | null>(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [categoryOverrides, setCategoryOverrides] = useState(() => getCategoryOverrideMap());
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const allCategories = useMemo(() => {
    // Categories coming from existing products
    const fromProducts = products.map((p) => p.category).filter(Boolean);

    // Default storefront categories (right-hand list in the Categories tab)
    const fromMock = mockCategories
      .map((category) => {
        const override = categoryOverrides[category.name];
        if (override?.hidden) return null;
        return override?.name ?? category.name;
      })
      .filter((name): name is string => Boolean(name));

    // Custom categories created in this admin screen
    const fromCustom = customCategories;

    const combined = Array.from(new Set([...fromProducts, ...fromMock, ...fromCustom]));
    return combined.sort((a, b) => a.localeCompare(b));
  }, [products, customCategories, categoryOverrides]);

  const isEditingExistingProduct = editingProduct
    ? products.some((p) => p.id === editingProduct.id)
    : false;

  const normalizeProductName = (value: string): string => {
    return value.toUpperCase();
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;

      const matchesStatus = statusFilter === "all" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === "active").length;
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD).length;
  const categoryCount = allCategories.length;

  const handleStockChange = (id: string, value: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Number.isNaN(value) ? 0 : Math.max(0, value) } : p)),
    );
  };

  const handleStatusChange = (id: string, status: AdminProductStatus) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));

    // Persist visibility for storefront (Category / ProductDetail pages)
    if (status === "active" || status === "hidden") {
      setProductVisibility(id, status);
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Are you sure you want to delete this product?\n\nThis will remove it from the storefront.");
      if (!ok) return;
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));

    // For products created in the admin (extras), remove them from the extras list
    const extras = getExtraProducts();
    const isExtra = extras.some((p) => p.id === id);
    if (isExtra) {
      const updatedExtras = extras.filter((p) => p.id !== id);
      saveExtraProducts(updatedExtras);
    }

    // Mark as deleted so it won't appear on the storefront even if part of base catalogue
    markProductDeleted(id);
  };

  const handleEditClick = (product: AdminProduct) => {
    setEditingProduct(product);
  };

  const handleNewProduct = () => {
    setEditingProduct({
      id: `NEW-${Date.now()}`,
      sku: "",
      name: "",
      imageURL: "",
      price: 0,
      oldPrice: undefined,
      discount: undefined,
      category: allCategories[0] ?? "",
      brand: "",
      description: "",
      stock: 0,
      status: "active",
    } as AdminProduct);
  };

  const handleProductFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name.trim()) {
      return;
    }

    const productToSave: AdminProduct = {
      ...editingProduct,
      sku: editingProduct.sku && editingProduct.sku.trim().length > 0 ? editingProduct.sku : editingProduct.id,
    };

    // Persist brand usage for storefront filters
    if (productToSave.category && productToSave.brand) {
      registerBrandForCategory(productToSave.category, productToSave.brand);
    }

    setProducts((prev) => {
      const exists = prev.some((p) => p.id === productToSave.id);
      if (exists) {
        const updated = prev.map((p) => (p.id === productToSave.id ? productToSave : p));
        const extras = updated.filter((p) => !allProducts.some((base) => base.id === p.id));
        saveExtraProducts(extras);
        return updated;
      }
      const id = productToSave.id || `NEW-${Date.now()}`;
      const updated = [{ ...productToSave, id }, ...prev];
      const extras = updated.filter((p) => !allProducts.some((base) => base.id === p.id));
      saveExtraProducts(extras);
      return updated;
    });
    setEditingProduct(null);
  };

  const handleCategoryCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("categoryName") as string)?.trim();
    if (!name) return;

    setCustomCategories((prev) => {
      if (prev.includes(name)) return prev;
      const updated = [...prev, name];
      if (typeof window !== "undefined") {
        window.localStorage.setItem("pvk-admin-custom-categories", JSON.stringify(updated));
      }
      return updated;
    });
    form.reset();
  };

  const handleImageSelect = (file: File | null) => {
    if (!file || !editingProduct) return;
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setEditingProduct((prev) => (prev ? { ...prev, imageURL: url } : prev));
  };

  const handleCategoryDelete = (name: string) => {
    if (typeof window !== "undefined") {
      const ok = window.confirm(`Delete category "${name}"?\n\nProducts using it will keep the old name.`);
      if (!ok) return;
    }

    setCustomCategories((prev) => {
      const updated = prev.filter((item) => item !== name);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("pvk-admin-custom-categories", JSON.stringify(updated));
      }
      return updated;
    });
    if (editingCategoryName === name) {
      setEditingCategoryName(null);
      setEditingCategoryValue("");
    }
  };

  const handleCategoryRename = (originalName: string) => {
    if (!editingCategoryValue.trim()) return;
    const newName = editingCategoryValue.trim();
    setCustomCategories((prev) => {
      const updated = prev.map((item) => (item === originalName ? newName : item));
      if (typeof window !== "undefined") {
        window.localStorage.setItem("pvk-admin-custom-categories", JSON.stringify(updated));
      }
      return updated;
    });
    setEditingCategoryName(null);
    setEditingCategoryValue("");
  };

  return (
    <AdminLayout title="Products & Inventory">
      {/* KPI row */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            <Package className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{totalProducts}</div>
            <p className="mt-1 text-xs text-muted-foreground">Products currently defined in the PVK catalogue.</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Products</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{activeProducts}</div>
            <p className="mt-1 text-xs text-muted-foreground">Visible products across your store and services.</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock</CardTitle>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{lowStockCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">Items currently below your preferred threshold.</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
            <Layers className="h-5 w-5 text-sky-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{categoryCount}</div>
            <p className="mt-1 text-xs text-muted-foreground">Organise trophies, printing, accessories and more.</p>
          </CardContent>
        </Card>
      </section>

      {/* Main products surface */}
      <section className="space-y-4">
        <Card className="border-border bg-card text-card-foreground shadow-sm">
          <CardHeader className="flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-foreground">Products &amp; Inventory</CardTitle>
              <p className="text-xs text-muted-foreground">
                Manage product details, visibility, pricing, and stock in a single, clean workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" className="gap-1.5 text-xs sm:text-sm" onClick={handleNewProduct}>
                <Plus className="h-3.5 w-3.5" />
                New Product
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            {editingProduct && (
              <div className="rounded-lg border border-border bg-card/60 px-3 py-3 sm:px-4 sm:py-4">
                <form
                  className="grid gap-3 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]"
                  onSubmit={handleProductFormSubmit}
                >
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">Name</label>
                    <Input
                      value={editingProduct.name}
                      onChange={(event) =>
                        setEditingProduct((prev) =>
                          prev ? { ...prev, name: normalizeProductName(event.target.value) } : prev,
                        )
                      }
                      required
                      className="h-9 text-sm"
                      placeholder="Product or service name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Category</label>
                    <Select
                      value={editingProduct.category}
                      onValueChange={(value) =>
                        setEditingProduct((prev) => (prev ? { ...prev, category: value } : prev))
                      }
                    >
                      <SelectTrigger className="h-9 text-xs sm:text-sm">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {allCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Price (₹)</label>
                    <Input
                      type="number"
                      min={0}
                      value={editingProduct.price}
                      onChange={(event) =>
                        setEditingProduct((prev) =>
                          prev ? { ...prev, price: Number.parseFloat(event.target.value || "0") } : prev,
                        )
                      }
                      className="h-9 text-sm"
                    />
                  </div>
                  {isEditingExistingProduct && (
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Status</label>
                      <Select
                        value={editingProduct.status}
                        onValueChange={(value: AdminProductStatus) =>
                          setEditingProduct((prev) => (prev ? { ...prev, status: value } : prev))
                        }
                      >
                        <SelectTrigger className="h-9 text-xs sm:text-sm">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="hidden">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">Brand</label>
                    <Input
                      value={editingProduct.brand ?? ""}
                      onChange={(event) =>
                        setEditingProduct((prev) => (prev ? { ...prev, brand: event.target.value } : prev))
                      }
                      className="h-9 text-sm"
                      placeholder="e.g. PVK, TNPL, COLOP"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Old price (₹)</label>
                    <Input
                      type="number"
                      min={0}
                      value={editingProduct.oldPrice ?? ""}
                      onChange={(event) =>
                        setEditingProduct((prev) =>
                          prev
                            ? {
                                ...prev,
                                oldPrice:
                                  event.target.value === "" ? undefined : Number.parseFloat(event.target.value || "0"),
                              }
                            : prev,
                        )
                      }
                      className="h-9 text-sm"
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Stock</label>
                    <Input
                      type="number"
                      min={0}
                      value={editingProduct.stock}
                      onChange={(event) =>
                        setEditingProduct((prev) =>
                          prev ? { ...prev, stock: Number.parseInt(event.target.value || "0", 10) } : prev,
                        )
                      }
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Discount (%)</label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={editingProduct.discount ?? ""}
                      onChange={(event) =>
                        setEditingProduct((prev) =>
                          prev
                            ? {
                                ...prev,
                                discount:
                                  event.target.value === "" ? undefined : Number.parseFloat(event.target.value || "0"),
                              }
                            : prev,
                        )
                      }
                      className="h-9 text-sm"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">Product image</label>
                    <div
                      className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border/80 bg-muted/40 px-3 py-2.5 text-xs transition hover:bg-muted"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(event) => {
                        event.preventDefault();
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        const file = event.dataTransfer.files?.[0];
                        handleImageSelect(file ?? null);
                      }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-foreground">Click to browse</span>
                        <span className="text-[11px] text-muted-foreground">
                          or drag &amp; drop an image file here (JPG, PNG, WEBP)
                        </span>
                      </div>
                      {editingProduct.imageURL && (
                        <div className="h-10 w-10 overflow-hidden rounded-md border border-border/60 bg-background">
                          <img
                            src={editingProduct.imageURL}
                            alt={editingProduct.name || "Preview"}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => handleImageSelect(event.target.files?.[0] ?? null)}
                    />
                  </div>

                  <div className="space-y-1 md:col-span-4">
                    <label className="text-xs font-medium text-muted-foreground">
                      Description (shown on product page)
                    </label>
                    <Input
                      value={editingProduct.description ?? ""}
                      onChange={(event) =>
                        setEditingProduct((prev) => (prev ? { ...prev, description: event.target.value } : prev))
                      }
                      className="h-10 text-sm"
                      placeholder="Short description visible on the product details page"
                    />
                  </div>

                  <div className="mt-2 flex flex-col gap-2 md:col-span-4 md:flex-row md:justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-xs sm:text-sm"
                      onClick={() => setEditingProduct(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="text-xs sm:text-sm">
                      Save changes
                    </Button>
                  </div>
                </form>
              </div>
            )}

            <Tabs defaultValue="catalog" className="space-y-4">
              <TabsList className="bg-muted">
                <TabsTrigger value="catalog">Catalogue</TabsTrigger>
                <TabsTrigger value="stock">Stock view</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
              </TabsList>

              {/* Catalogue tab */}
              <TabsContent value="catalog" className="space-y-4">
                <div className="grid gap-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search by name, SKU, or category…"
                      className="h-9 text-sm"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-9 text-xs sm:text-sm">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-9 text-xs sm:text-sm">
                      <SelectValue placeholder="Status: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Status: All</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">SKU</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Product</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Category</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Price</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Stock</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Status</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground text-right">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => {
                        const isLowStock = product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="text-xs font-mono text-muted-foreground">
                              {product.sku || product.id}
                            </TableCell>
                            <TableCell className="text-sm font-medium">
                              {product.name}
                              <div className="mt-0.5 text-xs text-muted-foreground">{product.brand}</div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{product.category}</TableCell>
                            <TableCell className="text-sm">₹{product.price.toFixed(2)}</TableCell>
                            <TableCell className="text-sm">
                              <div className="flex items-center gap-1.5">
                                <Input
                                  type="number"
                                  className="h-8 w-20 rounded-md px-2 text-xs"
                                  value={product.stock}
                                  onChange={(event) =>
                                    handleStockChange(product.id, Number.parseInt(event.target.value, 10))
                                  }
                                />
                                <span className="text-[11px] text-muted-foreground">units</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {product.status === "active" && (
                                <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-300">
                                  Active
                                </Badge>
                              )}
                              {product.status === "draft" && (
                                <Badge variant="outline" className="border-sky-500/40 text-sky-600 dark:text-sky-300">
                                  Draft
                                </Badge>
                              )}
                              {product.status === "hidden" && (
                                <Badge variant="outline" className="border-muted-foreground/40 text-muted-foreground">
                                  Hidden
                                </Badge>
                              )}
                              {isLowStock && (
                                <Badge
                                  variant="outline"
                                  className="ml-1 border-amber-500/40 text-amber-600 dark:text-amber-300"
                                >
                                  Low
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right text-xs">
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-1 h-7 px-2 text-xs"
                                onClick={() => handleEditClick(product)}
                              >
                                Edit
                              </Button>
                              {product.status === "active" ? (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs text-muted-foreground"
                                  onClick={() => handleStatusChange(product.id, "hidden")}
                                >
                                  Hide
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-xs text-muted-foreground"
                                  onClick={() => handleStatusChange(product.id, "active")}
                                >
                                  Activate
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-7 px-2 text-xs text-destructive hover:bg-destructive/5"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Stock view tab */}
              <TabsContent value="stock" className="space-y-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <Select>
                    <SelectTrigger className="h-9 text-xs sm:text-sm">
                      <SelectValue placeholder="Stock status: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All stock levels</SelectItem>
                      <SelectItem value="low">Low stock only</SelectItem>
                      <SelectItem value="out">Out of stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="h-9 text-xs sm:text-sm">
                      <SelectValue placeholder="Warehouse / Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All locations</SelectItem>
                      <SelectItem value="main">Main store</SelectItem>
                      <SelectItem value="online">Online only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="overflow-x-auto rounded-md border border-border bg-card">
                  <Table>
                    <TableHeader className="bg-muted/60">
                      <TableRow>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Product</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Category</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Current stock</TableHead>
                        <TableHead className="whitespace-nowrap text-xs text-muted-foreground">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => {
                        const isLowStock = product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;
                        const isOut = product.stock === 0;
                        return (
                          <TableRow key={product.id}>
                            <TableCell className="text-sm font-medium">{product.name}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{product.category}</TableCell>
                            <TableCell className="text-sm">
                              <span className="font-medium">{product.stock}</span>
                            </TableCell>
                            <TableCell>
                              {isOut ? (
                                <Badge variant="outline" className="border-destructive/40 text-destructive">
                                  Out of stock
                                </Badge>
                              ) : isLowStock ? (
                                <Badge
                                  variant="outline"
                                  className="border-amber-500/40 text-amber-600 dark:text-amber-300"
                                >
                                  Low stock
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-emerald-500/40 text-emerald-600">
                                  Healthy
                                </Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Categories tab */}
              <TabsContent value="categories" className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <CardTitle className="text-base font-semibold">Categories</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Manage how products are grouped across the storefront.
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    className="gap-1.5 text-xs sm:text-sm"
                    variant={showCategoryForm ? "outline" : "default"}
                    onClick={() => setShowCategoryForm((prev) => !prev)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    {showCategoryForm ? "Close form" : "Add category"}
                  </Button>
                </div>

                {showCategoryForm && (
                  <Card className="border-border bg-card text-card-foreground shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-base font-semibold">Add Category</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <form className="space-y-3" onSubmit={handleCategoryCreate}>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground">Category name</label>
                          <Input
                            name="categoryName"
                            placeholder="e.g. Office Stationery"
                            className="h-9 text-sm"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground">Notes (optional)</label>
                          <Input placeholder="Short description to help admins" className="h-9 text-sm" />
                        </div>
                        <Button type="submit" className="mt-1 w-full gap-1.5 text-sm">
                          <Plus className="h-4 w-4" />
                          Save Category
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-border bg-card text-card-foreground shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-semibold">All categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4 text-sm">
                    <div className="space-y-2">
                      {mockCategories.map((category) => (
                        (() => {
                          const override = categoryOverrides[category.name];
                          const displayName = override?.name || category.name;
                          const isHidden = override?.hidden === true;

                          return (
                            <div
                              key={category.id}
                              className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2"
                            >
                              <div>
                                <p className="font-medium flex items-center gap-2">
                                  <span>{displayName}</span>
                                  {isHidden && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                      Hidden
                                    </Badge>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Products assigned to this category will be grouped in the storefront.
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {category.productCount > 0 ? `${category.productCount} products` : "No products yet"}
                                </Badge>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-3 text-[11px]"
                                  onClick={() => {
                                    const nextName =
                                      typeof window !== "undefined"
                                        ? window.prompt("Rename category", displayName)?.trim()
                                        : null;
                                    if (!nextName) return;
                                    updateCategoryOverride(category.name, { name: nextName });
                                    setCategoryOverrides(getCategoryOverrideMap());
                                  }}
                                >
                                  <Pencil className="mr-1 h-3.5 w-3.5" />
                                  Rename
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-3 text-[11px] text-destructive hover:bg-destructive/5"
                                  onClick={() => {
                                    const nextHidden = !isHidden;
                                    updateCategoryOverride(category.name, { hidden: nextHidden });
                                    setCategoryOverrides(getCategoryOverrideMap());
                                  }}
                                >
                                  {isHidden ? "Show" : "Hide"}
                                </Button>
                              </div>
                            </div>
                          );
                        })()
                      ))}
                    </div>

                    {customCategories.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        No additional categories yet. Use the form on the left to create one.
                      </p>
                    ) : (
                      <div className="space-y-2 pt-1 border-t border-border/60 mt-2">
                        {customCategories.map((category) => (
                          <div
                            key={category}
                            className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2"
                          >
                            <div className="flex-1">
                              {editingCategoryName === category ? (
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                                  <Input
                                    value={editingCategoryValue}
                                    onChange={(event) => setEditingCategoryValue(event.target.value)}
                                    className="h-8 text-xs sm:text-sm"
                                  />
                                  <div className="flex gap-1 justify-end sm:justify-start">
                                    <Button
                                      type="button"
                                      size="sm"
                                      className="h-7 px-3 text-[11px]"
                                      onClick={() => handleCategoryRename(category)}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="ghost"
                                      className="h-7 px-3 text-[11px]"
                                      onClick={() => {
                                        setEditingCategoryName(null);
                                        setEditingCategoryValue("");
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <p className="font-medium">{category}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Custom category available in the product form.
                                  </p>
                                </>
                              )}
                            </div>
                            {editingCategoryName !== category && (
                              <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  className="h-7 px-3 text-[11px]"
                                  onClick={() => {
                                    setEditingCategoryName(category);
                                    setEditingCategoryValue(category);
                                  }}
                                >
                                  <Pencil className="mr-1 h-3.5 w-3.5" />
                                  Edit
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-3 text-[11px] text-destructive hover:bg-destructive/5"
                                  onClick={() => handleCategoryDelete(category)}
                                >
                                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                                  Delete
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Inline editor for quick product create / update */}
        {editingProduct && (
          <Card className="border-border bg-card text-card-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                {products.some((p) => p.id === editingProduct.id) ? "Edit product" : "New product"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                className="grid gap-3 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)]"
                onSubmit={handleProductFormSubmit}
              >
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input
                    value={editingProduct.name}
                    onChange={(event) =>
                      setEditingProduct((prev) =>
                        prev ? { ...prev, name: normalizeProductName(event.target.value) } : prev,
                      )
                    }
                    required
                    className="h-9 text-sm"
                    placeholder="Product or service name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Category</label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) =>
                      setEditingProduct((prev) => (prev ? { ...prev, category: value } : prev))
                    }
                  >
                    <SelectTrigger className="h-9 text-xs sm:text-sm">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Price (₹)</label>
                  <Input
                    type="number"
                    min={0}
                    value={editingProduct.price}
                    onChange={(event) =>
                      setEditingProduct((prev) =>
                        prev ? { ...prev, price: Number.parseFloat(event.target.value || "0") } : prev,
                      )
                    }
                    className="h-9 text-sm"
                  />
                </div>
                {isEditingExistingProduct && (
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Status</label>
                    <Select
                      value={editingProduct.status}
                      onValueChange={(value: AdminProductStatus) =>
                        setEditingProduct((prev) => (prev ? { ...prev, status: value } : prev))
                      }
                    >
                      <SelectTrigger className="h-9 text-xs sm:text-sm">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Brand</label>
                  <Input
                    value={editingProduct.brand ?? ""}
                    onChange={(event) =>
                      setEditingProduct((prev) => (prev ? { ...prev, brand: event.target.value } : prev))
                    }
                    className="h-9 text-sm"
                    placeholder="e.g. PVK, TNPL, COLOP"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Old price (₹)</label>
                  <Input
                    type="number"
                    min={0}
                    value={editingProduct.oldPrice ?? ""}
                    onChange={(event) =>
                      setEditingProduct((prev) =>
                        prev
                          ? {
                              ...prev,
                              oldPrice:
                                event.target.value === "" ? undefined : Number.parseFloat(event.target.value || "0"),
                            }
                          : prev,
                      )
                    }
                    className="h-9 text-sm"
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Stock</label>
                  <Input
                    type="number"
                    min={0}
                    value={editingProduct.stock}
                    onChange={(event) =>
                      setEditingProduct((prev) =>
                        prev ? { ...prev, stock: Number.parseInt(event.target.value || "0", 10) } : prev,
                      )
                    }
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Discount (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={editingProduct.discount ?? ""}
                    onChange={(event) =>
                      setEditingProduct((prev) =>
                        prev
                          ? {
                              ...prev,
                              discount:
                                event.target.value === "" ? undefined : Number.parseFloat(event.target.value || "0"),
                            }
                          : prev,
                      )
                    }
                    className="h-9 text-sm"
                    placeholder="Optional"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-medium text-muted-foreground">Product image</label>
                  <div
                    className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border/80 bg-muted/40 px-3 py-2.5 text-xs transition hover:bg-muted"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(event) => {
                      event.preventDefault();
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      const file = event.dataTransfer.files?.[0];
                      handleImageSelect(file ?? null);
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-foreground">Click to browse</span>
                      <span className="text-[11px] text-muted-foreground">
                        or drag &amp; drop an image file here (JPG, PNG, WEBP)
                      </span>
                    </div>
                    {editingProduct.imageURL && (
                      <div className="h-10 w-10 overflow-hidden rounded-md border border-border/60 bg-background">
                        <img
                          src={editingProduct.imageURL}
                          alt={editingProduct.name || "Preview"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleImageSelect(event.target.files?.[0] ?? null)}
                  />
                </div>
                <div className="space-y-1 md:col-span-4">
                  <label className="text-xs font-medium text-muted-foreground">Description (shown on product page)</label>
                  <Input
                    value={editingProduct.description ?? ""}
                    onChange={(event) =>
                      setEditingProduct((prev) => (prev ? { ...prev, description: event.target.value } : prev))
                    }
                    className="h-10 text-sm"
                    placeholder="Short description visible on the product details page"
                  />
                </div>

                <div className="mt-3 flex flex-col gap-2 md:col-span-4 md:flex-row md:justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-xs sm:text-sm"
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="text-xs sm:text-sm">
                    Save changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </section>
    </AdminLayout>
  );
};

export default AdminProducts;


