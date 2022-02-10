class GeneralError extends Error {
    constructor(message, code) {
        super(message, code);
        this.message = message;
        this.code = code;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, GeneralError);
        }
    }
}

module.exports = GeneralError;