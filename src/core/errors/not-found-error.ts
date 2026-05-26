import { ResponseMessage } from "../../constants/response-message.constant";
import { AppError } from "./app-error";

export class NotFoundError extends AppError {
  constructor(message: string = ResponseMessage.NOT_FOUND) {
    super(404, message);
  }
}
