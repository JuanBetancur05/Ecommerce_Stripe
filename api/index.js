import serverless from "serverless-http";
import app from "../src/app.js"; // Importa la app sin arrancar el servidor

export const handler = serverless(app);
