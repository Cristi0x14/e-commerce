import { Product } from "./product.model";

export interface FilteredProducts {
    products: Product[];
    totalCount: number;
  }