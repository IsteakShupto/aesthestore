"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetProducts from "@/hooks/getProducts";
import Image from "next/image";

import { ProductSkeleton } from "@/app/notebooks/page";
import LoadingComponent from "./LoadingComponent";

import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function ProductsComponent() {
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

  const products = (data || []).filter((product: ProductSkeleton) => {
    return (
      product.name.toLowerCase().includes("_sticker") ||
      product.name.toLowerCase().includes("notebook")
    );
  });

  return (
    <>
      <div className="w-[1300px] flex flex-wrap gap-3 mx-auto py-10">
        {products.map((product: ProductSkeleton, productIndex) => {
          return (
            <Card
              key={productIndex}
              className="w-[400px] p-5 flex flex-col justify-between gap-5"
            >
              <div>
                {product.name.toLowerCase().includes("_sticker") && (
                  <Image
                    src={"/stickers/" + product.name + ".jpg"}
                    alt=""
                    height={375}
                    width={375}
                  />
                )}
                {product.name.toLowerCase().includes("notebook") && (
                  <Image
                    src={"/notebooks/" + product.name + ".jpg"}
                    alt=""
                    height={375}
                    width={375}
                  />
                )}
              </div>
              <h3>
                {product.name.charAt(0).toUpperCase() +
                  product.name.replaceAll("_", " ").slice(1)}
              </h3>
              <p>{product.description}</p>
              <Button
                onClick={() => {
                  setCart((prevState) => {
                    const newCart = [...prevState];

                    let flag = false;

                    for (let i = 0; i < newCart.length; i++) {
                      if (newCart[i].price === product.default_price) {
                        newCart[i].quantity = newCart[i].quantity + 1;
                        flag = true;
                        break;
                      }
                    }

                    if (flag === false) {
                      newCart.push({
                        price: product.default_price,
                        quantity: 1,
                      });
                    }

                    return newCart;
                  });
                }}
                className="bg-black text-white"
              >
                ${product.prices[0].unit_amount / 100} USD
              </Button>
            </Card>
          );
        })}
      </div>
    </>
  );
}
