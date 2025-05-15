"use client";

import { ReactNode, createContext, useState } from "react";

type CartItemType = {
  price: string;
  quantity: number;
};

type ProductsContextType = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
};

export const ProductsContext = createContext<ProductsContextType>({
  cart: [],
  setCart: () => {},
});

type ProductsProviderProps = {
  children: ReactNode;
};

export default function ProductsProvider({ children }: ProductsProviderProps) {
  const [cart, setCart] = useState<CartItemType[]>([]);

  return (
    <ProductsContext.Provider value={{ cart, setCart }}>
      {children}
    </ProductsContext.Provider>
  );
}
