export interface Product {
  name: string;
  images: { url: string }[];
  price: number;
  _id: string;
  rating: number;
  numOfReviews: number;
  stock: number;
  description: string;
  reviews: Review[];
  category: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  user: string;
  _id: string;
}

interface Image {
  public_id: string;
  url: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: Image;
  role: string;
  createdAt: string;
  _id: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number | null;
  phoneNo: number | null;
}

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  product: string;
}

interface PaymentInfo {
  id: string;
  status: string;
}

export interface Order {
  shippingInfo: ShippingInfo;
  orderItems: OrderItem[];
  paymentInfo: PaymentInfo;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  _id?: string;
  orderStatus?: string;
  user?: {
    name: string;
  };
}
