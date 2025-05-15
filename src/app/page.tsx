"use client";

import FooterComponent from "@/components/app/FooterComponent";
import HeroComponent from "@/components/app/HeroComponent";
import NavbarComponent from "@/components/app/NavbarComponent";

export default function Home() {
  return (
    <>
      <NavbarComponent />
      <HeroComponent />
      <FooterComponent />
    </>
  );
}
