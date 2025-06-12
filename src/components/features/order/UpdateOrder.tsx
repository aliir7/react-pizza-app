import Button from "../../ui/Button";
import { updateOrder } from "../../../services/apiRestaurant";
import { useFetcher } from "react-router";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }: { params: { orderId: string } }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
