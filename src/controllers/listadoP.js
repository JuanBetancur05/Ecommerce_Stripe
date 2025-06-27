import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const listarProductos = async (req, res) => {
  try {
    const products = await stripe.products.list({ active: true });

    const formattedProducts = await Promise.all(
      products.data.map(async (product) => {
        if (!product.default_price) return null;

        const price = await stripe.prices.retrieve(product.default_price);

        return {
          id: product.id,
          name: product.name,
          description: product.description || "Sin descripción",
          image: product.images[0] || "https://via.placeholder.com/150", // Imagen del producto o placeholder
          price: price.unit_amount / 100, // Convertir a dólares
        };
      })
    );

    res.json(formattedProducts.filter((p) => p !== null));
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ error: error.message });
  }
};
