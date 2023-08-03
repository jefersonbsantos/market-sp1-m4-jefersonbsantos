import express, { Application, json } from "express";
import { create, deleteProduct, read, retrieve, update } from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", middlewares.ensureNameExists, create);
app.get("/products", read);

app.get("/products/:id", middlewares.ensureProductExists, retrieve);
app.patch(
  "/products/:id",
  middlewares.ensureProductExists,
  middlewares.ensureNameExists,
  update
);
app.delete("/products/:id", middlewares.ensureProductExists, deleteProduct);

const PORT: number = 3000;
const runningMsg = `Server running on http://localhost:${PORT}`;

app.listen(PORT, (): void => {
  console.log(runningMsg);
});
