export type Position = {
  latitude: number;
  longitude: number;
};

export type CartItem = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type MenuItem = {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
};

export type Order = {
  id: number | string;
  customer: string;
  address: string;
  cart?: CartItem[];
  position?: Position | string;
  phone: string;
  priority: boolean;

  status?: "pending" | "in-progress" | "delivered" | "cancelled";
  estimatedDelivery?: Date;
  createdAt?: Date;
};
