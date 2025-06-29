import z from "zod/v4";

export const orderSchema = z.object({
  customer: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .regex(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Please provide a valid phone number"
    ),
  address: z.string().min(1, "Address is required"),
  priority: z.boolean().optional(),
});

export type OrderInput = z.infer<typeof orderSchema>;
