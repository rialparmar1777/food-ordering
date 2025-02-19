import { stripe } from "../../lib/stripe"; // Assuming you have a Stripe instance in lib/stripe.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Get the cart from the request body (which contains meal details)
      const { cart } = req.body;

      // Map cart items to Stripe line items format
      const lineItems = cart.map(meal => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: meal.strMeal,
          },
          unit_amount: Math.round(meal.price * 100), // convert to cents
        },
        quantity: 1,
      }));

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
