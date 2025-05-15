import Stripe from "stripe";
import "../../../envConfig";
import { NextRequest, NextResponse } from "next/server";

const STRIPE_API_KEY = process.env.STRIPE_API_SECRET_KEY;

if (!STRIPE_API_KEY) {
  throw new Error("Missing stripe api key in environment variables.");
}

const stripe = new Stripe(STRIPE_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { lineItems } = await request.json();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: process.env.NEXT_PUBLIC_BASE_URL + "/success",
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + "/",
    });
    return NextResponse.json({ session });
  } catch (error) {
    let errorMessage = "An unknown error has occured.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.log("Error fetching data from stripe", errorMessage);

    return NextResponse.json(
      {
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
