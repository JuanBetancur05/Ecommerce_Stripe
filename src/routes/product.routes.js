
import { Router } from "express";
import { createSession } from "../controllers/payment.controller.js";
import { listarProductos } from "../controllers/listadoP.js";

const router = Router();

router.post("/create-checkout-session", createSession);

router.get("/success", (req, res) => res.redirect("/success.html"));

router.get("/cancel", (req, res) => res.redirect("/cancel.html"));

router.get("/products", listarProductos);

export default router;
