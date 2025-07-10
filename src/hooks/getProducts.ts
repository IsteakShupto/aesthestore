import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetProducts() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>();

  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);
        const getProductsURL = "/api/products";
        const response = await axios.get(getProductsURL);
        setData(response.data);
        setIsError(null);
        setIsLoading(false);
      } catch (error) {
        setIsError("An unknown error has occured.");

        if (error instanceof Error) {
          setIsError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  return { data, isLoading, isError };
}
