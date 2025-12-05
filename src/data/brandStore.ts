import { allProducts } from "@/data/productData";

const BRAND_STORE_KEY = "pvk-admin-brands";
const BRAND_DELETED_KEY = "pvk-admin-deleted-brands";

export type BrandStatus = "active" | "hidden";

export type Brand = {
  name: string;
  associatedCategories: string[];
  status: BrandStatus;
};

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

function getDeletedBrandNames(): string[] {
  const names = safeReadJSON<string[]>(BRAND_DELETED_KEY, []);
  return Array.isArray(names) ? names : [];
}

function setDeletedBrandNames(names: string[]): void {
  const unique = Array.from(new Set(names.filter((name) => name && name.trim())));
  safeWriteJSON(BRAND_DELETED_KEY, unique);
}

/**
 * Derive an initial brand catalogue (with category associations) from the static product data.
 */
function getInitialBrandsFromProducts(): Brand[] {
  const map = new Map<string, Set<string>>();

  for (const product of allProducts) {
    if (!product.brand) continue;
    const brandName = product.brand;
    const categoryName = product.category;

    if (!map.has(brandName)) {
      map.set(brandName, new Set());
    }
    if (categoryName) {
      map.get(brandName)?.add(categoryName);
    }
  }

  const brands: Brand[] = [];
  map.forEach((categories, name) => {
    brands.push({
      name,
      associatedCategories: Array.from(categories).sort((a, b) => a.localeCompare(b)),
      status: "active",
    });
  });

  return brands.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Read stored brands from localStorage, supporting legacy string[] shape and the new Brand[] shape.
 */
function getStoredBrands(): Brand[] {
  const raw = safeReadJSON<unknown>(BRAND_STORE_KEY, []);

  if (!Array.isArray(raw)) return [];

  const normalised: Brand[] = [];

  for (const item of raw) {
    if (typeof item === "string") {
      // Legacy format: just the brand name, no category associations or status yet.
      normalised.push({
        name: item,
        associatedCategories: [],
        status: "active",
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    if (item && typeof item === "object" && "name" in item) {
      const name = String((item as any).name).trim();
      if (!name) continue;

      const rawCategories = (item as any).associatedCategories;
      const rawStatus = (item as any).status;
      const set = new Set<string>();

      if (Array.isArray(rawCategories)) {
        for (const cat of rawCategories) {
          if (typeof cat === "string" && cat.trim()) {
            set.add(cat.trim());
          }
        }
      }

      const status: BrandStatus = rawStatus === "hidden" ? "hidden" : "active";

      normalised.push({
        name,
        associatedCategories: Array.from(set).sort((a, b) => a.localeCompare(b)),
        status,
      });
    }
  }

  return normalised;
}

/**
 * Combined brand catalogue, merging static product-derived brands with persisted admin-created brands.
 * Category associations are unioned per brand name. Status is taken from stored data when present,
 * otherwise defaults to "active". Deleted brands are excluded.
 */
export function getAllBrands(): Brand[] {
  const base = getInitialBrandsFromProducts();
  const stored = getStoredBrands();
  const deleted = new Set(getDeletedBrandNames());

  const map = new Map<
    string,
    {
      categories: Set<string>;
      status: BrandStatus;
    }
  >();

  const upsertBase = (brand: Brand) => {
    const key = brand.name;
    if (!map.has(key)) {
      map.set(key, {
        categories: new Set<string>(),
        status: "active",
      });
    }
    const bucket = map.get(key)!;
    for (const cat of brand.associatedCategories) {
      if (cat.trim()) bucket.categories.add(cat.trim());
    }
  };

  const upsertStored = (brand: Brand) => {
    const key = brand.name;
    if (!map.has(key)) {
      map.set(key, {
        categories: new Set<string>(),
        status: brand.status ?? "active",
      });
    }
    const bucket = map.get(key)!;
    bucket.status = brand.status ?? "active";
    for (const cat of brand.associatedCategories) {
      if (cat.trim()) bucket.categories.add(cat.trim());
    }
  };

  base.forEach(upsertBase);
  stored.forEach(upsertStored);

  const result: Brand[] = [];
  map.forEach((value, name) => {
    if (deleted.has(name)) return;
    result.push({
      name,
      associatedCategories: Array.from(value.categories).sort((a, b) => a.localeCompare(b)),
      status: value.status,
    });
  });

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Persist or update a brand with its associated categories.
 * Returns the full merged brand catalogue.
 */
export function addBrand(name: string, associatedCategories: string[]): Brand[] {
  const trimmedName = name.trim();
  if (!trimmedName) return getAllBrands();

  const cleanedCategories = Array.from(
    new Set(
      associatedCategories
        .map((cat) => cat.trim())
        .filter((cat) => Boolean(cat)),
    ),
  );

  const existing = getStoredBrands();
  const index = existing.findIndex((brand) => brand.name === trimmedName);

  if (index === -1) {
    existing.push({
      name: trimmedName,
      associatedCategories: cleanedCategories,
      status: "active",
    });
  } else {
    const current = existing[index];
    const mergedCategories = Array.from(
      new Set([...(current.associatedCategories ?? []), ...cleanedCategories]),
    );
    existing[index] = {
      ...current,
      associatedCategories: mergedCategories,
      status: current.status ?? "active",
    };
  }

  safeWriteJSON(BRAND_STORE_KEY, existing);

  return getAllBrands();
}

/**
 * Helper to get brands that are associated with a specific category name.
 */
export function getBrandsForCategory(category: string): Brand[] {
  const trimmedCategory = category.trim();
  if (!trimmedCategory) return getAllBrands();

  const all = getAllBrands();
  return all.filter((brand) => brand.associatedCategories.includes(trimmedCategory));
}

export function setBrandStatus(name: string, status: BrandStatus): Brand[] {
  const trimmedName = name.trim();
  if (!trimmedName) return getAllBrands();

  const existing = getStoredBrands();
  const index = existing.findIndex((brand) => brand.name === trimmedName);

  if (index === -1) {
    const effective = getAllBrands().find((brand) => brand.name === trimmedName);
    existing.push(
      effective
        ? { ...effective, status }
        : {
            name: trimmedName,
            associatedCategories: [],
            status,
          },
    );
  } else {
    existing[index] = {
      ...existing[index],
      status,
    };
  }

  safeWriteJSON(BRAND_STORE_KEY, existing);
  return getAllBrands();
}

export function saveBrand(brand: Brand, originalName?: string): Brand[] {
  const trimmedName = brand.name.trim();
  if (!trimmedName) return getAllBrands();

  const cleanedCategories = Array.from(
    new Set(
      (brand.associatedCategories ?? [])
        .map((cat) => cat.trim())
        .filter((cat) => Boolean(cat)),
    ),
  );

  const targetName = originalName?.trim() && originalName.trim() !== trimmedName ? originalName.trim() : trimmedName;

  const existing = getStoredBrands();
  let index = existing.findIndex((b) => b.name === targetName);

  const next: Brand = {
    name: trimmedName,
    associatedCategories: cleanedCategories,
    status: brand.status ?? "active",
  };

  if (index === -1) {
    existing.push(next);
  } else {
    existing[index] = next;
  }

  safeWriteJSON(BRAND_STORE_KEY, existing);
  return getAllBrands();
}

export function deleteBrand(name: string): Brand[] {
  const trimmedName = name.trim();
  if (!trimmedName) return getAllBrands();

  const stored = getStoredBrands().filter((brand) => brand.name !== trimmedName);
  safeWriteJSON(BRAND_STORE_KEY, stored);

  const deleted = new Set(getDeletedBrandNames());
  deleted.add(trimmedName);
  setDeletedBrandNames(Array.from(deleted));

  return getAllBrands();
}


