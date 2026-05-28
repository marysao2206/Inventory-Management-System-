import { Request } from "express";

export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
}

export const getPagination = (req: Request) => {
  const pageValue = Number(req.query.page ?? 1);
  const limitValue = Number(req.query.limit ?? 10);

  const page = Number.isFinite(pageValue) && pageValue > 0 ? Math.floor(pageValue) : 1;
  const limit = Number.isFinite(limitValue) && limitValue > 0 ? Math.min(Math.floor(limitValue), 100) : 10;

  return {
    page,
    limit,
    skip: (page - 1) * limit
  };
};

export const paginationMeta = (total: number, page: number, limit: number) => {
  const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages
  };
};
