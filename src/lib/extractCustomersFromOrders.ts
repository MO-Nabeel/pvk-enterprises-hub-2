import { MockOrder, MockCustomer } from "@/data/adminMockData";

/**
 * Extracts unique customers from orders with statistics
 * Deduplicates by email and calculates total orders and last order date
 */
export function extractCustomersFromOrders(orders: MockOrder[]): MockCustomer[] {
    // Map to deduplicate customers by email
    const customerMap = new Map<string, MockCustomer>();

    orders.forEach((order) => {
        // Only process orders with customer details
        if (!order.details?.email) return;

        const email = order.details.email.toLowerCase();
        const existing = customerMap.get(email);

        // Extract city from address (last line or fallback)
        let city = "Unknown";
        if (order.details.address) {
            const addressLines = order.details.address.split('\n').map(line => line.trim()).filter(Boolean);
            if (addressLines.length > 0) {
                // Try to get city from last line (usually format: "City, State PIN")
                const lastLine = addressLines[addressLines.length - 1];
                const cityMatch = lastLine.match(/^([^,]+)/);
                if (cityMatch) {
                    city = cityMatch[1].trim();
                }
            }
        }

        if (existing) {
            // Update existing customer
            existing.totalOrders += 1;
            // Update last order date if this order is more recent
            if (new Date(order.createdAt) > new Date(existing.lastOrderDate)) {
                existing.lastOrderDate = order.createdAt;
            }
        } else {
            // Create new customer entry
            customerMap.set(email, {
                id: `customer-${email}`,
                name: order.customerName,
                email: order.details.email,
                phone: order.details.phone || "N/A",
                city: city,
                totalOrders: 1,
                lastOrderDate: order.createdAt,
            });
        }
    });

    // Convert map to array and sort by last order date (newest first)
    return Array.from(customerMap.values()).sort(
        (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
    );
}
