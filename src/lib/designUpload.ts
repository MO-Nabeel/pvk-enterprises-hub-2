import type { CartItem } from "@/lib/cart";
import { cartHasVisitingCard } from "@/lib/cartRules";
import { getCartItems } from "@/lib/cart";

export type DesignUpload = {
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
};

const DESIGN_UPLOAD_KEY = "pvk-design-upload";
const ACCEPTED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg", ".ai", ".cdr"];

const toDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

export const persistDesignUpload = async (file: File): Promise<DesignUpload> => {
  const dataUrl = await toDataUrl(file);
  const payload: DesignUpload = {
    name: file.name,
    size: file.size,
    type: file.type || "application/octet-stream",
    url: dataUrl,
    uploadedAt: new Date().toISOString()
  };

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(DESIGN_UPLOAD_KEY, JSON.stringify(payload));
  }

  return payload;
};

export const getStoredDesignUpload = (): DesignUpload | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(DESIGN_UPLOAD_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DesignUpload;
  } catch {
    return null;
  }
};

export const clearStoredDesignUpload = () => {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(DESIGN_UPLOAD_KEY);
};

export const formatFileSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exponent);
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[exponent]}`;
};

export const isDesignUploadRequired = (items?: CartItem[]): boolean => {
  const cartItems = items ?? getCartItems();
  return cartHasVisitingCard(cartItems);
};

export const isAcceptedDesignFile = (file: File): boolean => {
  const name = file.name.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((ext) => name.endsWith(ext));
};

