import { Link } from "@tanstack/react-router";
import useCartStore from "../../../store/useCartStore";
import { formatCurrency } from "../../../utils/helpers";

function CartOverview() {
  // get functions from Cart Store
  const { getTotalCartPrice, getTotalCartQuantity } = useCartStore();
  const totalCartPrice = getTotalCartPrice();
  const totalCartQuantity = getTotalCartQuantity();
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
