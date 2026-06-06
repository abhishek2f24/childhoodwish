export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  orderId: string; // E.g., CW-1024
  razorpayOrderId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    productId: string;
    name: string;
    quantity: number;
    price: number;
    giftWrapping: boolean;
  }>;
  totalAmount: number;
  status: OrderStatus;
  trackingLink?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}
