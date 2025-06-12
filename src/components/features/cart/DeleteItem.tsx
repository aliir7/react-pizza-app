import useCartStore from "../../../store/useCartStore";
import Button from "../../ui/Button";

type DeleteItemProps = {
  pizzaId: number;
};

function DeleteItem({ pizzaId }: DeleteItemProps) {
  const { deleteItem } = useCartStore();
  return (
    <Button type="small" onClick={() => deleteItem(pizzaId)}>
      Delete
    </Button>
  );
}

export default DeleteItem;
