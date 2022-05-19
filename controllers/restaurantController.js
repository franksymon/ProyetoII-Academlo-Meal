//MODELS
const { Restaurant } = require('../models/restaurantModel');
const { Reviews } = require('../models/reviewModel');

// UTILS
const { catchAsync } = require('../utils/catchAsync');

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({ name, address, rating });

  res.status(201).json({ status: 'success', newRestaurant });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
    include: [{ model: Reviews }],
  });

  res.status(201).json({ status: 'success', restaurants });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurantData } = req;

  res.status(200).json({ restaurantData });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantData } = req;

  const { name, address } = req.body;

  await restaurantData.update({ name, address });

  res.status(200).json({ status: 'success' });
});

const deletedRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantData } = req;

  await restaurantData.update({ status: 'deleted' });

  res.status(200).json({ status: 'success' });
});

const createReviewRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantData, sessionUser } = req;

  const { comment, rating } = req.body;

  const newReview = await Reviews.create({
    userId: sessionUser.id,
    comment,
    rating,
    restaurantId: restaurantData.id,
  });

  res.status(201).json({ status: 'success', newReview });
});

const updateReviewsRestaurant = catchAsync(async (req, res, next) => {
  const { reviewData } = req;

  const { comment, rating } = req.body;

  await reviewData.update({ comment, rating });

  res.status(200).json({ status: 'success' });
});

const deletedReviewsRestaurant = catchAsync(async (req, res, next) => {
  const { reviewData } = req;

  await reviewData.update({ status: 'deleted' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deletedRestaurant,
  createReviewRestaurant,
  updateReviewsRestaurant,
  deletedReviewsRestaurant,
};
