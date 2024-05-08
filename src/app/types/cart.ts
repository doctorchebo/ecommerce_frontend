export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  discount_price?: number | undefined;
  imageUrl: string;
}
