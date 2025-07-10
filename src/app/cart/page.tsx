"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useGetProducts from "@/hooks/getProducts";
import Image from "next/image";

import { ProductSkeleton } from "@/app/notebooks/page";
import LoadingComponent from "@/components/app/LoadingComponent";
import { ProductsContext } from "@/components/context/ProductsContext";

import { useContext } from "react";
import NavbarComponent from "@/components/app/NavbarComponent";
import FooterComponent from "@/components/app/FooterComponent";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { cart, setCart } = useContext(ProductsContext);
  const { data, isLoading, isError } = useGetProducts();
  const router = useRouter();

  const countQuatity = cart.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);

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

  const products = (data || []).map((product: ProductSkeleton) => {
    const productWithQuantity = cart.find(
      (cartItem) => cartItem.price === product.default_price
    );

    return {
      ...product,
      quantity: productWithQuantity ? productWithQuantity.quantity : 0,
    };
  });

  console.log(products);

  return (
    <>
      <NavbarComponent />
      {countQuatity === 0 && (
        <p className="text-center mt-10 font-bold">
          There are currently no items in the cart!
        </p>
      )}
      <div className="2xl:w-[1300px] flex flex-wrap gap-3 mx-auto py-10">
        {products &&
          products.map((product: ProductSkeleton, productIndex) => {
            return (
              <Card
                key={productIndex}
                className={`2xl:w-[1200px] mx-3 p-5 gap-5 ${
                  product.quantity === 0 && "hidden"
                }`}
              >
                <div className="flex items-center gap-10">
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
                  <div className="flex flex-col gap-5">
                    <h3 className="text-4xl">
                      {product.name.charAt(0).toUpperCase() +
                        product.name.replaceAll("_", " ").slice(1)}
                    </h3>
                    <p>{product.description}</p>
                    <div className="space-x-1.5">
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
                      >
                        <i className="fas fa-plus"></i>
                      </Button>
                      <Button className="cursor-not-allowed w-fit">
                        $
                        {(
                          (product.prices[0].unit_amount / 100) *
                          product.quantity
                        ).toFixed(2)}{" "}
                        USD ({product.quantity})
                      </Button>
                      <Button
                        onClick={() => {
                          setCart((prevState) => {
                            const newCart = [...prevState];
                            for (let i = 0; i < newCart.length; i++) {
                              if (newCart[i].price === product.default_price) {
                                if (newCart[i].quantity > 0)
                                  newCart[i].quantity = newCart[i].quantity - 1;
                                break;
                              }
                            }
                            return newCart;
                          });
                        }}
                      >
                        <i className="fas fa-minus"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        {countQuatity > 0 && (
          <div
            onClick={() => {
              async function checkoutProducts() {
                try {
                  const getProductsURL = "/api/checkout";
                  const response = await axios.post(
                    getProductsURL,
                    {
                      lineItems: cart.filter((item) => item.quantity > 0),
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  if (response) {
                    router.push(response.data.session.url);
                  }
                } catch (error) {
                  if (error instanceof Error) {
                    throw new Error(error.message);
                  }

                  throw new Error("An unknown error has occured.");
                }
              }

              checkoutProducts();
            }}
            className="flex justify-end w-full mr-20 mt-5"
          >
            <Button className="text-3xl" variant={"link"}>
              Checkout &rarr;
            </Button>
          </div>
        )}
      </div>
      <FooterComponent />
    </>
  );
}
