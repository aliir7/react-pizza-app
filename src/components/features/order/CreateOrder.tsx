import { Form, redirect, useActionData, useNavigation } from "react-router";
import React, { useState } from "react";
import useUserStore from "../../../store/useUserStore";
import useCartStore from "../../../store/useCartStore";
import EmptyCart from "../cart/EmptyCart";
import Button from "../../ui/Button";
import { createOrder } from "../../../services/apiRestaurant";
import type { Order } from "../../../types";

// regex for phone validations
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState<boolean | string>(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    fetchAddress,
    error: addressError,
  } = useUserStore();
  const isLoadingAddress = addressStatus === "loading";
  const { getTotalCartPrice, getCart } = useCartStore();
  const cart = getCart();
  const totalCartPrice = getTotalCartPrice();
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // use data from action function
  const formErrors = useActionData();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            className="input grow"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" className="input w-full" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              className="input w-full"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {isLoadingAddress && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
          <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button type="small" onClick={() => fetchAddress}>
              Get position
            </Button>
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={String(withPriority)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setWithPriority(e.target.checked)
            }
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting ? "Placing order..." : `Order now from ${totalPrice}`}
          </Button>
          <input
            type="hidden"
            name="position"
            value={
              position!.latitude && position!.longitude
                ? `${position!.latitude}, ${position!.longitude}`
                : ""
            }
          />
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries()) as {
    [key: string]: string;
  };
  const { clearCart } = useCartStore.getState();

  const order: Order = {
    id: crypto.randomUUID(),
    customer: data.customer,
    address: data.address,
    phone: data.phone,
    position: data.position,
    cart: JSON.parse(data.cart),
    priority: true,
  };
  console.log("Order data:", order);

  const errors: { [key: string]: string } = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number, We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // Do Not Overuse
  clearCart();

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
