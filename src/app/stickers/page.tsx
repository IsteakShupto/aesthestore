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
      <div className="w-[1300px] flex flex-wrap gap-3 mx-auto py-10">
        {stickers.map((sticker: ProductSkeleton, notebookIndex) => {
          return (
            <Card
              key={notebookIndex}
              className="w-[400px] p-5 flex flex-col justify-between gap-5"
            >
              <div>
                <Image
                  src={"/stickers/" + sticker.name + ".jpg"}
                  alt=""
                  height={375}
                  width={375}
                />
              </div>
              <h3>
                {sticker.name.charAt(0).toUpperCase() +
                  sticker.name.replaceAll("_", " ").slice(1)}
              </h3>
              <p>{sticker.description}</p>
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
                className="bg-black text-white"
              >
                ${sticker.prices[0].unit_amount / 100} USD
              </Button>
            </Card>
          );
        })}
      </div>
      <FooterComponent />
    </>
  );
}
