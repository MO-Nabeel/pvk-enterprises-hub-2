import { allProducts, type Product } from "@/data/productData";

// LocalStorage keys
const EXTRA_PRODUCTS_KEY = "pvk-admin-extra-products";
const HIDDEN_PRODUCTS_KEY = "pvk-admin-hidden-products";
const DELETED_PRODUCTS_KEY = "pvk-admin-deleted-products";
const CATEGORY_BRANDS_KEY = "pvk-admin-category-brands";
const CUSTOM_CATEGORIES_KEY = "pvk-admin-custom-categories";
const CATEGORY_OVERRIDES_KEY = "pvk-admin-category-overrides";

function safeReadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}

function safeWriteJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors
  }
}

// --- Extra products (created from admin) ---
// Migration helper to convert old imageURL to imageGallery
function migrateProduct(product: any): Product {
  // If product has imageURL but no imageGallery, migrate it
  if (product.imageURL && !product.imageGallery) {
    const migrated = {
      ...product,
      imageGallery: [product.imageURL],
    };
    // Remove imageURL from migrated product
    delete migrated.imageURL;
    return migrated;
  }
  // If product has neither, ensure it has an empty array
  if (!product.imageGallery) {
    return {
      ...product,
      imageGallery: [],
    };
  }
  // Ensure imageGallery is an array
  if (!Array.isArray(product.imageGallery)) {
    return {
      ...product,
      imageGallery: [],
    };
  }
  return product as Product;
}

function readExtraProducts(): Product[] {
  const products = safeReadJSON<any[]>(EXTRA_PRODUCTS_KEY, []);
  return Array.isArray(products) ? products.map(migrateProduct) : [];
}

export function getExtraProducts(): Product[] {
  return readExtraProducts();
}

export function saveExtraProducts(products: Product[]): void {
  const safe = Array.isArray(products) ? products : [];
  safeWriteJSON(EXTRA_PRODUCTS_KEY, safe);
}

// --- Visibility helpers (hide / delete) ---

export function getHiddenProductIds(): string[] {
  const ids = safeReadJSON<string[]>(HIDDEN_PRODUCTS_KEY, []);
  return Array.isArray(ids) ? ids : [];
}

export function setHiddenProductIds(ids: string[]): void {
  const uniqueIds = Array.from(new Set(ids));
  safeWriteJSON(HIDDEN_PRODUCTS_KEY, uniqueIds);
}

export function getDeletedProductIds(): string[] {
  const ids = safeReadJSON<string[]>(DELETED_PRODUCTS_KEY, []);
  return Array.isArray(ids) ? ids : [];
}

export function setDeletedProductIds(ids: string[]): void {
  const uniqueIds = Array.from(new Set(ids));
  safeWriteJSON(DELETED_PRODUCTS_KEY, uniqueIds);
}

export function setProductVisibility(id: string, status: "active" | "hidden"): void {
  const currentHidden = new Set(getHiddenProductIds());

  if (status === "hidden") {
    currentHidden.add(id);
  } else {
    currentHidden.delete(id);
  }

  setHiddenProductIds(Array.from(currentHidden));
}

export function markProductDeleted(id: string): void {
  const deleted = new Set(getDeletedProductIds());
  deleted.add(id);
  setDeletedProductIds(Array.from(deleted));

  // If a product is deleted, ensure it is also removed from the hidden list
  const hidden = new Set(getHiddenProductIds());
  hidden.delete(id);
  setHiddenProductIds(Array.from(hidden));
}

// --- Custom categories (created in admin UI) ---

export function getCustomCategories(): string[] {
  const cats = safeReadJSON<string[]>(CUSTOM_CATEGORIES_KEY, []);
  return Array.isArray(cats) ? cats : [];
}

// --- Default category overrides (rename / hide) ---

export type CategoryOverride = {
  name?: string;
  hidden?: boolean;
};

export type CategoryOverrideMap = Record<string, CategoryOverride>;

export function getCategoryOverrideMap(): CategoryOverrideMap {
  const map = safeReadJSON<CategoryOverrideMap>(CATEGORY_OVERRIDES_KEY, {});
  return map && typeof map === "object" ? map : {};
}

function setCategoryOverrideMap(map: CategoryOverrideMap): void {
  safeWriteJSON(CATEGORY_OVERRIDES_KEY, map);
}

export function updateCategoryOverride(baseName: string, patch: CategoryOverride): void {
  const key = baseName.trim();
  if (!key) return;

  const current = getCategoryOverrideMap();
  const existing = current[key] ?? {};
  const next: CategoryOverride = { ...existing, ...patch };

  // Clean up empty override objects
  if (!next.name && !next.hidden) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete current[key];
    setCategoryOverrideMap(current);
    return;
  }

  current[key] = next;
  setCategoryOverrideMap(current);
}

export function clearCategoryOverride(baseName: string): void {
  const key = baseName.trim();
  if (!key) return;

  const current = getCategoryOverrideMap();
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete current[key];
  setCategoryOverrideMap(current);
}

// --- Category brand registrations (used by storefront filters) ---

export type CategoryBrandMap = Record<string, string[]>;

export function getCategoryBrandMap(): CategoryBrandMap {
  const map = safeReadJSON<CategoryBrandMap>(CATEGORY_BRANDS_KEY, {});
  return map && typeof map === "object" ? map : {};
}

export function registerBrandForCategory(category: string, brand?: string | null): void {
  const trimmedCategory = category?.trim();
  const trimmedBrand = brand?.trim();

  if (!trimmedCategory || !trimmedBrand) return;

  const map = getCategoryBrandMap();
  const existing = map[trimmedCategory] ?? [];

  if (existing.includes(trimmedBrand)) {
    return;
  }

  const next = [...existing, trimmedBrand];
  const nextMap: CategoryBrandMap = {
    ...map,
    [trimmedCategory]: next,
  };

  safeWriteJSON(CATEGORY_BRANDS_KEY, nextMap);
}

// Combined catalogue used on the storefront (Category & ProductDetail pages)
export function getAllProductsWithExtras(): Product[] {
  const extras = readExtraProducts();

  const hiddenIds = new Set(getHiddenProductIds());
  const deletedIds = new Set(getDeletedProductIds());

  // If there are no extras and no visibility overrides, return the base list directly
  if (!extras.length && hiddenIds.size === 0 && deletedIds.size === 0) {
    return allProducts;
  }

  const map = new Map<string, Product>();
  allProducts.forEach((p) => map.set(p.id, p));
  extras.forEach((p) => map.set(p.id, p));

  // Filter out hidden & deleted products so they never appear on the storefront
  return Array.from(map.values()).filter((product) => {
    if (deletedIds.has(product.id)) return false;
    if (hiddenIds.has(product.id)) return false;
    return true;
  });
}

