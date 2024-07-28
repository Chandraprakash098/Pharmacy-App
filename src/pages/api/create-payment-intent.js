import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    try {
      // Create a Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        payment_method_types: ["card"],
      });

      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res
        .status(500)
        .json({
          message: "Payment intent creation failed",
          error: error.message,
        });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
