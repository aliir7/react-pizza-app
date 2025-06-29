import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../services/apiRestaurant";
import useCartStore from "../store/useCartStore";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  const { mutate: createNewOrder, isPending: isCreating } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      clearCart();
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      navigate({ to: `/order/${data.id}` });
      toast.success("New order created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return {
    createNewOrder,
    isCreating,
  };
}
