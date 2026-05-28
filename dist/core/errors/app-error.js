export class AppError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }
}
