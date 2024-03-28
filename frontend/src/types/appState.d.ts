import { CartItem, Order, Product, Review, ShippingInfo, User } from "./models";

export interface ProductState {
  loading: boolean;
  products: Product[];
  error: string | null;
  productsCount: number;
  product: Product | null;
  resultPerPage: number;
  filterdProductsCount: number;
}

export interface UserState {
  loading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  error: string;
}

export interface ProfileState {
  loading: boolean;
  error: string;
  isUpdated: boolean;
  isDeleted: boolean;
}

export interface ForgetPasswordState {
  loading: boolean;
  message: string;
  error: string;
  success: boolean;
}

export interface CartState {
  cartItems: CartItem[];
  shippingInfo: ShippingInfo;
}

export interface NewOrderState {
  loading: boolean;
  error: string;
  order: Order | null;
}

export interface MyOrdersState {
  loading: boolean;
  error: string;
  orders: Order[];
}
export interface OrderDetails {
  loading: boolean;
  error: string;
  order: Order | null;
}
export interface UserDetails {
  loading: boolean;
  error: string;
  user: User | null;
}

export interface ReviewState {
  loading: boolean;
  error: string;
  success: boolean;
}

export interface NewProductState {
  loading: boolean;
  error: string;
  success: boolean;
  product: Product | null;
}

export interface UpdateDeleteProductState {
  loading: boolean;
  error: string;
  isUpdated: boolean;
  isDeleted: boolean;
}
export interface UpdateDeleteOrderState {
  loading: boolean;
  error: string;
  isUpdated: boolean;
  isDeleted: boolean;
}

export interface allOrderState {
  loading: boolean;
  error: string;
  orders: Order[];
}
export interface allUserState {
  loading: boolean;
  error: string;
  users: User[];
}

export interface productsReviewState {
  loading: boolean;
  error: string;
  reviews: Review[];
}

export interface deleteReviewState {
  loading: boolean;
  error: string;
  isDeleted: boolean;
}
