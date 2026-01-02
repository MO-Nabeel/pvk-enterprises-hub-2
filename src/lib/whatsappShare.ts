import type { OrderPayload } from "./orderSubmission";

/**
 * Generates a WhatsApp share link with formatted order details
 * @param order The order payload to share
 * @returns WhatsApp URL with pre-filled message
 */
export function generateOrderWhatsAppLink(order: OrderPayload): string {
    const message = formatOrderForWhatsApp(order);
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp URL scheme - works on both mobile and desktop
    return `https://wa.me/?text=${encodedMessage}`;
}

/**
 * Formats order details into a WhatsApp-friendly message
 */
function formatOrderForWhatsApp(order: OrderPayload): string {
    const lines: string[] = [];

    // Header
    lines.push("✅ *Order Confirmed!*");
    lines.push("");
    lines.push(`📋 Order ID: *${order.id}*`);
    lines.push(`📅 Date: ${new Date(order.submittedAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })}`);
    lines.push("");

    // Items
    lines.push("📦 *Items:*");
    order.cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        lines.push(`• ${item.name} (${item.quantity} pcs) - ₹${itemTotal.toLocaleString("en-IN")}`);
    });
    lines.push("");

    // Order Summary
    lines.push("💰 *Order Summary:*");
    lines.push(`Subtotal: ₹${order.totals.subtotal.toLocaleString("en-IN")}`);
    lines.push(`Tax: ₹${order.totals.taxes.toLocaleString("en-IN")}`);
    lines.push(`*Total: ₹${order.totals.total.toLocaleString("en-IN")}*`);
    lines.push("");

    // Delivery Address
    if (order.customer.address) {
        lines.push("📍 *Delivery Address:*");
        lines.push(order.customer.address);
        if (order.customer.landmark) {
            lines.push(`Landmark: ${order.customer.landmark}`);
        }
        if (order.customer.pincode) {
            lines.push(`Pincode: ${order.customer.pincode}`);
        }
        lines.push("");
    }

    // Payment Method
    lines.push(`💳 *Payment:* ${order.fulfillmentMethod}`);
    lines.push("");

    // Footer
    lines.push("Thank you for your order! 🙏");
    lines.push("*PVK Enterprises*");

    return lines.join("\n");
}

/**
 * Opens WhatsApp with the order details
 * @param order The order to share
 */
export function shareOrderOnWhatsApp(order: OrderPayload): void {
    const whatsappUrl = generateOrderWhatsAppLink(order);
    window.open(whatsappUrl, "_blank");
}
