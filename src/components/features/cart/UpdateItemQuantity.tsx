import useCartStore from "../../../store/useCartStore";
import Button from "../../ui/Button";

type UpdateItemQuantityProps = {
  pizzaId: number;
  currentQuantity: number;
};

function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: UpdateItemQuantityProps) {
  // get functions from Cart Store
  const { increaseItemQuantity, decreaseItemQuantity } = useCartStore();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => decreaseItemQuantity(pizzaId)}>
        -
      </Button>
      <span className="inline-block text-sm font-medium">
        {currentQuantity}
      </span>
      <Button type="round" onClick={() => increaseItemQuantity(pizzaId)}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
