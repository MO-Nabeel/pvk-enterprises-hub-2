import { allProducts, type Product } from "@/data/productData";
import { CartItem } from "@/lib/cart";

export type OrderStatus = "New" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type MockOrder = {
  id: string;
  customerName: string;
  createdAt: string; // ISO date
  total: number;

  status: OrderStatus;
  designUrl?: string;
  details?: {
    email: string;
    phone: string;
    address: string;
    items: CartItem[];
    paymentMethod: string;
    additionalInfo?: Record<string, string>;
  };
};

export type MockCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  lastOrderDate: string;
};

export type MockLead = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: "Contact" | "Special";
  createdAt: string;
  notes?: string;
};

export type MockCategory = {
  id: string;
  name: string;
  productCount: number;
};

// Simple mock orders for the dashboard.
export const mockOrders: MockOrder[] = [
  {
    id: "PVK-2025-001",
    customerName: "Anjali Sharma",
    createdAt: "2025-12-01T10:15:00Z",
    total: 3250,
    status: "New",
    designUrl: "https://placehold.co/600x400/png?text=Visiting+Card+Design",
  },
  {
    id: "PVK-2025-002",
    customerName: "Rahul Menon",
    createdAt: "2025-11-29T15:40:00Z",
    total: 1875,
    status: "Processing",
  },
  {
    id: "PVK-2025-003",
    customerName: "St. Thomas College",
    createdAt: "2025-11-27T09:05:00Z",
    total: 12890,
    status: "Shipped",
  },
  {
    id: "PVK-2025-004",
    customerName: "Greenfield School",
    createdAt: "2025-11-25T12:25:00Z",
    total: 6420,
    status: "Delivered",
  },
];

export const mockCustomers: MockCustomer[] = [
  {
    id: "CUST-001",
    name: "Anjali Sharma",
    email: "anjali.sharma@example.com",
    phone: "+91-98765-11111",
    city: "Kozhikode",
    totalOrders: 3,
    lastOrderDate: "2025-12-01",
  },
  {
    id: "CUST-002",
    name: "Rahul Menon",
    email: "rahul.menon@example.com",
    phone: "+91-98765-22222",
    city: "Kochi",
    totalOrders: 2,
    lastOrderDate: "2025-11-29",
  },
  {
    id: "CUST-003",
    name: "St. Thomas College",
    email: "purchase@stthomas.edu",
    phone: "+91-495-555555",
    city: "Kozhikode",
    totalOrders: 5,
    lastOrderDate: "2025-11-27",
  },
];

export const mockLeads: MockLead[] = [
  {
    id: "LEAD-001",
    name: "Vijay Kumar",
    email: "vijay.k@example.com",
    phone: "+91-98765-33333",
    source: "Contact",
    createdAt: "2025-11-30T08:30:00Z",
    notes: "Enquiry for custom trophy set.",
  },
  {
    id: "LEAD-002",
    name: "Sneha Varma",
    email: "sneha.varma@example.com",
    phone: "+91-98765-44444",
    source: "Special",
    createdAt: "2025-11-28T14:15:00Z",
    notes: "Special service popup - bulk ID cards.",
  },
];

// Category mock data matching the storefront category chips.
const categoryNames = [
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

export const mockCategories: MockCategory[] = categoryNames.map((name, index) => {
  const productCount = allProducts.filter((p) => p.category === name).length;
  return {
    id: `CAT-${index + 1}`,
    name,
    productCount,
  };
});

export function getMonthlySalesTotal(orders: MockOrder[]): number {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  return orders
    .filter((order) => {
      const created = new Date(order.createdAt);
      return created.getFullYear() === year && created.getMonth() === month;
    })
    .reduce((sum, order) => sum + order.total, 0);
}

export function getNewOrdersCount(orders: MockOrder[], days: number = 7): number {
  const now = Date.now();
  const msWindow = days * 24 * 60 * 60 * 1000;

  return orders.filter((order) => now - new Date(order.createdAt).getTime() <= msWindow).length;
}

export function getNewLeadsCount(leads: MockLead[], days: number = 7): number {
  const now = Date.now();
  const msWindow = days * 24 * 60 * 60 * 1000;

  return leads.filter((lead) => now - new Date(lead.createdAt).getTime() <= msWindow).length;
}


