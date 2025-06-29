export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  oldPrice?: number;
  discount?: string;
}
