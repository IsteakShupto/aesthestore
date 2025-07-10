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
      <div className="lg:w-[875px] 2xl:w-[1300px] lg:flex lg:flex-wrap gap-10 mx-auto py-10">
        {products.map((product: ProductSkeleton, productIndex) => {
          return (
            <Card
              key={productIndex}
              className="w-[400px] mx-auto my-2 2xl:my-0 p-5 flex flex-col justify-between gap-5"
            >
              <div className="flex justify-end">
                <h3 className="border-2 rounded-2xl inline-block py-1.5 pl-1">
                  {product.name.charAt(0).toUpperCase() +
                    product.name.replaceAll("_", " ").slice(1)}{" "}
                  <span className="bg-blue-600 text-white border-2 rounded-2xl p-1.5">
                    ${product.prices[0].unit_amount / 100} USD
                  </span>
                </h3>
              </div>
              <div className="flex gap-3">
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
                <p>{product.description}</p>
              </div>
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
                className="bg-black text-white hover:bg-neutral-700"
              >
                Add to cart
              </Button>
            </Card>
          );
        })}
      </div>
    </>
  );
}
