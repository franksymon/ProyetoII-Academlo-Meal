const express = require('express');

//CONTROLLER
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deletedRestaurant,
  createReviewRestaurant,
  updateReviewsRestaurant,
  deletedReviewsRestaurant,
} = require('../controllers/restaurantController');

//MIDDLEWARES
const { restaurantExists } = require('../middlewares/restaurantsMiddlewares');

const {
  reviweExists,
  protectOwnerReview,
} = require('../middlewares/reviewMiddlewares');

const {
  protectAdmin,
  protectToken,
} = require('../middlewares/usersMiddlewares');

//VALIDATIONS - MIDDLEWARES
const {
  createRestaurantValidations,
  createReviewValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');

const router = express.Router();

//ENDPONINTS
router.get('/', getAllRestaurants);

router.get('/:restaurantId', restaurantExists, getRestaurantById);

router.use(protectToken);

//RESTAURANTS
router.post(
  '/',
  protectAdmin,
  createRestaurantValidations,
  checkValidations,
  createRestaurant
);

router
  .use('/:restaurantId', protectAdmin, restaurantExists)
  .route('/:restaurantId')
  .patch(updateRestaurant)
  .delete(deletedRestaurant);

//REVIWES
router.post(
  '/reviews/:restaurantId',
  createReviewValidations,
  checkValidations,
  createReviewRestaurant
);

router
  .use('/reviews/:restaurantId/:reviweId', reviweExists, protectOwnerReview)
  .route('/reviews/:restaurantId/:reviweId')
  .patch(updateReviewsRestaurant)
  .delete(deletedReviewsRestaurant);

module.exports = { restaurantRouters: router };
