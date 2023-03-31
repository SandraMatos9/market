import { NextFunction, Request, Response } from "express";
import market from "./database";
import { IProduct, TProductRequest } from "./interfaces";

const productsMiddlewareIdExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(request.params.id);
  const findIndex = market.findIndex((prod) => prod.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      error: "product not found",
    });
  }
  response.locals.marketProductsMiddleware = {
    idProduct: id,
    indexProduct: findIndex,
  };
  return next();
};

const productsMiddlewareNameExist = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const metodo = request.method;
  if (metodo == "POST") {
    const productData: TProductRequest[] = request.body;
    productData.forEach((product) => {
      const { name } = product;
      const filterName: IProduct[] = market.filter(
        (productName) => productName.name === name
      );

      if (filterName.length != 0) {
        return response.status(404).json({
          error: "Product already registered",
        });
      }
    });
  }
  if (metodo == "PATCH") {
    const productData: TProductRequest = request.body;
    const name = request.params.name;
    const filterName: IProduct[] = market.filter(
      (productName) => productName.name === name
    );
    if (filterName.length != 0) {
      return response.status(404).json({
        error: "Product already registered",
      });
    }
  }

  return next();
};

export { productsMiddlewareIdExist, productsMiddlewareNameExist };
