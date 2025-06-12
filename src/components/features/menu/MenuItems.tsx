import useCartStore from "../../../store/useCartStore";
import type { CartItem, MenuItem } from "../../../types";
import { formatCurrency } from "../../../utils/helpers";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

type MenuItemsProps = {
  pizza: MenuItem;
};

function MenuItems({ pizza }: MenuItemsProps) {
  const { id, imageUrl, name, soldOut, ingredients, unitPrice } = pizza;
  const { addItem, getCurrentQuantityById } = useCartStore();
  const currentQuantity = getCurrentQuantityById(id);
  const isInCart = currentQuantity > 0;

  // create function for handle add to cart
  const handleAddToCart = () => {
    // add new item object
    const newItem: CartItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    addItem(newItem);
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItems;
