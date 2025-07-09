import Image from "next/image";

export default function LoadingComponent() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center font-extrabold text-5xl">
        <div className="flex items-center gap-3">
          Loading
          <Image src="/loading.svg" height={75} width={75} alt="loading svg" />
        </div>
      </div>
    </>
  );
}
