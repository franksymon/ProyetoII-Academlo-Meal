// MODELS
const { Order } = require('../models/orderModel');

// UTILS
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const orderExists = catchAsync(async (req, res, next) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    where: { status: 'active', id: orderId },
  });

  if (!order) {
    return next(new AppError('The Order is not active', 404));
  }

  req.orderData = order;

  next();
});

module.exports = { orderExists };
