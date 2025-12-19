const CART_COUNT_KEY = "pvk-cart-count";
const CART_ITEMS_KEY = "pvk-cart-items";
export const CART_COUNT_EVENT = "pvk-cart-count-change";
const DEFAULT_TAX_RATE = 0.18;

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  tax?: number;
};

export type CartEventDetail = {
  count: number;
  items: CartItem[];
};

const isBrowser = () => typeof window !== "undefined";

const readItemsFromStorage = (): CartItem[] => {
  if (!isBrowser()) {
    return [];
  }

  const storedValue = window.sessionStorage.getItem(CART_ITEMS_KEY);
  if (!storedValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(storedValue) as CartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        ...item,
        quantity: Math.max(0, Math.floor(item.quantity ?? 0))
      }))
      .filter((item) => item.quantity > 0);
  } catch {
    return [];
  }
};

const writeItemsToStorage = (items: CartItem[]) => {
  if (!isBrowser()) {
    return;
  }

  const sanitizedItems = items.filter((item) => item.quantity > 0);
  const count = sanitizedItems.reduce((total, item) => total + item.quantity, 0);

  window.sessionStorage.setItem(CART_ITEMS_KEY, JSON.stringify(sanitizedItems));
  window.sessionStorage.setItem(CART_COUNT_KEY, count.toString());

  const eventDetail: CartEventDetail = { count, items: sanitizedItems };
  window.dispatchEvent(new CustomEvent(CART_COUNT_EVENT, { detail: eventDetail }));
};

export const getCartItems = (): CartItem[] => readItemsFromStorage();

export const isProductInCart = (productId: string): boolean =>
  readItemsFromStorage().some((item) => item.id === productId);

export const getCartCount = (): number =>
  readItemsFromStorage().reduce((total, item) => total + item.quantity, 0);

export const getCartTotals = () => {
  const items = readItemsFromStorage();

  let subtotal = 0;
  let taxes = 0;

  items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    // Calculate tax for this item
    // If item.tax is provided (e.g. 12 for 12%), use it. Otherwise default to 18%.
    const taxRate = item.tax !== undefined ? item.tax / 100 : DEFAULT_TAX_RATE;
    taxes += itemTotal * taxRate;
  });

  taxes = Number(taxes.toFixed(2));
  const total = subtotal + taxes;

  return { subtotal, taxes, total };
};

type CartProductInput = Omit<CartItem, "quantity">;

export const addItemToCart = (product: CartProductInput, quantity = 1) => {
  const items = readItemsFromStorage();
  const normalizedQuantity = Math.max(1, Math.floor(quantity));
  const existingIndex = items.findIndex((item) => item.id === product.id);

  if (existingIndex > -1) {
    items[existingIndex].quantity += normalizedQuantity;
    // Update tax/details in case they changed
    if (product.tax !== undefined) {
      items[existingIndex].tax = product.tax;
    }
    items[existingIndex].price = product.price; // Update price too if it changed
  } else {
    items.push({
      ...product,
      quantity: normalizedQuantity
    });
  }

  writeItemsToStorage(items);
  return items;
};

export const updateCartItemQuantity = (id: string, quantity: number) => {
  const items = readItemsFromStorage();
  const sanitizedQuantity = Math.max(0, Math.floor(quantity));

  const nextItems =
    sanitizedQuantity === 0
      ? items.filter((item) => item.id !== id)
      : items.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity: sanitizedQuantity
          }
          : item
      );

  writeItemsToStorage(nextItems);
  return nextItems;
};

export const removeCartItem = (id: string) => updateCartItemQuantity(id, 0);

export const clearCart = () => {
  writeItemsToStorage([]);
};

