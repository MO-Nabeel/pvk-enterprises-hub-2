import { allProducts } from "@/data/productData";

const BRAND_STORE_KEY = "pvk-admin-brands";

export type Brand = {
  name: string;
  associatedCategories: string[];
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
      // Legacy format: just the brand name, no category associations yet.
      normalised.push({
        name: item,
        associatedCategories: [],
      });
      // eslint-disable-next-line no-continue
      continue;
    }

    if (item && typeof item === "object" && "name" in item) {
      const name = String((item as any).name).trim();
      if (!name) continue;

      const rawCategories = (item as any).associatedCategories;
      const set = new Set<string>();

      if (Array.isArray(rawCategories)) {
        for (const cat of rawCategories) {
          if (typeof cat === "string" && cat.trim()) {
            set.add(cat.trim());
          }
        }
      }

      normalised.push({
        name,
        associatedCategories: Array.from(set).sort((a, b) => a.localeCompare(b)),
      });
    }
  }

  return normalised;
}

/**
 * Combined brand catalogue, merging static product-derived brands with persisted admin-created brands.
 * Category associations are unioned per brand name.
 */
export function getAllBrands(): Brand[] {
  const base = getInitialBrandsFromProducts();
  const stored = getStoredBrands();

  const map = new Map<string, Set<string>>();

  const upsert = (brand: Brand) => {
    const key = brand.name;
    if (!map.has(key)) {
      map.set(key, new Set());
    }
    const bucket = map.get(key)!;
    for (const cat of brand.associatedCategories) {
      if (cat.trim()) bucket.add(cat.trim());
    }
  };

  base.forEach(upsert);
  stored.forEach(upsert);

  const result: Brand[] = [];
  map.forEach((categories, name) => {
    result.push({
      name,
      associatedCategories: Array.from(categories).sort((a, b) => a.localeCompare(b)),
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
    });
  } else {
    const current = existing[index];
    const mergedCategories = Array.from(
      new Set([...(current.associatedCategories ?? []), ...cleanedCategories]),
    );
    existing[index] = {
      ...current,
      associatedCategories: mergedCategories,
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

