export type CartItem = {
  code: string;
  name: string;
  image: string;
  quantity: number;
};

const CART_KEY = "lb_cart";

const readCart = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const writeCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("lb-cart-change"));
};

export const getCartItems = () => readCart();

export const getCartCount = () =>
  readCart().reduce((total, item) => total + (item.quantity || 0), 0);

export const addToCart = (item: Omit<CartItem, "quantity">) => {
  const items = readCart();
  const existing = items.find((entry) => entry.code === item.code);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...item, quantity: 1 });
  }
  writeCart(items);
};

export const updateCartQuantity = (code: string, quantity: number) => {
  const items = readCart().map((item) =>
    item.code === code ? { ...item, quantity } : item
  );
  writeCart(items.filter((item) => item.quantity > 0));
};

export const removeFromCart = (code: string) => {
  const items = readCart().filter((item) => item.code !== code);
  writeCart(items);
};

export const clearCart = () => {
  writeCart([]);
};
