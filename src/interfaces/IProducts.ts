export interface IProduct {
  name: string,
  price: number;
  stock: number;
  category: string;

  sku: string;
  description: string;

  isAvailable: boolean;

  color?: string;
  size?: string; 
}
