export type Category = 'Ice Cream' | 'Candy' | 'Pastry';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  icon: string; // Lucide icon name
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  timestamp: string;
  items: OrderItem[];
  total: number;
}
