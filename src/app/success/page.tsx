import FooterComponent from "@/components/app/FooterComponent";
import NavbarComponent from "@/components/app/NavbarComponent";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <NavbarComponent />
      <div className="h-[40vh] flex flex-col justify-center items-center text-2xl">
        <div>
          <h2>Congratulations! Your payment was successful. 🎉</h2>
          <Link href={"/"} className="mt-10 block text-center">
            &larr; Back to shopping
          </Link>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
