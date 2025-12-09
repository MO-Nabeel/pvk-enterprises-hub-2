import { getAllProductsWithExtras } from "@/data/productStore";
import type { CartItem } from "./cart";

const VISITING_CARD_KEYWORDS = ["visiting card", "visiting cards", "visiting-card"];

const normalize = (value?: string) =>
  (value ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const buildProductLookup = () => {
  try {
    const products = getAllProductsWithExtras?.() ?? [];
    const map = new Map<string, { category?: string; slug?: string; name?: string }>();
    products.forEach((product) => {
      map.set(product.id, {
        category: product.category,
        slug: (product as any).slug,
        name: product.name
      });
    });
    return map;
  } catch {
    return new Map<string, { category?: string; slug?: string; name?: string }>();
  }
};

export const cartHasVisitingCard = (items: CartItem[]): boolean => {
  if (!items?.length) {
    return false;
  }

  const productMap = buildProductLookup();

  return items.some((item) => {
    const product = productMap.get(item.id);
    const candidates = [product?.category, product?.slug, product?.name, item.name];

    return candidates.some((value) => {
      const normalized = normalize(value);
      return normalized.length > 0 && VISITING_CARD_KEYWORDS.some((keyword) => normalized.includes(keyword));
    });
  });
};

export const VISITING_CARD_CATEGORY_LABEL = "Visiting Card";

