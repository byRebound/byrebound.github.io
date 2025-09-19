import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { paymentIntentId } = JSON.parse(event.body);

    // Confirm the PaymentIntent server-side
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId);

    const success = paymentIntent.status === "succeeded";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success, status: paymentIntent.status }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
