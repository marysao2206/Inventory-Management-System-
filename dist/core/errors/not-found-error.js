import { ResponseMessage } from "../../constants/response-message.constant.js";
import { AppError } from "./app-error.js";
export class NotFoundError extends AppError {
    constructor(message = ResponseMessage.NOT_FOUND) {
        super(404, message);
    }
}
