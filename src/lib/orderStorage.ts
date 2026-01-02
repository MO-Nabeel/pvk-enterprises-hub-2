import { OrderPayload } from "./orderSubmission";

const STORAGE_KEY = "pvk_orders_local_db";

export const getLocalOrders = (): OrderPayload[] => {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) {
        console.error("Failed to load local orders", err);
        return [];
    }
};

export const saveLocalOrder = (order: OrderPayload): void => {
    if (typeof window === "undefined") return;
    try {
        const orders = getLocalOrders();
        // Add new order to the beginning of the list
        orders.unshift(order);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (err) {
        console.error("Failed to save local order", err);
    }
};

export const clearLocalOrders = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
};
