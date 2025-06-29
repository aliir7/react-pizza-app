import { useForm } from "@tanstack/react-form";
import useCartStore from "../../../store/useCartStore";
import useUserStore from "../../../store/useUserStore";
import { orderSchema, type OrderInput } from "../../../validations/orderSchema";
import type { Order } from "../../../types";
import EmptyCart from "../cart/EmptyCart";
import { useFieldError } from "../../../hooks/useFieldError";

function CreateOrderForm() {
  const { username, address, position, status, fetchAddress } = useUserStore();
  const isLoadingAddress = status === "loading";
  const { getCart, getTotalCartPrice } = useCartStore();
  const cart = getCart();
  const totalPrice = getTotalCartPrice();

  const form = useForm<OrderInput>({
    defaultValues: {
      customer: username || "",
      phone: "",
      address: address || "",
      priority: false,
    },
    onSubmit: async ({ value }) => {
      const order: Order = {
        id: crypto.randomUUID(),
        customer: value.customer,
        phone: value.phone,
        address: value.address,
        cart,
        priority: value.priority ?? false,
        position: position ? `${position.latitude}, ${position.longitude}` : "",
      };
      onSubmit(order);
    },
    validate: async (values) => {
      const result = orderSchema.safeParse(values);
      if (result.success) return {};
      return result.error.flatten().fieldErrors;
    },
  });

  if (!cart.length) return <EmptyCart />;

  return (
    <form onSubmit={form.handleSubmit} className="space-y-6">
      {/* Customer Name */}
      <form.Field name="customer">
        {(field) => {
          const error = useFieldError(field);
          return (
            <div>
              <label>First Name</label>
              <input
                className="input w-full"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          );
        }}
      </form.Field>

      {/* Phone */}
      <form.Field name="phone">
        {(field) => {
          const error = useFieldError(field);
          return (
            <div>
              <label>Phone number</label>
              <input
                type="tel"
                className="input w-full"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          );
        }}
      </form.Field>

      {/* Address */}
      <form.Field name="address">
        {(field) => {
          const error = useFieldError(field);
          return (
            <div className="relative">
              <label>Address</label>
              <input
                className="input w-full"
                disabled={isLoadingAddress}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <span className="absolute right-[3px] top-[3px] md:right-[5px] md:top-[5px]">
                <Button type="small" onClick={() => fetchAddress()}>
                  Get position
                </Button>
              </span>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          );
        }}
      </form.Field>

      {/* Priority */}
      <form.Field name="priority">
        {(field) => (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            <label>Give order priority (20% extra)?</label>
          </div>
        )}
      </form.Field>

      <Button type="primary" disabled={isPending || isLoadingAddress}>
        {isPending ? "Placing order..." : `Order now from ${totalPrice}`}
      </Button>
    </form>
  );
}

export default CreateOrderForm;
