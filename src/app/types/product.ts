export interface Image {
  product: number;
  name?: string | null;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  long_description?: string | undefined;
  points_value?: number | undefined;
  sales_value?: number | undefined;
  price: number;
  discount?: number | undefined;
  discount_price?: number | undefined;
  images: Image[];
}
