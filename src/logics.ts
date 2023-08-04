import { Request, Response } from "express";
import Product from "./interfaces";
import { market } from "./database";

let id = 1;

const totalSum = (arr: Product[]): number => {
  return arr.reduce((acc, val) => acc + val.price, 0);
};

const create = (req: Request, res: Response): Response => {
  const expirationDate: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);

  const newProduct: Product = {
    ...req.body,
    id: id++,
    expirationDate,
  };

  market.push(newProduct);

  return res.status(201).json(newProduct);
};

const read = (req: Request, res: Response): Response => {
  return res.status(200).json({ total: totalSum(market), products: market });
};

const retrieve = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  return res.status(200).json(market[productIndex]);
};

const update = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market[productIndex] = Object.assign(market[productIndex], req.body);

  return res.status(200).json(market[productIndex]);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market.splice(productIndex, 1);

  return res.status(204).json();
};

export { create, read, retrieve, update, deleteProduct };
