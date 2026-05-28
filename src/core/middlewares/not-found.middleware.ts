import { NextFunction, Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant";
import { NotFoundError } from "../errors/not-found-error";

export const notFoundMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new NotFoundError(ResponseMessage.NOT_FOUND));
};
