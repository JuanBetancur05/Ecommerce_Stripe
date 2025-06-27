import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);


// **4️⃣ Mantener la lógica de Stripe Checkout en caso de que no haya Payment Link**
export const createSession = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "❌ Se requiere un productId para el pago." });
        }

        // Obtener el producto desde Stripe
        const product = await stripe.products.retrieve(productId);

        if (!product.default_price) {
            return res.status(400).json({ message: "❌ El producto no tiene precio definido." });
        }

        const price = await stripe.prices.retrieve(product.default_price);

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: price.id,
                quantity: 1
            }],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        return res.json({ url: session.url });
    } catch (error) {
        console.error("❌ Error en Stripe:", error);
        return res.status(500).json({ message: error.message });
    }
};
