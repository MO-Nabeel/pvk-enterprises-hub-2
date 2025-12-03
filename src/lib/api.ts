/**
 * API Utility Functions
 * Handles all backend API communication
 */

const API_BASE_URL = import.meta.env.DEV
  ? "/api" // Use proxy in development
  : "http://localhost/pvk-2/back-end/api"; // Direct URL in production

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Make API request
 */
async function request<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
      throw new ApiError(
        data.message || "Request failed",
        response.status,
        data.errors
      );
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      500
    );
  }
}

/**
 * GET request
 */
export async function get<T = any>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: "GET" });
}

/**
 * POST request
 */
export async function post<T = any>(
  endpoint: string,
  body?: any
): Promise<T> {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/**
 * PUT request
 */
export async function put<T = any>(endpoint: string, body?: any): Promise<T> {
  return request<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request
 */
export async function del<T = any>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: "DELETE" });
}

/**
 * Products API
 */
export const productsApi = {
  getAll: () => get<{ products: any[]; count: number }>("/products.php"),
  getById: (id: number) =>
    get<{ product: any }>(`/products.php?id=${id}`),
  create: (product: {
    name: string;
    price: number;
    description?: string;
    image?: string;
  }) => post<{ id: number }>("/products.php", product),
  update: (id: number, product: Partial<{
    name: string;
    price: number;
    description: string;
    image: string;
  }>) => put(`/products.php?id=${id}`, product),
  delete: (id: number) => del(`/products.php?id=${id}`),
};

/**
 * Contact API
 */
export const contactApi = {
  submit: (data: {
    fullName: string;
    email: string;
    mobile: string;
    message: string;
  }) =>
    post<{ id?: number; message: string }>("/contact.php", data),
};

/**
 * API Info
 */
export const apiInfo = {
  get: () => get("/index.php"),
};

export default {
  get,
  post,
  put,
  delete: del,
  products: productsApi,
  contact: contactApi,
  info: apiInfo,
};

