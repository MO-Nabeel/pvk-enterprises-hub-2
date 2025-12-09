// Category Card Content Store
// Manages editable content for homepage category cards

const CATEGORY_CARD_CONTENT_KEY = "pvk-admin-category-card-content";

export interface CategoryCardContent {
  categoryName: string; // Original category name (e.g., "Trophies & Awards")
  topLabel?: string; // Small top label (e.g., "AWARDS", "TECHNOLOGY")
  cardTitle?: string; // Main large title (e.g., "Trophies & Awards", "Signature Awards Collection")
  cardDescription?: string; // Short descriptive text
  badgeValue?: string; // Badge number/label (e.g., "01", "02")
  categoryImageURL?: string; // URL for background image (preferred)
  backgroundImage?: string; // URL for background image
  backgroundColor?: string; // Hex color code for background
}

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
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent("categoryCardContentUpdated"));
  } catch {
    // ignore storage errors
  }
}

/**
 * Get all category card content
 */
export function getAllCategoryCardContent(): Record<string, CategoryCardContent> {
  const content = safeReadJSON<Record<string, CategoryCardContent>>(
    CATEGORY_CARD_CONTENT_KEY,
    {}
  );
  return content;
}

/**
 * Get content for a specific category
 */
export function getCategoryCardContent(categoryName: string): CategoryCardContent | null {
  const allContent = getAllCategoryCardContent();
  const content = allContent[categoryName] || null;
  
  // Backwards compatibility: prefer categoryImageURL, fall back to legacy backgroundImage
  if (content && !content.categoryImageURL && content.backgroundImage) {
    return { ...content, categoryImageURL: content.backgroundImage };
  }
  
  // Debug: Log retrieval
  if (typeof window !== "undefined") {
    console.log("[categoryCardStore] Getting content for:", categoryName);
    console.log("[categoryCardStore] All content keys:", Object.keys(allContent));
    console.log("[categoryCardStore] Retrieved content:", content);
    if (content) {
      console.log("[categoryCardStore] Card Description:", content.cardDescription);
    }
  }
  
  return content;
}

/**
 * Save or update category card content
 */
export function saveCategoryCardContent(content: CategoryCardContent): void {
  const allContent = getAllCategoryCardContent();
  allContent[content.categoryName] = content;
  safeWriteJSON(CATEGORY_CARD_CONTENT_KEY, allContent);
}

/**
 * Delete category card content
 */
export function deleteCategoryCardContent(categoryName: string): void {
  const allContent = getAllCategoryCardContent();
  delete allContent[categoryName];
  safeWriteJSON(CATEGORY_CARD_CONTENT_KEY, allContent);
}
