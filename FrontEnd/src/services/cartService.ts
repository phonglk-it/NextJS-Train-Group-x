import { axiosAuth } from '../utils/axiosClient';
import { useAuth } from '@/contexts/AuthContext';

export interface CartItem {
  id: number;
  user: number;
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
  created_at: string;
}

// FIX: Update endpoint to match backend
const CART_API = '/carts/';

export const cartService = {
  async getCart(): Promise<CartItem[]> {
    const res = await axiosAuth.get(CART_API);
    return res.data as CartItem[];
  },

  async addToCart(product: number, quantity: number): Promise<CartItem> {
    const res = await axiosAuth.post(CART_API, { product, quantity });
    return res.data as CartItem;
  },

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    const res = await axiosAuth.patch(`${CART_API}${id}/`, { quantity });
    return res.data as CartItem;
  },

  async removeCartItem(id: number): Promise<void> {
    await axiosAuth.delete(`${CART_API}${id}/`);
  },
}; 