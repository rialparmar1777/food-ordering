import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cart } = await req.json();
    if (!cart || cart.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.strMeal,
          images: item.strMealThumb ? [item.strMealThumb] : [],
        },
        unit_amount: Math.round((item.price || 5.99) * 100), // Convert to cents
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    });

    return Response.json({ id: session.id });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
