export interface IProduct {
  name: string,
  price: number;
  stock: number;
  category: string;

  sku?: string; //sku is generated right before it is uploaded
  description?: string; //some items may not need a description

  isAvailable: boolean;

  color?: string;
  size?: string; 
}
