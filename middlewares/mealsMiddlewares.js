// MODELS
const { Meals } = require('../models/mealModel');

// UTILS
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const mealsExists = catchAsync(async (req, res, next) => {
  const { mealId } = req.params;

  const meal = await Meals.findOne({
    where: { status: 'active', id: mealId },
  });

  if (!meal) {
    return next(new AppError('Meals does not exist with given Id', 404));
  }

  req.mealData = meal;

  next();
});

module.exports = { mealsExists };
