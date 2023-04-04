import { Request, Response } from "express";
import market from "./database";
import { IProduct, TProductRequest } from "./interfaces";
 let id = 1
const createProduct = (request: Request, response: Response): Response => {
  const productData: TProductRequest[] = request.body;

  

  const marketProducts = productData.map((product) => {
   
    const newProduct: IProduct = {
      
      id: id++,
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
  const total: number = market.reduce((a, b) => a + b.price, 0);

  return response.json({total,market} );
};

const idProducts = (request: Request, response: Response): Response => {
  const index = response.locals.marketProducts.indexProduct;
  console.log(index)
    

  return response.json(market[index]);
};
const deleteProducts = (request: Request, response: Response): Response => {
  const index = response.locals.marketProducts.indexProduct;

  market.splice(index, 1);
  return response.status(204).send();
};

const updateProducts = (request: Request, response: Response): Response => {
  const index = response.locals.marketProducts.id;
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
  idProducts,
  deleteProducts,
  updateProducts,
};
