import { create } from "zustand";
import type { CartItem } from "../types";

type cartState = {
  cart: CartItem[];
  addItem: (newItem: CartItem) => void;
  deleteItem: (id: string) => void;
  increaseItemQuantity: (id: string) => void;
  decreaseItemQuantity: (id: string) => void;
  clearCart: () => void;
};

const useCartStore = create<cartState>((set) => ({
  cart: [],
  addItem: (newItem) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.pizzaId === newItem.pizzaId
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice =
          existingItem.unitPrice * existingItem.quantity;
      } else {
        return { cart: [...state.cart, newItem] };
      }
      return { cart: [...state.cart] };
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
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
