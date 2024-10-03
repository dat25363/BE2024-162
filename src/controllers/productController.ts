import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/productService";
import {STATUS_CODES} from "../config/constant"

const productService = new ProductService();

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await productService.productSearch(req.query);
    return res.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error); 
  }
};
