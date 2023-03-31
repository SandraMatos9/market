import { Request, Response } from "express";
import market from "./database";
import { IProduct, TProductRequest } from "./interfaces";

const createProduct = (request: Request, response: Response): Response => {
  const productData: TProductRequest[] = request.body;

  let count = 0;

  const marketProducts = productData.map((product) => {
    count++;
    const newProduct: IProduct = {
      id: count,
      ...product,
      expirationDate: new Date(),
    };
    market.push(newProduct);
    return newProduct;
  });
  const total: number = marketProducts.reduce((a, b) => a + b.price, 0);

  return response.status(201).json({ total, marketProducts });
};

const allProducts = (request: Request, response: Response): Response => {
  return response.json(market);
};

const retrieveProducts = (request: Request, response: Response): Response => {
  const index = response.locals.marketProducts.indexProduct;

  return response.json(market[index]);
};
const deleteProducts = (request: Request, response: Response): Response => {
  const index = response.locals.marketProducts.indexProduct;
  market.splice(index, 1);
  return response.status(204).send();
};

const updateProducts = (request: Request, response: Response): Response => {
  const index = response.locals.marketProducts.indexProduct;
  const updateData = request.body;
  market[index] = {
    ...market[index],
    ...updateData,
  };
  return response.json(market[index]);
};
export {
  createProduct,
  allProducts,
  retrieveProducts,
  deleteProducts,
  updateProducts,
};
