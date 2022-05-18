// err -> AppError
const globalErrorHandler = (err, req, res, next) => {
  const statusCode = statusCode || 500;
  const status = status || 'fail';

  res.status(statusCode).json({
    status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

module.exports = { globalErrorHandler };
