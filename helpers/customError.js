export default class CustomError extends Error {
    constructor(status, ...options) {
        super(...options);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        }
        this.status = status;
    }
}
