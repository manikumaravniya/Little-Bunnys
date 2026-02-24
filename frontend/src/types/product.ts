export type Product = {
  id: string;
  code: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
};

export type ProductInput = {
  title: string;
  description: string;
  price: number;
  image?: File | null;
  imageUrl?: string;
};
