import { Response } from "express";

export const apiResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  meta?: unknown
) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    meta
  });
};
