import Stripe from "stripe";
import "../../../envConfig";
import { NextRequest, NextResponse } from "next/server";

const STRIPE_API_KEY = process.env.STRIPE_API_SECRET_KEY;

if (!STRIPE_API_KEY) {
  throw new Error("Missing stripe api key in environment variables.");
}

const stripe = new Stripe(STRIPE_API_KEY);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  try {
    const products = await stripe.products.list({
      limit: 50,
      active: true,
    });

    const prices = await stripe.prices.list({
      limit: 50,
      active: true,
    });

    const productsData = products.data.map((product) => {
      const productsPrices = prices.data.filter((price) => {
        return price.product === product.id;
      });

      return {
        ...product,
        prices: productsPrices.map((price) => {
          return {
            id: price.id,
            unit_amount: price.unit_amount,
            currency: price.currency,
            recurring: price.recurring,
          };
        }),
      };
    });

    return NextResponse.json(productsData);
  } catch (error) {
    let errorMessage = "An unknown error has occured.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.log("Error fetching data from stripe", errorMessage);

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
