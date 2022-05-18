// MODELS
const { Restaurant } = require('../models/restaurantModel');
const { Reviews } = require('../models/reviewModel');

// UTILS
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { status: 'active', id: restaurantId },
    include: { model: Reviews },
  });

  if (!restaurant) {
    return next(new AppError('Restaurant does not exist with given Id', 404));
  }

  req.restaurantData = restaurant;

  next();
});

module.exports = { restaurantExists };
