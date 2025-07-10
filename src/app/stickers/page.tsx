"use client";

import FooterComponent from "@/components/app/FooterComponent";
import NavbarComponent from "@/components/app/NavbarComponent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetProducts from "@/hooks/getProducts";
import Image from "next/image";

import { ProductSkeleton } from "../notebooks/page";
import LoadingComponent from "@/components/app/LoadingComponent";
import { ProductsContext } from "@/components/context/ProductsContext";
import { useContext } from "react";

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

  const stickers = (data || []).filter((product: ProductSkeleton) => {
    return product.name.toLowerCase().includes("_sticker");
  });

  console.log(stickers);

  return (
    <>
      <NavbarComponent />
      <div className="lg:w-[875px] 2xl:w-[1300px] lg:flex lg:flex-wrap gap-10 mx-auto py-10">
        {stickers.map((sticker: ProductSkeleton, notebookIndex) => {
          return (
            <Card
              key={notebookIndex}
              className="w-[400px] mx-auto my-2 2xl:my-0 p-5 flex flex-col justify-between gap-5"
            >
              <div className="flex justify-end">
                <h3 className="border-2 rounded-2xl inline-block py-1.5 pl-1">
                  {sticker.name.charAt(0).toUpperCase() +
                    sticker.name.replaceAll("_", " ").slice(1)}{" "}
                  <span className="bg-blue-600 text-white border-2 rounded-2xl p-1.5">
                    ${sticker.prices[0].unit_amount / 100} USD
                  </span>
                </h3>
              </div>
              <div className="flex gap-3">
                <div>
                  <Image
                    src={"/stickers/" + sticker.name + ".jpg"}
                    alt=""
                    height={375}
                    width={375}
                  />
                </div>
                <p>{sticker.description}</p>
              </div>
              <Button
                onClick={() => {
                  setCart((prevState) => {
                    const newCart = [...prevState];

                    let flag = false;

                    for (let i = 0; i < newCart.length; i++) {
                      if (newCart[i].price === sticker.default_price) {
                        newCart[i].quantity = newCart[i].quantity + 1;
                        flag = true;
                        break;
                      }
                    }

                    if (flag === false) {
                      newCart.push({
                        price: sticker.default_price,
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
      <FooterComponent />
    </>
  );
}
