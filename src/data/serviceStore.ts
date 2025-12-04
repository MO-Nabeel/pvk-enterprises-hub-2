import panCardImage from "@/assets/pan-card.png";
import jioFiberImage from "@/assets/jio-fiber.png";
import phonePeImage from "@/assets/phonepe-box.png";

// LocalStorage key for services
const SERVICES_STORAGE_KEY = "pvk-special-services-store";

export type ServiceStatus = "Active" | "Draft" | "Paused";

export type SpecialService = {
  id: string;
  title: string;
  description: string;
  imageURL: string;
  status: ServiceStatus;
  monthlyLeads?: number; // Optional: for admin tracking
};

// Initial default services (excluding 'Custom Corporate Printing' and 'Awards / Trophy Projects')
const defaultServices: SpecialService[] = [
  {
    id: "service-1",
    title: "PAN / Aadhaar Updates",
    description: "UTI PAN card, Aadhaar updates, and related ID services for walk‑in and online customers.",
    imageURL: panCardImage,
    status: "Active",
    monthlyLeads: 32,
  },
  {
    id: "service-2",
    title: "JIO FIBER CONNECTION",
    description: "Fast & Reliable Broadband Network",
    imageURL: jioFiberImage,
    status: "Active",
    monthlyLeads: 9,
  },
  {
    id: "service-3",
    title: "PHONEPE PAYMENT BOX",
    description: "Secure & Instant Digital Payments",
    imageURL: phonePeImage,
    status: "Active",
    monthlyLeads: 15,
  },
];

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
    window.dispatchEvent(new Event("servicesUpdated"));
  } catch {
    // ignore storage errors
  }
}

/**
 * Initialize services in localStorage if not already present
 */
function initializeServices(): void {
  if (typeof window === "undefined") return;
  const existing = window.localStorage.getItem(SERVICES_STORAGE_KEY);
  if (!existing) {
    safeWriteJSON(SERVICES_STORAGE_KEY, defaultServices);
  }
}

/**
 * Get all services from localStorage
 */
export function getAllServices(): SpecialService[] {
  initializeServices();
  const services = safeReadJSON<SpecialService[]>(SERVICES_STORAGE_KEY, defaultServices);
  return Array.isArray(services) ? services : defaultServices;
}

/**
 * Get only Active services (for frontend display)
 */
export function getActiveServices(): SpecialService[] {
  return getAllServices().filter((service) => service.status === "Active");
}

/**
 * Save all services to localStorage
 */
export function saveAllServices(services: SpecialService[]): void {
  const safe = Array.isArray(services) ? services : [];
  safeWriteJSON(SERVICES_STORAGE_KEY, safe);
}

/**
 * Get a service by ID
 */
export function getServiceById(id: string): SpecialService | undefined {
  return getAllServices().find((service) => service.id === id);
}

/**
 * Add a new service
 */
export function addService(service: Omit<SpecialService, "id">): SpecialService {
  const services = getAllServices();
  const newId = `service-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newService: SpecialService = {
    ...service,
    id: newId,
  };
  services.push(newService);
  saveAllServices(services);
  return newService;
}

/**
 * Update an existing service
 */
export function updateService(id: string, updates: Partial<Omit<SpecialService, "id">>): SpecialService | null {
  const services = getAllServices();
  const index = services.findIndex((service) => service.id === id);
  if (index === -1) return null;
  
  services[index] = { ...services[index], ...updates };
  saveAllServices(services);
  return services[index];
}

/**
 * Delete a service
 */
export function deleteService(id: string): boolean {
  const services = getAllServices();
  const filtered = services.filter((service) => service.id !== id);
  if (filtered.length === services.length) return false; // Service not found
  
  saveAllServices(filtered);
  return true;
}

/**
 * Update service status
 */
export function updateServiceStatus(id: string, status: ServiceStatus): SpecialService | null {
  return updateService(id, { status });
}

