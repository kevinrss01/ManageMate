const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1NH3rLLx6NoUPIxc1b4UtHm4",
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${req.headers.origin}/auth/paymentPage?success=true`,
        cancel_url: `${req.headers.origin}/auth/paymentPage?canceled=true`,
        automatic_tax: { enabled: true },
      });
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
