import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRoutes from "./routes/payment.routes.js";
import productRoutes from "./routes/product.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(productRoutes);
app.use(indexRoutes);
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "assets")));

export default app;
