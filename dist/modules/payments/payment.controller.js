import { ResponseMessage } from "../../constants/response-message.constant.js";
import { apiResponse } from "../../core/utils/api-response.js";
import { getPagination, paginationMeta } from "../../core/utils/pagination.js";
import { paymentService } from "./payment.service.js";
import { BakongQRService } from "../../core/utils/bakong-qr.service.js";
export class PaymentController {
    constructor() {
        // ... existing methods ...
        this.generateQR = async (req, res) => {
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
        this.generateQRImage = async (req, res) => {
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
        this.checkTransaction = async (req, res) => {
            const result = await BakongQRService.checkTransactionByMd5(req.body.md5);
            return apiResponse(res, 200, ResponseMessage.FETCHED, result);
        };
        this.findAll = async (req, res) => {
            const pagination = getPagination(req);
            const { data, total } = await paymentService.findAll(pagination);
            return apiResponse(res, 200, ResponseMessage.FETCHED, data, paginationMeta(total, pagination.page, pagination.limit));
        };
        this.findById = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.FETCHED, await paymentService.findById(req.params.id));
        };
        this.create = async (req, res) => {
            return apiResponse(res, 201, ResponseMessage.CREATED, await paymentService.create(req.body));
        };
        this.update = async (req, res) => {
            return apiResponse(res, 200, ResponseMessage.UPDATED, await paymentService.update(req.params.id, req.body));
        };
        this.remove = async (req, res) => {
            await paymentService.remove(req.params.id);
            return apiResponse(res, 200, ResponseMessage.DELETED);
        };
    }
}
export const paymentController = new PaymentController();
