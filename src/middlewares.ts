import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import Product from "./interfaces";

const ensureProductExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const productIndex: number = market.findIndex(
    (market: Product): boolean => market.id === Number(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  res.locals.productIndex = productIndex;

  return next();
};

const ensureNameExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const productName = market.find(
    (market: Product) => market.name === req.params.name
  );

  if (productName) {
    return res.status(409).json({ message: "Product already registered." });
  }
};

export default { ensureProductExists, ensureNameExists };
