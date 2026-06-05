import { Request, Response } from "express";
import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { paymentService } from "./payment.service.js";
import { BakongQRService } from "../../core/utils/bakong-qr.service.js";


export class PaymentController {
  // ... existing methods ...

  generateQR = async (req: Request, res: Response) => {
    const { amount, merchantId, merchantName, merchantCity, currency, orderId } = req.body;

    const qrData = await BakongQRService.generatePaymentQR({
      amount,
      merchantId,
      merchantName,
      merchantCity,
      currency,
      orderId
    });

    return apiResponse(res, 200, ResponseMessage.FETCHED, qrData);
  };

  generateQRImage = async (req: Request, res: Response) => {
    const { amount, merchantId, merchantName, merchantCity, currency, orderId } = req.body;

    const qrData = await BakongQRService.generatePaymentQR({
      amount,
      merchantId,
      merchantName,
      merchantCity,
      currency,
      orderId
    });

    const base64 = qrData.qrImage.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64, "base64");

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(imageBuffer);
  };

  checkTransaction = async (req: Request, res: Response) => {
    const result = await BakongQRService.checkTransactionByMd5(req.body.md5);
    return apiResponse(res, 200, ResponseMessage.FETCHED, result);
  };

  findAll = async (req: Request, res: Response) => {
    const pagination = getPagination(req);
    const { data, total } = await paymentService.findAll(pagination);
    return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
  };

  findById = async (req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.FETCHED, await paymentService.findById(req.params.id));
  };

  create = async (req: Request, res: Response) => {
    return apiResponse(res, 201, ResponseMessage.CREATED, await paymentService.create(req.body));
  };

  update = async (req: Request, res: Response) => {
    return apiResponse(res, 200, ResponseMessage.UPDATED, await paymentService.update(req.params.id, req.body));
  };

  remove = async (req: Request, res: Response) => {
    await paymentService.remove(req.params.id);
    return apiResponse(res, 200, ResponseMessage.DELETED);
  };
}

export const paymentController = new PaymentController();