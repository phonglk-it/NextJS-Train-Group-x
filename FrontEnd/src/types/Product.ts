export interface Product {
  name: string;
  price: number;
  rating: number;
  image: string;
  oldPrice?: number;
  discount?: string;
}