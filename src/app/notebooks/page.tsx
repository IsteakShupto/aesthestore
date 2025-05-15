"use client";

import FooterComponent from "@/components/app/FooterComponent";
import LoadingComponent from "@/components/app/LoadingComponent";
import NavbarComponent from "@/components/app/NavbarComponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetProducts from "@/hooks/getProducts";
import Image from "next/image";
import { ProductsContext } from "@/components/context/ProductsContext";
import { useContext } from "react";

export type ProductSkeleton = {
  id: string;
  name: string;
  default_price: string;
  description: string;
  prices: {
    currency: string;
    id: string;
    recurring: null;
    unit_amount: number;
  }[];
  quantity: number;
};

export default function Notebooks() {
  const { setCart } = useContext(ProductsContext);
  const { data, isLoading, isError } = useGetProducts();

  if (isError) {
    return <>Error</>;
  }

  if (isLoading) {
    return (
      <>
        <LoadingComponent />
      </>
    );
  }

  const notebooks = (data || []).filter((product: ProductSkeleton) => {
    return product.name.toLowerCase().includes("notebook");
  });

  console.log(notebooks);

  return (
    <>
      <NavbarComponent />
      <div className="w-[1300px] flex flex-wrap gap-3 mx-auto py-10">
        {notebooks.map((notebook: ProductSkeleton, notebookIndex) => {
          return (
            <Card
              key={notebookIndex}
              className="w-[400px] p-5 flex flex-col justify-between gap-5"
            >
              <div>
                <Image
                  src={"/notebooks/" + notebook.name + ".jpg"}
                  alt=""
                  height={375}
                  width={375}
                />
              </div>
              <h3>
                {notebook.name.charAt(0).toUpperCase() +
                  notebook.name.replaceAll("_", " ").slice(1)}
              </h3>
              <p>{notebook.description}</p>
              <Button
                onClick={() => {
                  setCart((prevState) => {
                    const newCart = [...prevState];

                    let flag = false;

                    for (let i = 0; i < newCart.length; i++) {
                      if (newCart[i].price === notebook.default_price) {
                        newCart[i].quantity = newCart[i].quantity + 1;
                        flag = true;
                        break;
                      }
                    }

                    if (flag === false) {
                      newCart.push({
                        price: notebook.default_price,
                        quantity: 1,
                      });
                    }

                    return newCart;
                  });
                }}
                className="bg-black text-white"
              >
                ${notebook.prices[0].unit_amount / 100} USD
              </Button>
            </Card>
          );
        })}
      </div>
      <FooterComponent />
    </>
  );
}
