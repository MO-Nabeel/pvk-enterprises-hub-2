import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Package, Layers, AlertTriangle, CheckCircle2, Pencil, Trash2, X, Check, ChevronsUpDown, Edit2 } from "lucide-react";
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
  getCustomCategoriesWithPosition,
  saveCustomCategories,
  type CustomCategory,
  initializeDefaultCategoryPositions,
} from "@/data/productStore";
import { mockCategories } from "@/data/adminMockData";
import {
  addBrand,
  deleteBrand,
  getBrandsForCategory,
  getAllBrands,
  saveBrand,
  setBrandStatus,
  type Brand,
  type BrandStatus,
} from "@/data/brandStore";
import {
  getCategoryCardContent,
  saveCategoryCardContent,
  deleteCategoryCardContent,
  type CategoryCardContent,
} from "@/data/categoryCardStore";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type AdminProductStatus = "active" | "draft" | "hidden";

type AdminProduct = Product & {
  sku: string;
  stock: number;
  status: AdminProductStatus;
  purchasePrice?: number;
  tax?: number;
};

const LOW_STOCK_THRESHOLD = 10;

type BrandSelectorProps = {
  value: string;
  onChange: (value: string) => void;
  category: string;
  allCategories: string[];
};

const BrandSelector = ({ value, onChange, category, allCategories }: BrandSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [allBrands, setAllBrands] = useState<Brand[]>(() => getAllBrands());
  const [showNewForm, setShowNewForm] = useState(false);
  const [newBrand, setNewBrand] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const filteredBrands = useMemo(() => {
    if (!category) {
      return allBrands;
    }
    const scoped = getBrandsForCategory(category);
    const baseList = scoped.length > 0 ? scoped : allBrands;

    // Ensure we include any just-created brand value even if associations are still syncing.
    if (value && !baseList.some((brand) => brand.name === value)) {
      const fallback = allBrands.find((brand) => brand.name === value);
      if (fallback) {
        return [...baseList, fallback];
      }
    }

    return baseList;
  }, [allBrands, category, value]);

  const handleSelect = (currentValue: string) => {
    onChange(currentValue);
    setOpen(false);
  };

  const handleNewBrandSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = newBrand.trim();
    if (!trimmed) return;

    if (!category) {
      setFormError("Select a category before adding a brand.");
      return;
    }

    setFormError(null);

    const updatedBrands = addBrand(trimmed, [category]);
    setAllBrands(updatedBrands);
    onChange(trimmed);
    setNewBrand("");
    setShowNewForm(false);
  };

  const hasCategory = Boolean(category);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-9 w-full justify-between text-xs sm:text-sm"
              disabled={!hasCategory}
            >
              {value ? value : hasCategory ? "Select brand" : "Select category first"}
              <ChevronsUpDown className="ml-2 h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 max-h-64 overflow-y-auto z-50"
            side="bottom"
            align="start"
            sideOffset={6}
            // Force menu to open downward from the trigger; internal scroll prevents viewport overflow.
            avoidCollisions={false}
            collisionPadding={8}
          >
            <Command>
              <CommandInput placeholder="Search brands..." className="text-xs sm:text-sm" />
              <CommandEmpty>No brand found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {filteredBrands.map((brand) => (
                    <CommandItem
                      key={brand.name}
                      value={brand.name}
                      onSelect={handleSelect}
                      className="text-xs sm:text-sm"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-3 w-3",
                          value === brand.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {brand.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              className="h-9 w-9 bg-[#111827] hover:bg-black text-white rounded-lg shadow-sm border-0 transition-colors duration-200"
              onClick={() => setShowNewForm((prev) => !prev)}
              disabled={!hasCategory}
            >
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add new brand</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new brand</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {showNewForm && (
        <form
          onSubmit={handleNewBrandSubmit}
          className="space-y-2 rounded-md border border-border/70 bg-muted/20 px-2.5 py-2.5 sm:px-3 sm:py-3"
        >
          <div className="space-y-1">
            <Input
              value={newBrand}
              onChange={(event) => setNewBrand(event.target.value)}
              placeholder="New brand name"
              className="h-8 text-xs sm:text-sm"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] text-muted-foreground">
              Associated categories
            </p>
            <p className="text-[11px] font-medium text-foreground">
              {category || "Select a category above to continue."}
            </p>
          </div>
          {formError && (
            <p className="text-[11px] text-destructive">{formError}</p>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => {
                setShowNewForm(false);
                setNewBrand("");
                setFormError(null);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              className="h-7 px-3 text-xs"
              disabled={!hasCategory}
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

const PRODUCT_DRAFT_KEY = "pvk-admin-product-draft";

// Convert an uploaded file to a data URL for storage in localStorage-backed stores.
const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

// Lightweight localStorage helpers kept local to avoid cross-file coupling.
const safeReadJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const safeWriteJSON = <T,>(key: string, value: T): void => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors so UX stays responsive
  }
};

const clearProductDraft = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PRODUCT_DRAFT_KEY);
};

const AdminProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "catalog";

  const handleTabChange = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("tab", value);
      return newParams;
    });
  };

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
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>(() => getCustomCategoriesWithPosition());
  const [allBrands, setAllBrands] = useState<Brand[]>(() => getAllBrands());
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [editingCategoryName, setEditingCategoryName] = useState<string | null>(null);
  const [editingCategoryValue, setEditingCategoryValue] = useState<string>("");
  const thumbnailInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const addCategoryImageInputRef = useRef<HTMLInputElement | null>(null);
  const editCategoryImageInputRef = useRef<HTMLInputElement | null>(null);
  const [categoryOverrides, setCategoryOverrides] = useState(() => getCategoryOverrideMap());
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCardContent, setEditingCardContent] = useState<{ categoryName: string; content: CategoryCardContent | null } | null>(null);
  const [categoryContentUpdateTrigger, setCategoryContentUpdateTrigger] = useState(0);
  const [newCategoryImagePreview, setNewCategoryImagePreview] = useState<string>("");
  const [positionInputValue, setPositionInputValue] = useState<string>("");
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const handleInlineBrandSave = () => {
    const trimmed = newBrandName.trim();
    if (!trimmed || !editingProduct?.category) return;
    const updatedBrands = addBrand(trimmed, [editingProduct.category]);
    setAllBrands(updatedBrands);
    setEditingProduct((prev) => (prev ? { ...prev, brand: trimmed } : prev));
    setNewBrandName("");
    setShowBrandForm(false);
    // Persist draft with the newly selected brand so reloads keep progress
    safeWriteJSON(PRODUCT_DRAFT_KEY, {
      product: { ...(editingProduct ?? {}), brand: trimmed },
      thumbnailUrl,
      galleryImages,
    });
  };

  // Delete confirmation states
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [deleteCategoryName, setDeleteCategoryName] = useState<string | null>(null);
  const [deleteCustomCategoryName, setDeleteCustomCategoryName] = useState<string | null>(null);
  const [deleteBrandData, setDeleteBrandData] = useState<Brand | null>(null);
  const [deleteCategoryCardName, setDeleteCategoryCardName] = useState<string | null>(null);
  const [blockedCategoryDelete, setBlockedCategoryDelete] = useState<{ name: string; productCount: number } | null>(null);

  const handleNewCategoryImageFile = async (file: File | null | undefined) => {
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setNewCategoryImagePreview(dataUrl);
    } catch (error) {
      console.error("Failed to load category image", error);
      alert("Could not read the image file. Please try a different image.");
    }
  };

  const handleEditCategoryImageFile = async (file: File | null | undefined) => {
    if (!file || !editingCardContent) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setEditingCardContent((prev) =>
        prev
          ? {
            ...prev,
            content: {
              ...(prev.content ?? { categoryName: prev.categoryName }),
              categoryImageURL: dataUrl,
              // Keep legacy backgroundImage in sync for backward compatibility
              backgroundImage: dataUrl,
            },
          }
          : prev
      );
    } catch (error) {
      console.error("Failed to load category image", error);
      alert("Could not read the image file. Please try a different image.");
    }
  };

  // Initialize default category positions on mount (only once)
  useEffect(() => {
    initializeDefaultCategoryPositions();
    // Refresh category overrides after initialization
    setCategoryOverrides(getCategoryOverrideMap());
  }, []);

  // Restore any in-progress product draft so a reload won't lose work.
  useEffect(() => {
    if (editingProduct) return;
    const draft = safeReadJSON<{
      product?: AdminProduct;
      thumbnailUrl?: string;
      galleryImages?: string[];
    } | null>(PRODUCT_DRAFT_KEY, null);

    if (draft?.product) {
      setEditingProduct(draft.product);
      setThumbnailUrl(draft.thumbnailUrl ?? "");
      setGalleryImages(draft.galleryImages ?? []);
    }
  }, [editingProduct]);

  // Persist the current draft while the dialog is open.
  useEffect(() => {
    if (!editingProduct) {
      clearProductDraft();
      return;
    }

    safeWriteJSON(PRODUCT_DRAFT_KEY, {
      product: editingProduct,
      thumbnailUrl,
      galleryImages,
    });
  }, [editingProduct, thumbnailUrl, galleryImages]);

  // Listen for category card content updates to refresh the list
  useEffect(() => {
    const handleContentUpdate = () => {
      setCategoryContentUpdateTrigger(prev => prev + 1);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("categoryCardContentUpdated", handleContentUpdate);
      return () => {
        window.removeEventListener("categoryCardContentUpdated", handleContentUpdate);
      };
    }
  }, []);

  // Keep thumbnail & gallery inputs in sync with the currently edited product
  useEffect(() => {
    if (!editingProduct) {
      setThumbnailUrl("");
      setGalleryImages([]);
      return;
    }

    const gallery = editingProduct.imageGallery || [];
    const primary = gallery[0] ?? "";
    const rest = gallery.slice(1);

    setThumbnailUrl(primary);
    setGalleryImages(rest);
  }, [editingProduct]);

  const allCategories = useMemo(() => {
    // Categories coming from existing products
    const fromProducts = products
      .map((p) => p.category)
      .filter((cat): cat is string => typeof cat === "string" && cat.length > 0);

    // Default storefront categories (right-hand list in the Categories tab)
    const fromMock = mockCategories
      .map((category) => {
        const override = categoryOverrides[category.name];
        if (override?.hidden) return null;
        return override?.name ?? category.name;
      })
      .filter((name): name is string => typeof name === "string" && name.length > 0);

    // Custom categories created in this admin screen
    const fromCustom = customCategories
      .map((cat) => cat.name)
      .filter((cat): cat is string => typeof cat === "string" && cat.length > 0);

    const combined = Array.from(new Set([...fromProducts, ...fromMock, ...fromCustom]));
    const sorted = combined.sort((a, b) => a.localeCompare(b));

    // Fallback to a generic option if everything is empty to keep the select usable
    if (sorted.length === 0) {
      return ["General"];
    }

    return sorted;
  }, [products, customCategories, categoryOverrides]);

  // Brands filtered for the current product (used by native select)
  const filteredBrands = useMemo(() => {
    if (!editingProduct?.category) {
      return allBrands;
    }
    const scoped = getBrandsForCategory(editingProduct.category);
    const baseList = scoped.length > 0 ? scoped : allBrands;
    if (editingProduct.brand && !baseList.some((brand) => brand.name === editingProduct.brand)) {
      const fallback = allBrands.find((brand) => brand.name === editingProduct.brand);
      if (fallback) return [...baseList, fallback];
    }
    return baseList;
  }, [allBrands, editingProduct?.category, editingProduct?.brand]);

  // Calculate next available position for new categories
  const nextAvailablePosition = useMemo(() => {
    const allPositions = new Set<number>();
    customCategories.forEach(cat => {
      if (cat.position !== undefined) {
        allPositions.add(cat.position);
      }
    });
    Object.values(categoryOverrides).forEach(override => {
      if (override.position !== undefined) {
        allPositions.add(override.position);
      }
    });
    const maxPosition = allPositions.size > 0 ? Math.max(...Array.from(allPositions)) : 0;
    return maxPosition + 1;
  }, [customCategories, categoryOverrides]);

  // Set the next available position when the form is shown
  useEffect(() => {
    if (showCategoryForm) {
      setPositionInputValue(nextAvailablePosition.toString());
    } else {
      setPositionInputValue("");
    }
  }, [showCategoryForm, nextAvailablePosition]);

  // Track how many products reference each category for safety checks
  const categoryProductCountMap = useMemo(() => {
    const map = new Map<string, number>();
    products.forEach((product) => {
      const key = product.category?.trim();
      if (!key) return;
      map.set(key, (map.get(key) ?? 0) + 1);
    });
    return map;
  }, [products]);

  // Sorted categories for display in "All categories" section
  const sortedCategoriesForDisplay = useMemo(() => {
    type CategoryWithPosition = {
      id: string;
      name: string;
      productCount: number;
      position?: number;
    };

    // Get default categories with positions
    const defaultCatsWithPosition: CategoryWithPosition[] = mockCategories.map((cat) => {
      const override = categoryOverrides[cat.name];
      return {
        ...cat,
        position: override?.position,
      };
    });

    // Get custom categories with positions
    const customCatsWithPosition: CategoryWithPosition[] = customCategories.map((cat) => {
      const productCount = categoryProductCountMap.get(cat.name) ?? 0;
      return {
        id: `CUSTOM-${cat.name}`,
        name: cat.name,
        productCount,
        position: cat.position,
      };
    });

    // Combine all categories
    const allCatsWithPosition: CategoryWithPosition[] = [
      ...defaultCatsWithPosition,
      ...customCatsWithPosition,
    ];

    // Sort by position (undefined positions go to end), then by name
    return allCatsWithPosition.sort((a, b) => {
      const posA = a.position ?? Infinity;
      const posB = b.position ?? Infinity;
      if (posA !== posB) return posA - posB;
      return a.name.localeCompare(b.name);
    });
  }, [categoryContentUpdateTrigger, categoryOverrides, categoryProductCountMap, customCategories, products]);

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
    setDeleteProductId(null);
  };

  const handleEditClick = (product: AdminProduct) => {
    setEditingProduct(product);
  };

  const handleNewProduct = () => {
    setEditingProduct({
      id: `NEW-${Date.now()}`,
      sku: "",
      name: "",
      imageGallery: [],
      price: 0,
      purchasePrice: 0,
      tax: 0,
      oldPrice: undefined,
      discount: undefined,
      category: allCategories[0] ?? "General",
      brand: "",
      description: "",
      stock: 0,
      status: "active",
    } as AdminProduct);
  };

  const handleThumbnailSelect = (files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const file = imageFiles[0];
    const url = URL.createObjectURL(file);
    setThumbnailUrl(url);
  };

  const handleGallerySelect = (files: FileList | null) => {
    if (!files) return;

    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) return;

    const maxImages = 4;
    const current = galleryImages;
    const remainingSlots = maxImages - current.length;

    if (remainingSlots <= 0) {
      if (typeof window !== "undefined") {
        window.alert(`You can only add up to ${maxImages} additional gallery images per product.`);
      }
      return;
    }

    const newImages = imageFiles
      .slice(0, remainingSlots)
      .map((file) => URL.createObjectURL(file));

    setGalleryImages([...current, ...newImages]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearThumbnail = () => {
    setThumbnailUrl("");
  };

  const handleProductFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingProduct) return;

    if (!editingProduct.name.trim()) {
      return;
    }

    const finalImageGallery: string[] = (() => {
      const baseGallery = galleryImages.filter(Boolean);
      if (thumbnailUrl) {
        return [thumbnailUrl, ...baseGallery];
      }
      return baseGallery;
    })();

    const productToSave: AdminProduct = {
      ...editingProduct,
      imageGallery: finalImageGallery,
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
    setThumbnailUrl("");
    setGalleryImages([]);
    clearProductDraft();
  };

  const handleCategoryCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("categoryName") as string)?.trim();
    if (!name) return;

    const positionStr = (formData.get("position") as string)?.trim();
    const position = positionStr ? parseInt(positionStr, 10) : undefined;

    // Validate position is a positive number
    if (position !== undefined && (isNaN(position) || position < 1)) {
      alert("Position must be a positive number (1 or greater)");
      return;
    }

    // Check if category name already exists
    if (customCategories.some(cat => cat.name === name)) {
      alert("A category with this name already exists");
      return;
    }

    // Check if position is already taken (check both custom and existing categories)
    const allPositions = new Set<number>();
    customCategories.forEach(cat => {
      if (cat.position !== undefined) {
        allPositions.add(cat.position);
      }
    });
    Object.values(categoryOverrides).forEach(override => {
      if (override.position !== undefined) {
        allPositions.add(override.position);
      }
    });

    // If position is not provided, automatically assign the next available position
    let finalPosition = position;
    if (finalPosition === undefined) {
      // Find the highest position and add 1, or start at 1 if no positions exist
      const maxPosition = allPositions.size > 0 ? Math.max(...Array.from(allPositions)) : 0;
      finalPosition = maxPosition + 1;
    }

    if (allPositions.has(finalPosition)) {
      alert(`Position ${finalPosition} is already assigned to another category. Please choose a different position.`);
      return;
    }

    const newCategory: CustomCategory = {
      name,
      position: finalPosition,
    };

    setCustomCategories((prev) => {
      const updated = [...prev, newCategory];
      saveCustomCategories(updated);
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
      window.dispatchEvent(new CustomEvent("customCategoriesUpdated"));
      return updated;
    });

    // Save category card content if any fields are provided
    const topLabel = (formData.get("topLabel") as string)?.trim() || undefined;
    const cardTitle = (formData.get("cardTitle") as string)?.trim() || undefined;
    const cardDescription = (formData.get("cardDescription") as string)?.trim() || undefined;
    const categoryImageURL = (formData.get("categoryImageUpload") as string)?.trim() || undefined;

    // Only save if at least one field has a value
    if (topLabel || cardTitle || cardDescription || categoryImageURL) {
      const contentToSave: CategoryCardContent = {
        categoryName: name,
        topLabel,
        cardTitle: cardTitle || name,
        cardDescription,
        categoryImageURL,
        // Preserve legacy backgroundImage for older renders
        backgroundImage: categoryImageURL,
      };

      // Remove undefined values
      Object.keys(contentToSave).forEach(key => {
        if (key !== 'categoryName' && contentToSave[key as keyof CategoryCardContent] === undefined) {
          delete contentToSave[key as keyof CategoryCardContent];
        }
      });

      saveCategoryCardContent(contentToSave);
      setCategoryContentUpdateTrigger(prev => prev + 1);
    }

    form.reset();
    setNewCategoryImagePreview("");
    if (addCategoryImageInputRef.current) {
      addCategoryImageInputRef.current.value = "";
    }
    setPositionInputValue("");
    setShowCategoryForm(false);
  };

  const handlePositionChange = (currentPosition: number | undefined) => {
    if (!editingCardContent) return;

    const inputValue = positionInputValue.trim();

    // If empty, clear position
    if (inputValue === "") {
      const isCustomCategory = customCategories.some(cat => cat.name === editingCardContent.categoryName);
      if (isCustomCategory) {
        setCustomCategories((prev) => {
          const updated = prev.map((cat) =>
            cat.name === editingCardContent!.categoryName
              ? { ...cat, position: undefined }
              : cat
          );
          saveCustomCategories(updated);
          window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
          window.dispatchEvent(new CustomEvent("customCategoriesUpdated"));
          return updated;
        });
      } else {
        const currentOverride = categoryOverrides[editingCardContent.categoryName] || {};
        updateCategoryOverride(editingCardContent.categoryName, { ...currentOverride, position: undefined });
        setCategoryOverrides(getCategoryOverrideMap());
        window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
        window.dispatchEvent(new CustomEvent("customCategoriesUpdated"));
      }
      setIsEditingPosition(false);
      setPositionInputValue("");
      return;
    }

    // Parse and validate position
    const positionNum = parseInt(inputValue, 10);
    if (isNaN(positionNum) || positionNum < 1) {
      alert("Please enter a valid position number (1 or greater)");
      return;
    }

    // If the new position is the same as current, do nothing
    if (currentPosition === positionNum) {
      setIsEditingPosition(false);
      setPositionInputValue("");
      return;
    }

    // Get current category info
    const isCustomCategory = customCategories.some(cat => cat.name === editingCardContent.categoryName);

    // Find which category currently has the target position
    let categoryWithTargetPosition: { name: string; isCustom: boolean } | null = null;

    // Check custom categories
    const customCatWithPosition = customCategories.find(cat =>
      cat.name !== editingCardContent.categoryName && cat.position === positionNum
    );
    if (customCatWithPosition) {
      categoryWithTargetPosition = { name: customCatWithPosition.name, isCustom: true };
    } else {
      // Check category overrides
      const overrideWithPosition = Object.entries(categoryOverrides).find(([name, override]) =>
        name !== editingCardContent.categoryName && override.position === positionNum
      );
      if (overrideWithPosition) {
        categoryWithTargetPosition = { name: overrideWithPosition[0], isCustom: false };
      }
    }

    // If position is taken, swap positions
    if (categoryWithTargetPosition) {
      // Swap: give the other category the current position (or undefined if no current position)
      if (categoryWithTargetPosition.isCustom) {
        // Update the other custom category with current position
        setCustomCategories((prev) => {
          const updated = prev.map((cat) =>
            cat.name === categoryWithTargetPosition!.name
              ? { ...cat, position: currentPosition }
              : cat
          );
          saveCustomCategories(updated);
          return updated;
        });
      } else {
        // Update the other category's override with current position
        const otherOverride = categoryOverrides[categoryWithTargetPosition.name] || {};
        updateCategoryOverride(categoryWithTargetPosition.name, {
          ...otherOverride,
          position: currentPosition
        });
        setCategoryOverrides(getCategoryOverrideMap());
      }
    }

    // Update the current category with the new position
    if (isCustomCategory) {
      // Update custom category position
      setCustomCategories((prev) => {
        const updated = prev.map((cat) =>
          cat.name === editingCardContent!.categoryName
            ? { ...cat, position: positionNum }
            : cat
        );
        saveCustomCategories(updated);
        window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
        window.dispatchEvent(new CustomEvent("customCategoriesUpdated"));
        return updated;
      });
    } else {
      // Update existing category position via override
      const currentOverride = categoryOverrides[editingCardContent.categoryName] || {};
      updateCategoryOverride(editingCardContent.categoryName, { ...currentOverride, position: positionNum });
      setCategoryOverrides(getCategoryOverrideMap());
      window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
      window.dispatchEvent(new CustomEvent("customCategoriesUpdated"));
    }

    // Reset editing state
    setIsEditingPosition(false);
    setPositionInputValue("");
  };

  const handleCategoryDelete = (name: string) => {
    setCustomCategories((prev) => {
      const updated = prev.filter((item) => item.name !== name);
      saveCustomCategories(updated);
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
      window.dispatchEvent(new CustomEvent("customCategoriesUpdated"));
      return updated;
    });
    if (editingCategoryName === name) {
      setEditingCategoryName(null);
      setEditingCategoryValue("");
    }
    setDeleteCustomCategoryName(null);
  };

  const handleCategoryDeleteRequest = (name: string) => {
    const productCount = categoryProductCountMap.get(name) ?? 0;
    if (productCount > 0) {
      setBlockedCategoryDelete({ name, productCount });
      return;
    }
    setDeleteCustomCategoryName(name);
  };

  const handleCategoryRename = (originalName: string) => {
    if (!editingCategoryValue.trim()) return;
    const newName = editingCategoryValue.trim();

    // Check if new name already exists
    if (customCategories.some(cat => cat.name === newName && cat.name !== originalName)) {
      alert("A category with this name already exists");
      return;
    }

    setCustomCategories((prev) => {
      const updated = prev.map((item) => (item.name === originalName ? { ...item, name: newName } : item));
      saveCustomCategories(updated);
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
      window.dispatchEvent(new CustomEvent("customCategoriesUpdated"));
      return updated;
    });
    setEditingCategoryName(null);
    setEditingCategoryValue("");
  };

  const handleDeleteCategoryCardContent = (categoryName: string) => {
    deleteCategoryCardContent(categoryName);
    setCategoryContentUpdateTrigger(prev => prev + 1);
    setDeleteCategoryCardName(null);
  };

  return (
    <AdminLayout title="Products & Inventory">
      {/* KPI row */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <Button
                size="sm"
                className="gap-1.5 text-xs sm:text-sm bg-gradient-to-r from-[#00c6ff] to-[#00d97e] text-white hover:opacity-90 shadow-md hover:shadow-lg transition-colors"
                onClick={handleNewProduct}
              >
                <Plus className="h-3.5 w-3.5" />
                New Product
              </Button>
            </div>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            {/* Product Form Dialog */}
            <Dialog open={editingProduct !== null} onOpenChange={(open) => {
              if (!open) {
                setEditingProduct(null);
                setThumbnailUrl("");
                setGalleryImages([]);
                clearProductDraft();
              }
            }}>
              <DialogContent className="w-full max-w-lg sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct && products.some((p) => p.id === editingProduct.id) ? "Edit Product" : "New Product"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingProduct && products.some((p) => p.id === editingProduct.id)
                      ? "Update product details, pricing, and inventory."
                      : "Add a new product to your catalog. Fill in the details below."}
                  </DialogDescription>
                </DialogHeader>
                {editingProduct && (
                  <form
                    className="grid gap-3 md:gap-4 md:grid-cols-12"
                    onSubmit={handleProductFormSubmit}
                  >
                    <div className="space-y-1 md:col-span-6">
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
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-medium text-muted-foreground">Category</label>
                      <select
                        className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs sm:text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={editingProduct.category || allCategories[0] || "General"}
                        onChange={(e) =>
                          setEditingProduct((prev) =>
                            prev ? { ...prev, category: e.target.value, brand: "" } : prev,
                          )
                        }
                      >
                        {allCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1 md:col-span-3">
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
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-medium text-muted-foreground">Purchase price (₹)</label>
                      <Input
                        type="number"
                        min={0}
                        value={editingProduct.purchasePrice ?? ""}
                        onChange={(event) =>
                          setEditingProduct((prev) =>
                            prev
                              ? {
                                ...prev,
                                purchasePrice:
                                  event.target.value === "" ? undefined : Number.parseFloat(event.target.value || "0"),
                              }
                              : prev,
                          )
                        }
                        className="h-9 text-sm"
                        placeholder="Optional"
                      />
                    </div>
                    {isEditingExistingProduct && (
                      <div className="space-y-1 md:col-span-3">
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

                    <div className="space-y-1 md:col-span-6">
                      <label className="text-xs font-medium text-muted-foreground">Brand</label>
                      <div className="flex items-center gap-2">
                        <select
                          className="h-9 w-full rounded-md border border-input bg-background px-3 text-xs sm:text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={editingProduct.brand ?? ""}
                          onChange={(e) =>
                            setEditingProduct((prev) =>
                              prev ? { ...prev, brand: e.target.value } : prev,
                            )
                          }
                        >
                          <option value="">Select brand</option>
                          {filteredBrands.map((brand) => (
                            <option key={brand.name} value={brand.name}>
                              {brand.name}
                            </option>
                          ))}
                        </select>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              size="icon"
                              className="h-9 w-9 bg-[#111827] hover:bg-black text-white rounded-lg shadow-sm border-0 transition-colors duration-200"
                              onClick={() => setShowBrandForm((prev) => !prev)}
                              disabled={!editingProduct.category}
                            >
                              <Plus className="h-5 w-5" />
                              <span className="sr-only">Add new brand</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="z-[2000]">
                            <p>Add new brand</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      {showBrandForm && (
                        <div className="space-y-2 rounded-md border border-border/70 bg-muted/20 px-2.5 py-2.5 sm:px-3 sm:py-3">
                          <div className="space-y-1">
                            <Input
                              value={newBrandName}
                              onChange={(event) => setNewBrandName(event.target.value)}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  handleInlineBrandSave();
                                }
                              }}
                              placeholder="New brand name"
                              className="h-8 text-xs sm:text-sm"
                            />
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => {
                                setNewBrandName("");
                                setShowBrandForm(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={handleInlineBrandSave}
                            >
                              Save brand
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1 md:col-span-3">
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
                    <div className="space-y-1 md:col-span-3">
                      <label className="text-xs font-medium text-muted-foreground">Tax (%)</label>
                      <Input
                        type="number"
                        min={0}
                        value={editingProduct.tax ?? ""}
                        onChange={(event) =>
                          setEditingProduct((prev) =>
                            prev
                              ? {
                                ...prev,
                                tax: event.target.value === "" ? undefined : Number.parseFloat(event.target.value || "0"),
                              }
                              : prev,
                          )
                        }
                        className="h-9 text-sm"
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-3">
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
                    {/* Image & pricing meta layout (desktop: 2-column grid, mobile: stacked) */}
                    <div className="md:col-span-12 grid gap-3 md:gap-4 md:grid-cols-2 items-start">
                      {/* Left column: thumbnail + gallery (stacked vertically) */}
                      <div className="space-y-3">
                        <div className="space-y-1 rounded-md border border-border/70 bg-muted/20 px-3 py-2.5 sm:px-4 sm:py-3">
                          <label className="text-xs font-medium text-muted-foreground">
                            Primary Thumbnail Image
                            <span className="ml-1 text-[11px] font-normal text-muted-foreground">
                              (Used for Product Grid)
                            </span>
                          </label>
                          <div
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border/70 bg-background px-3 py-2 text-[11px] sm:text-xs transition hover:bg-muted/60"
                            onClick={() => thumbnailInputRef.current?.click()}
                            onDragOver={(event) => {
                              event.preventDefault();
                            }}
                            onDrop={(event) => {
                              event.preventDefault();
                              handleThumbnailSelect(event.dataTransfer.files);
                            }}
                          >
                            <div className="flex flex-col gap-0.5 text-left">
                              <span className="font-medium text-foreground text-xs sm:text-[13px]">
                                Click to select thumbnail
                              </span>
                              <span className="text-[11px] text-muted-foreground leading-snug">
                                Single main image used in the product grid and as the first slide on the product page.
                              </span>
                            </div>
                          </div>
                          <input
                            ref={thumbnailInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => handleThumbnailSelect(event.target.files)}
                          />
                          {thumbnailUrl && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              <div className="relative group w-24 h-24 sm:w-28 sm:h-28">
                                <div className="w-full h-full overflow-hidden rounded-md border border-border/60 bg-background">
                                  <img
                                    src={thumbnailUrl}
                                    alt={`${editingProduct.name || "Product"} primary thumbnail`}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-medium">
                                  Main Thumbnail
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={handleClearThumbnail}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 rounded-md border border-border/70 bg-muted/20 px-3 py-2.5 sm:px-4 sm:py-3">
                          <label className="text-xs font-medium text-muted-foreground">
                            Additional Gallery Images
                            <span className="ml-1 text-[11px] font-normal text-muted-foreground">
                              (Used for PDP Slider)
                            </span>
                          </label>
                          <div
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-border/70 bg-background px-3 py-2 text-[11px] sm:text-xs transition hover:bg-muted/60"
                            onClick={() => galleryInputRef.current?.click()}
                            onDragOver={(event) => {
                              event.preventDefault();
                            }}
                            onDrop={(event) => {
                              event.preventDefault();
                              handleGallerySelect(event.dataTransfer.files);
                            }}
                          >
                            <div className="flex flex-col gap-0.5 text-left">
                              <span className="font-medium text-foreground text-xs sm:text-[13px]">
                                Click to add gallery images
                              </span>
                              <span className="text-[11px] text-muted-foreground leading-snug">
                                Upload 1–4 extra images shown after the thumbnail on the product detail page slider.
                              </span>
                            </div>
                            {galleryImages.length > 0 && (
                              <div className="text-xs text-muted-foreground">
                                {galleryImages.length} / 4
                              </div>
                            )}
                          </div>
                          <input
                            ref={galleryInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(event) => handleGallerySelect(event.target.files)}
                          />
                          {galleryImages.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {galleryImages.map((imageUrl, index) => (
                                <div key={index} className="relative group w-16 h-16 sm:w-20 sm:h-20">
                                  <div className="w-full h-full overflow-hidden rounded-md border border-border/60 bg-background">
                                    <img
                                      src={imageUrl}
                                      alt={`${editingProduct.name || "Product"} gallery image ${index + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleRemoveGalleryImage(index)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right column: Discount + Description stacked vertically */}
                      <div className="space-y-3">
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
                                      event.target.value === ""
                                        ? undefined
                                        : Number.parseFloat(event.target.value || "0"),
                                  }
                                  : prev,
                              )
                            }
                            className="h-9 text-sm"
                            placeholder="Optional"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-medium text-muted-foreground">
                            Description (shown on product page)
                          </label>
                          <Input
                            value={editingProduct.description ?? ""}
                            onChange={(event) =>
                              setEditingProduct((prev) =>
                                prev ? { ...prev, description: event.target.value } : prev,
                              )
                            }
                            className="h-10 text-sm"
                            placeholder="Short description visible on the product details page"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-col gap-2 md:col-span-12 md:flex-row md:justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        className="text-xs sm:text-sm"
                        onClick={() => {
                          setEditingProduct(null);
                          setThumbnailUrl("");
                          setGalleryImages([]);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="text-xs sm:text-sm">
                        Save changes
                      </Button>
                    </div>
                  </form>
                )}
              </DialogContent>
            </Dialog>

            <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-4">
              <TabsList className="grid grid-cols-2 w-full h-auto gap-1 bg-muted p-1 rounded-lg sm:flex sm:w-fit sm:rounded-full">
                <TabsTrigger
                  value="catalog"
                  className="rounded-full px-3 py-2 text-xs sm:text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e] w-full"
                >
                  Catalogue
                </TabsTrigger>
                <TabsTrigger
                  value="stock"
                  className="rounded-full px-3 py-2 text-xs sm:text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e] w-full"
                >
                  Stock view
                </TabsTrigger>
                <TabsTrigger
                  value="categories"
                  className="rounded-full px-3 py-2 text-xs sm:text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e] w-full"
                >
                  Categories
                </TabsTrigger>
                <TabsTrigger
                  value="brands"
                  className="rounded-full px-3 py-2 text-xs sm:text-sm font-semibold data-[state=active]:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00c6ff] data-[state=active]:to-[#00d97e] w-full"
                >
                  Brands
                </TabsTrigger>
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
                              <div className="flex items-center justify-end gap-1">
                                <Tooltip delayDuration={300}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-7 w-7 hover:bg-[#111827] hover:text-white transition-all duration-200 ease-in-out"
                                      onClick={() => handleEditClick(product)}
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p>Edit product</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip delayDuration={300}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                                      onClick={() => setDeleteProductId(product.id)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p>Delete product</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
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
                      <SelectItem value="all" className="focus:bg-[#111827] focus:text-white">All locations</SelectItem>
                      <SelectItem value="main" className="focus:bg-[#111827] focus:text-white">Main store</SelectItem>
                      <SelectItem value="online" className="focus:bg-[#111827] focus:text-white">Online only</SelectItem>
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
                    className="gap-1.5 text-xs sm:text-sm bg-gradient-to-r from-[#00c6ff] to-[#00d97e] text-white hover:opacity-90 shadow-md hover:shadow-lg transition-colors"
                    onClick={() => setShowCategoryForm(true)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add category
                  </Button>
                </div>

                {/* Add Category Dialog */}
                <Dialog open={showCategoryForm} onOpenChange={(open) => {
                  if (!open) {
                    setShowCategoryForm(false);
                    setPositionInputValue("");
                    setNewCategoryImagePreview("");
                    if (addCategoryImageInputRef.current) {
                      addCategoryImageInputRef.current.value = "";
                    }
                  }
                }}>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add Category</DialogTitle>
                      <DialogDescription>
                        Create a new category for your products. You can customize the display settings and position.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleCategoryCreate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="categoryName">Category name</Label>
                        <Input
                          id="categoryName"
                          name="categoryName"
                          placeholder="e.g. Office Stationery"
                          className="h-9 text-sm"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          The name of the category as it will appear in the system.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Position (Optional)</Label>
                        <Input
                          id="position"
                          name="position"
                          type="number"
                          min="1"
                          value={positionInputValue}
                          onChange={(e) => setPositionInputValue(e.target.value)}
                          placeholder="e.g. 1, 2, 3"
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          Set the display order on the front-end. Lower numbers appear first. Each position can only be used once. Next available: {nextAvailablePosition}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="topLabel">Top Label (Small Text)</Label>
                        <Input
                          id="topLabel"
                          name="topLabel"
                          placeholder="e.g., AWARDS, TECHNOLOGY"
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          Small text displayed at the top of the card (e.g., "AWARDS", "TECHNOLOGY").
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardTitle">Card Title (Large Text)</Label>
                        <Input
                          id="cardTitle"
                          name="cardTitle"
                          placeholder="e.g., Trophies & Awards"
                          className="text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          Main large title displayed on the card. Leave empty to use the category name.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardDescription">Card Description</Label>
                        <Textarea
                          id="cardDescription"
                          name="cardDescription"
                          placeholder="e.g., Hand-polished accolades and signature centerpieces."
                          className="text-sm min-h-[80px]"
                        />
                        <p className="text-xs text-muted-foreground">
                          Short descriptive text or tagline displayed on the card.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="categoryImageURL">Category Card Image</Label>
                            <p className="text-xs text-muted-foreground">
                              This image will be used as the background for the category card on the homepage.
                              Recommended aspect ratio: 1:1 or 4:3.
                            </p>
                          </div>
                          {newCategoryImagePreview && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => {
                                setNewCategoryImagePreview("");
                                if (addCategoryImageInputRef.current) {
                                  addCategoryImageInputRef.current.value = "";
                                }
                              }}
                            >
                              Clear image
                            </Button>
                          )}
                        </div>

                        <div className="rounded-lg border border-dashed border-border/70 bg-muted/40 p-3">
                          {newCategoryImagePreview ? (
                            <div className="flex items-center gap-3">
                              <div className="h-16 w-28 overflow-hidden rounded-md bg-background">
                                <img
                                  src={newCategoryImagePreview}
                                  alt="New category preview"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                <div className="font-medium text-foreground/80">Preview</div>
                                <div>Using uploaded image</div>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">
                              No image selected. A dark gradient will be used by default.
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <input
                            ref={addCategoryImageInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleNewCategoryImageFile(e.target.files?.[0])}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-9 text-xs"
                            onClick={() => addCategoryImageInputRef.current?.click()}
                          >
                            Upload image
                          </Button>
                          <input type="hidden" name="categoryImageUpload" value={newCategoryImagePreview} />
                          <p className="text-[11px] text-muted-foreground">
                            Upload a file. Uploaded images are stored locally for preview.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-sm"
                          onClick={() => {
                            setShowCategoryForm(false);
                            setPositionInputValue("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="gap-1.5 text-sm">
                          <Plus className="h-4 w-4" />
                          Save Category
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>

                <Card className="border-border bg-card text-card-foreground shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-base font-semibold">All categories</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-4 text-sm">
                    <div className="space-y-2">
                      {sortedCategoriesForDisplay.map((category) => {
                        const override = categoryOverrides[category.name];
                        const displayName = override?.name || category.name;
                        const isHidden = override?.hidden === true;
                        // Fetch custom card content for this category
                        const customContent = getCategoryCardContent(category.name);

                        // Helper function to truncate description
                        const truncateDescription = (text: string | undefined, maxWords: number = 15): string => {
                          if (!text || text.trim() === "") return "";
                          const words = text.trim().split(/\s+/);
                          if (words.length <= maxWords) return text;
                          return words.slice(0, maxWords).join(" ") + "...";
                        };

                        return (
                          <div
                            key={category.id}
                            className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="font-medium flex items-center gap-2">
                                <span>{displayName}</span>
                                {isHidden && (
                                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                    Hidden
                                  </Badge>
                                )}
                                {category.position !== undefined && (
                                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                    Position: {category.position}
                                  </Badge>
                                )}
                              </div>

                              {/* Custom Content Summary */}
                              {customContent && (
                                <div className="mt-2 space-y-1 pl-1 border-l-2 border-muted/30">
                                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                                    {/* Top Label */}
                                    {customContent.topLabel ? (
                                      <span className="inline-flex items-center gap-1">
                                        <span className="font-medium text-foreground/70">Label:</span>
                                        <span className="px-1.5 py-0.5 bg-muted/50 rounded text-[10px] font-medium">
                                          {customContent.topLabel}
                                        </span>
                                      </span>
                                    ) : (
                                      <span className="text-muted-foreground/60 italic">[No Top Label Set]</span>
                                    )}

                                    {/* Badge Value */}
                                    {customContent.badgeValue && (
                                      <span className="inline-flex items-center gap-1">
                                        <span className="font-medium text-foreground/70">Badge:</span>
                                        <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-semibold">
                                          {customContent.badgeValue}
                                        </span>
                                      </span>
                                    )}
                                  </div>

                                  {/* Card Title */}
                                  {customContent.cardTitle && (
                                    <div className="text-[11px] text-muted-foreground">
                                      <span className="font-medium text-foreground/70">Title:</span>{" "}
                                      <span className={customContent.cardTitle === displayName ? "italic text-muted-foreground/60" : ""}>
                                        {customContent.cardTitle}
                                        {customContent.cardTitle === displayName && " (uses default name)"}
                                      </span>
                                    </div>
                                  )}

                                  {/* Description Snippet */}
                                  {customContent.cardDescription && (
                                    <div className="text-[11px] text-muted-foreground line-clamp-2">
                                      <span className="font-medium text-foreground/70">Description:</span>{" "}
                                      <span>{truncateDescription(customContent.cardDescription, 15)}</span>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Default message if no custom content */}
                              {!customContent && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  Products assigned to this category will be grouped in the storefront.
                                </p>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {category.productCount > 0 ? `${category.productCount} products` : "No products yet"}
                              </Badge>
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <Tooltip delayDuration={300}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="outline"
                                      className="h-7 w-7 hover:bg-[#111827] hover:text-white transition-all duration-200 ease-in-out"
                                      onClick={() => {
                                        // Fetch existing content for this category
                                        // Use the original category.name as the key (not displayName)
                                        const existingContent = getCategoryCardContent(category.name);

                                        // Debug: Log what we're retrieving
                                        console.log("=== Loading Category Card Content ===");
                                        console.log("Category name (key):", category.name);
                                        console.log("Display name:", displayName);
                                        console.log("Retrieved content:", existingContent);
                                        console.log("Card Description from storage:", existingContent?.cardDescription);

                                        // Create initial content object with all fields properly initialized
                                        // IMPORTANT: Check if property exists in the object (it may have been deleted if undefined)
                                        const existingImage =
                                          (existingContent && existingContent.categoryImageURL != null)
                                            ? String(existingContent.categoryImageURL)
                                            : (existingContent && existingContent.backgroundImage != null)
                                              ? String(existingContent.backgroundImage)
                                              : "";

                                        const initialContent: CategoryCardContent = {
                                          categoryName: category.name,
                                          // Check if property exists in object and has a value
                                          topLabel: (existingContent && existingContent.topLabel != null)
                                            ? String(existingContent.topLabel)
                                            : "",
                                          cardTitle: (existingContent && existingContent.cardTitle != null)
                                            ? String(existingContent.cardTitle)
                                            : displayName,
                                          // CRITICAL: Load cardDescription if it exists in the saved object
                                          // Check both if property exists and if it has a value
                                          cardDescription: (existingContent && 'cardDescription' in existingContent)
                                            ? (existingContent.cardDescription != null ? String(existingContent.cardDescription) : "")
                                            : "",
                                          // CRITICAL: Load badgeValue if it exists in the saved object
                                          badgeValue: (existingContent && 'badgeValue' in existingContent)
                                            ? (existingContent.badgeValue != null ? String(existingContent.badgeValue) : "")
                                            : "",
                                          categoryImageURL: existingImage,
                                          backgroundImage: existingImage,
                                        };

                                        // Debug: Log what we're setting
                                        console.log("Initial content being set:", initialContent);
                                        console.log("Card Description value (final):", initialContent.cardDescription);
                                        console.log("Badge Value (final):", initialContent.badgeValue);
                                        console.log("Type of cardDescription:", typeof initialContent.cardDescription);

                                        // Set the editing state - use a fresh object to ensure React detects the change
                                        setEditingCardContent({
                                          categoryName: category.name,
                                          content: { ...initialContent },
                                        });

                                        // Initialize position input value
                                        const override = categoryOverrides[category.name];
                                        const position = override?.position;
                                        setPositionInputValue(position !== undefined ? String(position) : "");
                                        setIsEditingPosition(false);
                                      }}
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p>Edit content</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip delayDuration={300}>
                                  <TooltipTrigger asChild>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="ghost"
                                      className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                                      onClick={() => setDeleteCategoryCardName(category.name)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">
                                    <p>Delete category</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {customCategories.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        No additional categories yet. Use the form on the left to create one.
                      </p>
                    ) : (
                      <div className="space-y-2 pt-1 border-t border-border/60 mt-2">
                        {customCategories.map((categoryObj) => {
                          const category = categoryObj.name;
                          // Use the trigger to force re-render when content updates
                          const _ = categoryContentUpdateTrigger;

                          // Calculate product count for this category
                          const productCount = categoryProductCountMap.get(category) ?? 0;

                          // Fetch custom card content for this category
                          const customContent = getCategoryCardContent(category);
                          const displayName = category;
                          const position = categoryObj.position;

                          // Helper function to truncate description
                          const truncateDescription = (text: string | undefined, maxWords: number = 15): string => {
                            if (!text || text.trim() === "") return "";
                            const words = text.trim().split(/\s+/);
                            if (words.length <= maxWords) return text;
                            return words.slice(0, maxWords).join(" ") + "...";
                          };

                          return (
                            <div
                              key={category}
                              className="flex items-center justify-between rounded-md border border-border/70 px-3 py-2"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="font-medium flex items-center gap-2">
                                  <span>{displayName}</span>
                                  {position !== undefined && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                      Position: {position}
                                    </Badge>
                                  )}
                                </div>

                                {/* Custom Content Summary */}
                                {customContent && (
                                  <div className="mt-2 space-y-1 pl-1 border-l-2 border-muted/30">
                                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                                      {/* Top Label */}
                                      {customContent.topLabel ? (
                                        <span className="inline-flex items-center gap-1">
                                          <span className="font-medium text-foreground/70">Label:</span>
                                          <span className="px-1.5 py-0.5 bg-muted/50 rounded text-[10px] font-medium">
                                            {customContent.topLabel}
                                          </span>
                                        </span>
                                      ) : (
                                        <span className="text-muted-foreground/60 italic">[No Top Label Set]</span>
                                      )}

                                      {/* Badge Value */}
                                      {customContent.badgeValue && (
                                        <span className="inline-flex items-center gap-1">
                                          <span className="font-medium text-foreground/70">Badge:</span>
                                          <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-semibold">
                                            {customContent.badgeValue}
                                          </span>
                                        </span>
                                      )}
                                    </div>

                                    {/* Card Title */}
                                    {customContent.cardTitle && (
                                      <div className="text-[11px] text-muted-foreground">
                                        <span className="font-medium text-foreground/70">Title:</span>{" "}
                                        <span className={customContent.cardTitle === displayName ? "italic text-muted-foreground/60" : ""}>
                                          {customContent.cardTitle}
                                          {customContent.cardTitle === displayName && " (uses default name)"}
                                        </span>
                                      </div>
                                    )}

                                    {/* Description Snippet */}
                                    {customContent.cardDescription && (
                                      <div className="text-[11px] text-muted-foreground line-clamp-2">
                                        <span className="font-medium text-foreground/70">Description:</span>{" "}
                                        <span>{truncateDescription(customContent.cardDescription, 15)}</span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Default message if no custom content */}
                                {!customContent && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Products assigned to this category will be grouped in the storefront.
                                  </p>
                                )}
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {productCount > 0 ? `${productCount} products` : "No products yet"}
                                </Badge>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="outline"
                                        className="h-7 w-7 hover:bg-[#111827] hover:text-white transition-all duration-200 ease-in-out"
                                        onClick={() => {
                                          // Fetch existing content for this custom category
                                          const existingContent = getCategoryCardContent(category);

                                          // Create initial content object with all fields properly initialized
                                          const existingImage =
                                            (existingContent && existingContent.categoryImageURL != null)
                                              ? String(existingContent.categoryImageURL)
                                              : (existingContent && existingContent.backgroundImage != null)
                                                ? String(existingContent.backgroundImage)
                                                : "";

                                          const initialContent: CategoryCardContent = {
                                            categoryName: category,
                                            topLabel: (existingContent && existingContent.topLabel != null)
                                              ? String(existingContent.topLabel)
                                              : "",
                                            cardTitle: (existingContent && existingContent.cardTitle != null)
                                              ? String(existingContent.cardTitle)
                                              : category,
                                            cardDescription: (existingContent && 'cardDescription' in existingContent)
                                              ? (existingContent.cardDescription != null ? String(existingContent.cardDescription) : "")
                                              : "",
                                            badgeValue: (existingContent && 'badgeValue' in existingContent)
                                              ? (existingContent.badgeValue != null ? String(existingContent.badgeValue) : "")
                                              : "",
                                            categoryImageURL: existingImage,
                                            backgroundImage: existingImage,
                                          };

                                          // Set the editing state - use a fresh object to ensure React detects the change
                                          setEditingCardContent({
                                            categoryName: category,
                                            content: { ...initialContent },
                                          });

                                          // Initialize position input value for custom category
                                          const customCat = customCategories.find(cat => cat.name === category);
                                          const position = customCat?.position;
                                          setPositionInputValue(position !== undefined ? String(position) : "");
                                          setIsEditingPosition(false);
                                        }}
                                      >
                                        <Pencil className="h-3.5 w-3.5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">
                                      <p>Edit category content</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                                        onClick={() => handleCategoryDeleteRequest(category)}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="left">
                                      <p>Delete category</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Brands management tab */}
              <TabsContent value="brands" className="space-y-4">
                <BrandManagementPanel products={products} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Category Card Content Edit Dialog */}
        <Dialog open={editingCardContent !== null} onOpenChange={(open) => {
          if (!open) {
            setEditingCardContent(null);
            setPositionInputValue("");
            setIsEditingPosition(false);
            if (editCategoryImageInputRef.current) {
              editCategoryImageInputRef.current.value = "";
            }
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Category Card Content</DialogTitle>
              <DialogDescription>
                Customize the display text and visual elements for the "{editingCardContent?.categoryName}" category card on the homepage.
              </DialogDescription>
            </DialogHeader>
            {editingCardContent && editingCardContent.content && (
              <form
                key={editingCardContent.categoryName} // Force re-render when category changes
                onSubmit={(e) => {
                  e.preventDefault();
                  if (editingCardContent.content) {
                    // Debug: Log what we're saving
                    console.log("=== Saving Category Card Content ===");
                    console.log("Form content before save:", editingCardContent.content);
                    console.log("Card Description from form:", editingCardContent.content.cardDescription);

                    // Save exactly what's in the form - preserve all values including empty strings
                    const contentToSave: CategoryCardContent = {
                      categoryName: editingCardContent.content.categoryName,
                      // Save trimmed values - convert empty strings to undefined for clean storage
                      topLabel: editingCardContent.content.topLabel?.trim() || undefined,
                      cardTitle: editingCardContent.content.cardTitle?.trim() || editingCardContent.categoryName,
                      // CRITICAL: Save cardDescription - preserve non-empty values, convert empty to undefined
                      cardDescription: editingCardContent.content.cardDescription?.trim() || undefined,
                      // CRITICAL: Save badgeValue - preserve non-empty values
                      badgeValue: editingCardContent.content.badgeValue?.trim() || undefined,
                      categoryImageURL:
                        editingCardContent.content.categoryImageURL?.trim() ||
                        editingCardContent.content.backgroundImage?.trim() ||
                        undefined,
                      // Keep legacy backgroundImage in sync so older readers keep working
                      backgroundImage:
                        editingCardContent.content.categoryImageURL?.trim() ||
                        editingCardContent.content.backgroundImage?.trim() ||
                        undefined,
                    };

                    // Debug: Log before cleanup
                    console.log("Content to save (before cleanup):", contentToSave);

                    // Remove undefined values to keep storage clean
                    Object.keys(contentToSave).forEach(key => {
                      if (key !== 'categoryName' && contentToSave[key as keyof CategoryCardContent] === undefined) {
                        delete contentToSave[key as keyof CategoryCardContent];
                      }
                    });

                    // Debug: Log final content
                    console.log("Final content being saved:", contentToSave);
                    console.log("Card Description in final save:", contentToSave.cardDescription);

                    saveCategoryCardContent(contentToSave);
                    setEditingCardContent(null);
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="topLabel">Top Label (Small Text)</Label>
                  <Input
                    id="topLabel"
                    value={editingCardContent.content?.topLabel ?? ""}
                    onChange={(e) =>
                      setEditingCardContent({
                        ...editingCardContent,
                        content: editingCardContent.content ? {
                          ...editingCardContent.content,
                          topLabel: e.target.value,
                        } : null,
                      })
                    }
                    placeholder="e.g., AWARDS, TECHNOLOGY"
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Small text displayed at the top of the card (e.g., "AWARDS", "TECHNOLOGY").
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardTitle">Card Title (Large Text)</Label>
                  <Input
                    id="cardTitle"
                    value={editingCardContent.content?.cardTitle ?? ""}
                    onChange={(e) =>
                      setEditingCardContent({
                        ...editingCardContent,
                        content: editingCardContent.content ? {
                          ...editingCardContent.content,
                          cardTitle: e.target.value,
                        } : null,
                      })
                    }
                    placeholder="e.g., Trophies & Awards"
                    className="text-sm"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Main large title displayed on the card. This will override the default category name.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardDescription">Card Description</Label>
                  <Textarea
                    id="cardDescription"
                    key={`desc-${editingCardContent.categoryName}`}
                    value={editingCardContent.content?.cardDescription != null ? String(editingCardContent.content.cardDescription) : ""}
                    onChange={(e) => {
                      if (editingCardContent && editingCardContent.content) {
                        setEditingCardContent({
                          categoryName: editingCardContent.categoryName,
                          content: {
                            ...editingCardContent.content,
                            cardDescription: e.target.value,
                          },
                        });
                      }
                    }}
                    placeholder="e.g., Hand-polished accolades and signature centerpieces."
                    className="text-sm min-h-[80px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Short descriptive text or tagline displayed on the card.
                  </p>
                </div>

                {(() => {
                  const currentImage =
                    editingCardContent.content?.categoryImageURL ||
                    editingCardContent.content?.backgroundImage ||
                    "";

                  return (
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="categoryImageURL">Category Card Image</Label>
                          <p className="text-xs text-muted-foreground">
                            This image will be used as the background for the category card on the homepage.
                            Recommended aspect ratio: 1:1 or 4:3.
                          </p>
                        </div>
                        {currentImage && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs"
                            onClick={() => {
                              setEditingCardContent((prev) =>
                                prev
                                  ? {
                                    ...prev,
                                    content: prev.content
                                      ? { ...prev.content, categoryImageURL: undefined, backgroundImage: undefined }
                                      : null,
                                  }
                                  : prev
                              );
                              if (editCategoryImageInputRef.current) {
                                editCategoryImageInputRef.current.value = "";
                              }
                            }}
                          >
                            Remove image
                          </Button>
                        )}
                      </div>

                      <div className="rounded-lg border border-dashed border-border/70 bg-muted/40 p-3">
                        {currentImage ? (
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-28 overflow-hidden rounded-md bg-background">
                              <img
                                src={currentImage}
                                alt="Category preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="text-xs text-muted-foreground">
                              <div className="font-medium text-foreground/80">Current image</div>
                              <div>Shown on the homepage card</div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            No image set. A dark gradient will be used by default.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          ref={editCategoryImageInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleEditCategoryImageFile(e.target.files?.[0])}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-9 text-xs"
                          onClick={() => editCategoryImageInputRef.current?.click()}
                        >
                          Upload image
                        </Button>
                        <p className="text-[11px] text-muted-foreground">
                          Upload a file. Uploaded images stay in the browser only. Recommended aspect ratio: 1:1 or 4:3.
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {/* Position field - show for all categories */}
                <div className="space-y-2">
                  <Label>Display Position</Label>
                  {(() => {
                    // Get current position - check both custom categories and overrides
                    const customCat = customCategories.find(cat => cat.name === editingCardContent!.categoryName);
                    const override = categoryOverrides[editingCardContent!.categoryName];
                    // Prioritize custom category position, fallback to override
                    const currentPosition = customCat?.position ?? override?.position;

                    if (!isEditingPosition) {
                      // Display mode: show current position and "Change Position" button
                      return (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Position {currentPosition !== undefined ? currentPosition : "Not set"}</span>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsEditingPosition(true);
                              setPositionInputValue("");
                            }}
                            className="text-sm"
                          >
                            Change Position
                          </Button>
                        </div>
                      );
                    } else {
                      // Edit mode: show input with swap functionality
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Input
                              id="categoryPosition"
                              type="number"
                              min="1"
                              value={positionInputValue}
                              onChange={(e) => {
                                setPositionInputValue(e.target.value);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handlePositionChange(currentPosition);
                                } else if (e.key === "Escape") {
                                  setIsEditingPosition(false);
                                  setPositionInputValue("");
                                }
                              }}
                              placeholder="Enter new position"
                              className="text-sm flex-1"
                              autoFocus
                            />
                            <Button
                              type="button"
                              variant="default"
                              size="sm"
                              onClick={() => handlePositionChange(currentPosition)}
                              className="text-sm"
                            >
                              Apply
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setIsEditingPosition(false);
                                setPositionInputValue("");
                              }}
                              className="text-sm"
                            >
                              Cancel
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Enter a position number to swap with the category currently at that position.
                          </p>
                        </div>
                      );
                    }
                  })()}
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setEditingCardContent(null)}
                    className="text-sm"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="text-sm">
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>


        {/* Blocked Category Deletion Notice */}
        <AlertDialog open={blockedCategoryDelete !== null} onOpenChange={(open) => !open && setBlockedCategoryDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cannot delete category</AlertDialogTitle>
              <AlertDialogDescription>
                The category "{blockedCategoryDelete?.name}" is linked to {blockedCategoryDelete?.productCount ?? 0} product(s). Reassign those products to another category before deleting.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setBlockedCategoryDelete(null)}>Got it</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Product Confirmation Dialog */}
        <AlertDialog open={deleteProductId !== null} onOpenChange={(open) => !open && setDeleteProductId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this product? This action cannot be undone. The product will be removed from the catalogue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteProductId && handleDeleteProduct(deleteProductId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Category Card Content Confirmation Dialog */}
        <AlertDialog open={deleteCategoryCardName !== null} onOpenChange={(open) => !open && setDeleteCategoryCardName(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Category Card Content</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the custom content for "{deleteCategoryCardName}"? This will remove all custom labels, titles, descriptions, and images for this category card. The category itself will remain, but will use default display settings. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteCategoryCardName && handleDeleteCategoryCardContent(deleteCategoryCardName)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Custom Category Confirmation Dialog */}
        <AlertDialog open={deleteCustomCategoryName !== null} onOpenChange={(open) => !open && setDeleteCustomCategoryName(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Category</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete the category "{deleteCustomCategoryName}"? This will remove the category from the system. Products assigned to this category will need to be reassigned. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteCustomCategoryName && handleCategoryDelete(deleteCustomCategoryName)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </AdminLayout>
  );
};

type BrandManagementPanelProps = {
  products: AdminProduct[];
};

const BrandManagementPanel = ({ products }: BrandManagementPanelProps) => {
  const [brands, setBrands] = useState<Brand[]>(() => getAllBrands());
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState<Brand | null>(null);
  const [originalName, setOriginalName] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [deleteBrandData, setDeleteBrandData] = useState<Brand | null>(null);
  const [blockedDeleteBrand, setBlockedDeleteBrand] = useState<{ brand: Brand; productCount: number } | null>(null);

  const brandProductCounts = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((product) => {
      const key = product.brand?.trim();
      if (!key) return;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return counts;
  }, [products]);

  const allCategories = useMemo(() => {
    const defaults = [
      "Trophies & Awards",
      "Office Stationery",
      "Custom Rubber Stamps",
      "Printer Supplies",
      "Mobile Accessories",
      "Custom Printing",
      "Offset Printing",
      "Frame Studio",
      "Wedding Cards",
      "Customized Notebook",
      "Student ID",
      "Visiting Card",
      "Notice Printing",
    ];
    return defaults;
  }, []);

  const resetEditing = () => {
    setEditing(null);
    setOriginalName(null);
  };

  const filteredBrands = useMemo(() => {
    const query = searchTerm.toLowerCase();

    return brands.filter((brand) => {
      // Category filter
      if (categoryFilter !== "all") {
        const hasCategory = brand.associatedCategories.includes(categoryFilter);
        if (!hasCategory) return false;
      }

      // Text search
      if (!query) return true;

      const inName = brand.name.toLowerCase().includes(query);
      const inCategories = brand.associatedCategories.some((cat) =>
        cat.toLowerCase().includes(query),
      );
      return inName || inCategories;
    });
  }, [brands, searchTerm, categoryFilter]);

  const handleStatusToggle = (brand: Brand, status: BrandStatus) => {
    const updated = setBrandStatus(brand.name, status);
    setBrands(updated);
  };

  const handleDeleteBrandRequest = (brand: Brand) => {
    const productCount = brandProductCounts.get(brand.name) ?? 0;
    if (productCount > 0) {
      setBlockedDeleteBrand({ brand, productCount });
      return;
    }
    setDeleteBrandData(brand);
  };

  const handleDeleteBrand = (brand: Brand) => {
    const updated = deleteBrand(brand.name);
    setBrands(updated);
    if (editing && editing.name === brand.name) {
      resetEditing();
    }
    setDeleteBrandData(null);
  };

  const handleEditClick = (brand: Brand) => {
    setEditing({ ...brand });
    setOriginalName(brand.name);
  };

  const handleNewClick = () => {
    setEditing({
      name: "",
      associatedCategories: [],
      status: "active",
    });
    setOriginalName(null);
  };

  const handleCategoryToggleForEditing = (category: string) => {
    setEditing((prev) => {
      if (!prev) return prev;
      const exists = prev.associatedCategories.includes(category);
      return {
        ...prev,
        associatedCategories: exists
          ? prev.associatedCategories.filter((cat) => cat !== category)
          : [...prev.associatedCategories, category],
      };
    });
  };

  const handleSaveEditing = (event: React.FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    const name = editing.name.trim();
    if (!name) return;

    const updated = saveBrand(editing, originalName ?? undefined);
    setBrands(updated);
    resetEditing();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Brands</CardTitle>
          <p className="text-xs text-muted-foreground">
            Manage which brands appear in the storefront filter sidebar.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 w-full text-xs sm:w-44 sm:text-sm">
                <SelectValue placeholder="Filter by category" />
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
            <Input
              placeholder="Search brands…"
              className="h-9 w-full text-sm sm:w-64"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="gap-1.5 text-xs sm:text-sm bg-gradient-to-r from-[#00c6ff] to-[#00d97e] text-white hover:opacity-90 shadow-md hover:shadow-lg transition-colors"
            onClick={handleNewClick}
          >
            <Plus className="h-3.5 w-3.5" />
            Add Brand
          </Button>
        </div>
      </div>

      {/* Brand Form Dialog */}
      <Dialog open={editing !== null} onOpenChange={(open) => {
        if (!open) {
          resetEditing();
        }
      }}>
        <DialogContent className="w-full max-w-lg sm:max-w-2xl p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle>
              {originalName ? `Edit brand: ${originalName}` : "Add new brand"}
            </DialogTitle>
            <DialogDescription>
              {originalName
                ? "Update brand details and associated categories."
                : "Create a new brand and assign it to categories where it should appear in filters."}
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <form className="grid gap-3 md:grid-cols-12" onSubmit={handleSaveEditing}>
              <div className="space-y-1 md:col-span-4">
                <label className="text-xs font-medium text-muted-foreground">Brand name</label>
                <Input
                  value={editing.name}
                  onChange={(event) =>
                    setEditing((prev) =>
                      prev ? { ...prev, name: event.target.value } : prev,
                    )
                  }
                  className="h-9 text-sm"
                  placeholder="e.g. PVK, COLOP"
                  required
                />
              </div>
              <div className="space-y-1 md:col-span-5">
                <label className="text-xs font-medium text-muted-foreground">
                  Associated categories
                </label>
                <div className="flex flex-wrap gap-1.5 rounded-md border border-border/70 bg-muted/20 p-2">
                  {allCategories.map((category) => {
                    const isSelected =
                      editing.associatedCategories?.includes(category) ?? false;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => handleCategoryToggleForEditing(category)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-background text-muted-foreground hover:bg-muted",
                        )}
                      >
                        {category}
                      </button>
                    );
                  })}
                  {allCategories.length === 0 && (
                    <span className="text-[11px] text-muted-foreground">
                      No categories defined yet.
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground">
                  These categories control where this brand appears in the product filters.
                </p>
              </div>
              <div className="space-y-1 md:col-span-3">
                <label className="text-xs font-medium text-muted-foreground">Status</label>
                <div className="flex items-center gap-2 rounded-md border border-border/70 bg-muted/20 px-3 py-2">
                  <Switch
                    checked={editing.status === "active"}
                    onCheckedChange={(checked) =>
                      setEditing((prev) =>
                        prev
                          ? { ...prev, status: checked ? "active" : "hidden" }
                          : prev,
                      )
                    }
                  />
                  <span className="text-xs text-muted-foreground">
                    {editing.status === "active"
                      ? "Visible in filter sidebar"
                      : "Hidden from filter sidebar"}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex flex-col gap-2 md:col-span-12 md:flex-row md:justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={resetEditing}
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs sm:text-sm">
                  Save brand
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Card className="border-border bg-card text-card-foreground shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">All brands</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto rounded-md border border-border bg-card">
            <Table>
              <TableHeader className="bg-muted/60">
                <TableRow>
                  <TableHead className="text-xs text-muted-foreground">Brand</TableHead>
                  <TableHead className="text-xs text-muted-foreground">
                    Associated categories
                  </TableHead>
                  <TableHead className="text-xs text-muted-foreground">Status</TableHead>
                  <TableHead className="text-xs text-muted-foreground text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBrands.map((brand) => (
                  <TableRow key={brand.name}>
                    <TableCell className="text-sm font-medium">{brand.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {brand.associatedCategories.length > 0
                        ? brand.associatedCategories.join(", ")
                        : "No categories linked"}
                    </TableCell>
                    <TableCell className="text-xs">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={brand.status === "active"}
                          onCheckedChange={(checked) =>
                            handleStatusToggle(brand, checked ? "active" : "hidden")
                          }
                        />
                        <span className="text-xs text-muted-foreground">
                          {brand.status === "active" ? "Active" : "Hidden"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs">
                      <div className="flex items-center justify-end gap-1">
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-7 w-7 hover:bg-[#111827] hover:text-white transition-all duration-200 ease-in-out"
                              onClick={() => handleEditClick(brand)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>Edit brand</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
                              onClick={() => handleDeleteBrandRequest(brand)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>Delete brand</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredBrands.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-6 text-center text-xs text-muted-foreground"
                    >
                      No brands found. Use &quot;Add Brand&quot; to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialogs */}

      {/* Blocked Brand Deletion Notice */}
      <AlertDialog open={blockedDeleteBrand !== null} onOpenChange={(open) => !open && setBlockedDeleteBrand(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cannot delete brand</AlertDialogTitle>
            <AlertDialogDescription>
              The brand "{blockedDeleteBrand?.brand.name}" is linked to {blockedDeleteBrand?.productCount ?? 0} product(s). Update those products to another brand before deleting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setBlockedDeleteBrand(null)}>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Brand Confirmation */}
      <AlertDialog open={deleteBrandData !== null} onOpenChange={(open) => !open && setDeleteBrandData(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Brand</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the brand "{deleteBrandData?.name}"? It will be removed from the filter sidebar and brand selectors. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteBrandData && handleDeleteBrand(deleteBrandData)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminProducts;


