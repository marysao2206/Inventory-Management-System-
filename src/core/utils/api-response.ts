import { Response } from "express";

type ApiMeta = Record<string, unknown> | undefined;

export const apiResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null = null,
  meta: ApiMeta = undefined
) => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    message,
    data,
    meta
  });
};
