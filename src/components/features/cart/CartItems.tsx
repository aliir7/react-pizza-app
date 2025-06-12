import useCartStore from "../../../store/useCartStore";
import type { CartItem } from "../../../types";
import { formatCurrency } from "../../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

type CartItemsProps = {
  item: CartItem;
};

function CartItems({ item }: CartItemsProps) {
  const { quantity, name, pizzaId, totalPrice } = item;
  const { getCurrentQuantityById } = useCartStore();
  const currentQuantity = getCurrentQuantityById(pizzaId);

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-center gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItems;
