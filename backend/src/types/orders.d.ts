import mongoose from "mongoose";

interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  phoneNo: number;
}
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  product: mongoose.Schema.Types.ObjectId;
}

interface PaymentInfo {
  id: string;
  status: string;
}

export interface Order {
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  user: mongoose.Schema.Types.ObjectId;
  paymentInfo: PaymentInfo;
  paidAt: Date;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  deliveredAt: Date;
}
