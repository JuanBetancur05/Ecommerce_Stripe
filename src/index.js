import express from "express";
import path from "path";
import { PORT } from "./config.js";

import indexRoutes from "./routes/payment.routes.js";
import productRoutes from "./routes/product.routes.js";

// Initializations
const serverless = require("serverless-http");
const app = express();
app.use(express.json());
app.use(productRoutes);
app.use(indexRoutes);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(productRoutes);

// Routes
app.use(indexRoutes);

// Static files
app.use(express.static(path.resolve("src/public")));
app.use(express.static(path.resolve("src/assets")));





// Start Server
app.listen(PORT);
console.log("Server on port", PORT);

module.exports.handler = serverless(app);
