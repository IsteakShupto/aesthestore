import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Head from "./head";
import ProductsProvider from "@/components/context/ProductsContext";

export const metadata = {
  title: "Aesthetic store | Buy your favourite aesthetic items...",
  description:
    "Discover a curated collection of aesthetic items that reflect your unique style. From home décor to fashion accessories, shop beautiful, minimal, and trendy pieces made to inspire your everyday life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProductsProvider>
      <html lang="en" suppressHydrationWarning>
        <Head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ProductsProvider>
  );
}
