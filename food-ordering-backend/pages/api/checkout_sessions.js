import { stripe } from "../../lib/stripe"; // Assuming you have a Stripe instance in lib/stripe.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get line items from the request body
      const { lineItems } = req.body;

      // Create Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      });

      // Return session id in response
      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
