//MODELS
const { Meals } = require('../models/mealModel');
const { Restaurant } = require('../models/restaurantModel');

// UTILS
const { catchAsync } = require('../utils/catchAsync');

const createMeals = catchAsync(async (req, res, next) => {
  const { restaurantData } = req;

  const { name, price } = req.body;

  const newMeal = await Meals.create({
    restaurantId: restaurantData.id,
    name,
    price,
  });

  res.status(201).json({ status: 'success', newMeal });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: { status: 'active' },
    include: [{ model: Restaurant }],
  });

  res.status(200).json({ meals });
});

const getMealsById = catchAsync(async (req, res, next) => {
  const { mealId } = req.body;

  const meal = await Meals.findOne({
    where: { status: 'active', id: mealId },
    include: [{ model: Restaurant }],
  });

  res.status(200).json({ meal });
});

const updateMeals = catchAsync(async (req, res, next) => {
  const { mealData } = req;

  const { name, price } = req.body;

  await mealData.update({ name, price });

  res.status(200).json({ status: 'success' });
});

const deletedMeals = catchAsync(async (req, res, next) => {
  const { mealData } = req;

  await mealData.update({ status: 'deleted' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  createMeals,
  getAllMeals,
  getMealsById,
  updateMeals,
  deletedMeals,
};
