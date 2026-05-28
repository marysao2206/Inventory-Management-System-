import { NextFunction, Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant";
import { AppError } from "../errors/app-error";

type DatabaseError = {
  code?: string;
  errno?: number;
  message?: string;
  name?: string;
};

const isDevelopment = process.env.NODE_ENV !== "production";

const errorPayload = (message: string, details?: string) => ({
  success: false,
  message,
  ...(isDevelopment && details ? { error: details } : {})
});

export const errorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorPayload(error.message));
  }

  const dbError = error as DatabaseError;

  if (dbError.code === "ER_DUP_ENTRY") {
    return res.status(409).json(
      errorPayload(
        "Duplicate record exists",
        dbError.message
      )
    );
  }

  if (dbError.code === "ER_NO_REFERENCED_ROW_2" || dbError.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(400).json(
      errorPayload(
        "Related record is missing or still in use",
        dbError.message
      )
    );
  }

  if (
    dbError.code === "ECONNREFUSED" ||
    dbError.code === "ETIMEDOUT" ||
    dbError.code === "ER_ACCESS_DENIED_ERROR" ||
    dbError.code === "ER_BAD_DB_ERROR" ||
    dbError.code === "ER_NO_SUCH_TABLE"
  ) {
    return res.status(503).json(
      errorPayload(
        "Database is unavailable",
        dbError.message
      )
    );
  }

  const message =
    error instanceof Error ? error.message : ResponseMessage.SERVER_ERROR;

  return res.status(500).json(
    errorPayload(
      ResponseMessage.SERVER_ERROR,
      isDevelopment ? message : undefined
    )
  );
};
