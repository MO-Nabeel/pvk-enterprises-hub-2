import type { CartItem } from "@/lib/cart";
import type { DesignUpload } from "@/lib/designUpload";

export type FulfillmentMethod = "Cash on Delivery" | "Get a Quote" | "Online Payment";

export interface CustomerDetails {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  pincode: string;
  landmark?: string;
  city?: string;
  state?: string;
  gst?: string;
  companyName?: string;
  [key: string]: string | undefined; // Allow other optional fields but enforce the core ones
}

export type OrderPayload = {
  id: string;
  submittedAt: string;
  fulfillmentMethod: FulfillmentMethod;
  totals: {
    subtotal: number;
    taxes: number;
    total: number;
  };
  cart: CartItem[];
  customer: CustomerDetails;
  designUpload?: DesignUpload | null;
  meta: {
    type: "order" | "quote";
    source: "web-checkout";
  };
};

const postJson = async (url: string, body: unknown) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    return response.ok;
  } finally {
    clearTimeout(timeout);
  }
};

export const buildOrderPayload = ({
  id,
  fulfillmentMethod,
  cart,
  totals,
  customer,
  designUpload
}: {
  id: string;
  fulfillmentMethod: FulfillmentMethod;
  cart: CartItem[];
  totals: { subtotal: number; taxes: number; total: number };
  customer: CustomerDetails;
  designUpload?: DesignUpload | null;
}): OrderPayload => {
  const metaType: OrderPayload["meta"]["type"] =
    fulfillmentMethod === "Get a Quote" ? "quote" : "order";

  return {
    id,
    submittedAt: new Date().toISOString(),
    fulfillmentMethod,
    totals,
    cart,
    customer, // customer is now CustomerDetails
    designUpload: designUpload || undefined,
    meta: {
      type: metaType,
      source: "web-checkout"
    }
  };
};

export const sendOrderCommunications = async (payload: OrderPayload) => {
  const whatsappWebhook = import.meta.env.VITE_WHATSAPP_WEBHOOK;
  const emailWebhook = import.meta.env.VITE_EMAIL_WEBHOOK;
  const adminWebhook = import.meta.env.VITE_ADMIN_WEBHOOK;

  const tasks: Promise<unknown>[] = [];

  if (whatsappWebhook) {
    tasks.push(
      postJson(whatsappWebhook, {
        channel: "whatsapp",
        summary: {
          id: payload.id,
          customerName: payload.customer.name ?? payload.customer.companyName ?? "",
          phone: payload.customer.phone ?? "",
          total: payload.totals.total,
          fulfillmentMethod: payload.fulfillmentMethod
        },
        payload
      })
    );
  }

  if (emailWebhook) {
    tasks.push(
      postJson(emailWebhook, {
        channel: "email",
        payload
      })
    );
  }

  if (adminWebhook) {
    tasks.push(
      postJson(adminWebhook, {
        channel: "admin-record",
        payload
      })
    );
  }

  if (!tasks.length) {
    console.warn("No communication webhooks configured; set VITE_*_WEBHOOK env vars to enable.");
    return;
  }

  await Promise.allSettled(tasks);
};

