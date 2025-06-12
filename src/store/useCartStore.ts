import { create } from "zustand";
import type { CartItem } from "../types";

type cartState = {
  cart: CartItem[];
  addItem: (newItem: CartItem) => void;
  deleteItem: (id: number) => void;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  getCart: () => CartItem[];
  getTotalCartQuantity: () => number;
  getCurrentQuantityById: (id: number) => number;
  getTotalCartPrice: () => number;
  clearCart: () => void;
};

const useCartStore = create<cartState>((set, get) => ({
  cart: [],
  addItem: (newItem) =>
    set((state) => {
      const exists = state.cart.some(
        (item) => item.pizzaId === newItem.pizzaId
      );
      if (exists) {
        return {
          cart: state.cart.map((item) =>
            item.pizzaId === newItem.pizzaId
              ? {
                  ...item,
                  quantity: item.quantity + newItem.quantity,
                  totalPrice:
                    (item.quantity + newItem.quantity) * item.unitPrice,
                }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, newItem] };
      }
    }),

  deleteItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.pizzaId !== id),
    })),
  increaseItemQuantity: (id) =>
    set((state) => {
      const item = state.cart.find((item) => item.pizzaId === id);

      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
      return { cart: [...state.cart] };
    }),
  decreaseItemQuantity: (id) =>
    set((state) => {
      const item = state.cart.find((item) => item.pizzaId === id);

      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }

      if (item?.quantity === 0) {
        return {
          cart: state.cart.filter((cartItem) => cartItem.pizzaId !== id),
        };
      }
      return { cart: [...state.cart] };
    }),
  getCart: () => {
    return get().cart;
  },
  getTotalCartQuantity: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },
  getTotalCartPrice: () => {
    return get().cart.reduce((sum, item) => sum + item.totalPrice, 0);
  },
  getCurrentQuantityById: (id) => {
    const item = get().cart.find((item) => item.pizzaId === id);
    return item ? item.quantity : 0;
  },
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
