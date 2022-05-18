// MODELS
const { Reviews } = require('../models/reviewModel');

// UTILS
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const reviweExists = catchAsync(async (req, res, next) => {
  const { reviweId } = req.params;

  const review = await Reviews.findOne({
    where: { status: 'active', id: reviweId },
  });

  if (!review) {
    return next(new AppError('Reviwe does not exist with given Id', 404));
  }

  req.reviewData = review;

  next();
});

const protectOwnerReview = catchAsync(async (req, res, next) => {
  const { userSession } = req;
  const { restaurantId, reviweId } = req.params;

  const review = await Reviews.findOne({
    where: {
      id: reviweId,
      userId: userSession.id,
      restaurantId,
    },
  });

  if (!review) {
    return next(new AppError('Review does not exist with given Id', 404));
  }

  next();
});

module.exports = { reviweExists, protectOwnerReview };
