import { AppError } from "../errors/app-error.js";
import { env } from "../../config/env.config.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// bakong-khqr is CommonJS and does not ship TS types in this project.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { BakongKHQR, IndividualInfo, khqrData } = require("bakong-khqr");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const QRCode = require("qrcode");
export class BakongQRService {
    static resolveCurrency(code) {
        return code === "USD" ? khqrData.currency.usd : khqrData.currency.khr;
    }
    static assertConfigForStatusCheck() {
        if (!env.bakong.apiToken) {
            throw new AppError(500, "BAKONG_API_TOKEN is missing");
        }
    }
    static async generatePaymentQR(input) {
        const merchantId = input.merchantId ?? env.bakong.merchantId;
        const merchantName = input.merchantName ?? env.bakong.merchantName;
        const merchantCity = input.merchantCity ?? env.bakong.merchantCity;
        const currencyCode = (input.currency ?? env.bakong.currency).toUpperCase();
        if (!merchantId) {
            throw new AppError(400, "Merchant ID is required");
        }
        if (!Number.isFinite(input.amount) || input.amount <= 0) {
            throw new AppError(400, "Amount must be a positive number");
        }
        const optionalData = {
            currency: this.resolveCurrency(currencyCode),
            amount: input.amount,
            billNumber: input.orderId,
            expirationTimestamp: Date.now() + env.bakong.expirationSeconds * 1000
        };
        const khqr = new BakongKHQR();
        const info = new IndividualInfo(merchantId, this.resolveCurrency(currencyCode), merchantName, merchantCity, optionalData);
        const generated = khqr.generateIndividual(info);
        if (!generated?.data?.qr || !generated?.data?.md5) {
            throw new AppError(400, generated?.error?.message ?? "Failed to generate KHQR");
        }
        const qrImage = await QRCode.toDataURL(generated.data.qr);
        return {
            khqr: generated.data.qr,
            md5: generated.data.md5,
            qrImage,
            amount: input.amount,
            currency: currencyCode,
            merchantId,
            merchantName
        };
    }
    static async checkTransactionByMd5(md5) {
        this.assertConfigForStatusCheck();
        const response = await fetch(`${env.bakong.apiBaseUrl}/v1/check_transaction_by_md5`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${env.bakong.apiToken}`
            },
            body: JSON.stringify({ md5 })
        });
        const raw = await response.text();
        let parsed = raw;
        try {
            parsed = JSON.parse(raw);
        }
        catch {
            // keep raw string when response is not JSON
        }
        if (!response.ok) {
            throw new AppError(response.status, "Bakong transaction check failed", parsed);
        }
        return parsed;
    }
}
