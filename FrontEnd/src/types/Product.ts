export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  oldPrice?: number;
  discount?: string;
}