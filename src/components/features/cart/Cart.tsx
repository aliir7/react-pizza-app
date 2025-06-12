import useCartStore from "../../../store/useCartStore";
import useUserStore from "../../../store/useUserStore";
import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import CartItems from "./CartItems";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const username = useUserStore((state) => state.username);
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItems item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => clearCart()}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
