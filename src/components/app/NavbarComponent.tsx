"use client";

import Link from "next/link";
import { Button } from "../ui/button";

import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

export default function NavbarComponent() {
  const { cart } = useContext(ProductsContext);

  const countQuatity = cart.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);

  console.log(countQuatity);

  return (
    <>
      <header className="flex items-center justify-between px-10 py-5 sticky w-full top-0 bg-black z-10">
        <div className="flex items-center gap-3">
          <Link href={"/"} className="font-semibold">
            Aesthestore
          </Link>
          <div className="flex items-center gap-3">
            <Link href={"/notebooks"}>Notebooks</Link>
            <Link href={"/stickers"}>Stickers</Link>
          </div>
        </div>
        <div>
          <Link href={"/cart"}>
            <Button variant={"outline"}>
              <i className="fa-solid fa-cart-shopping"></i>{" "}
              {countQuatity > 0 && (
                <span>
                  ({countQuatity < 10 ? "0" + countQuatity : countQuatity})
                </span>
              )}
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
}
