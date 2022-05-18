class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

    //4** -> Client error -> 'error'
    //5** -> Server error -> 'fail'

    this.status = `${statusCode}`.startsWith('4') ? 'error' : 'fali';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
