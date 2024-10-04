import { Request, Response, NextFunction } from "express";
import CustomError from "../models/CustomError";
import {STATUS_CODES, MESSAGES} from "../config/constant"

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, release_year_above, release_year_below, min_price, max_price } =
    req.query;
  if (page && (isNaN(Number(page)) || Number(page) <= 0)) {
    const error = new CustomError( STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST);
    return next(error); // Chuyển lỗi đến errorHandler xử lý
  }
  if (release_year_above) {
    if (isNaN(Number(release_year_above)) || Number(release_year_above) <= 0) {
      const error = new CustomError( STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST);
      return next(error);
    }
  }
  if (release_year_below) {
    if (isNaN(Number(release_year_below)) || Number(release_year_below) <= 0) {
      const error = new CustomError( STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST);
      return next(error);
    }
  }

  if (min_price) {
    if (isNaN(Number(min_price)) || Number(min_price) < 0) {
      const error = new CustomError( STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST);
    }
  }

  if (max_price) {
    if (isNaN(Number(max_price)) || Number(max_price) <= 0) {
      const error = new CustomError( STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST);
      return next(error);
    }
  }
  next();
};
