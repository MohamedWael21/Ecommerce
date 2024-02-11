import { Product } from "./models";

export interface ProductState {
  loading: boolean;
  products: Product[];
  error: string | null;
  productsCount: number;
}
