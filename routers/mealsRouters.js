const express = require('express');

//CONTROLLER
const {
  createMeals,
  getAllMeals,
  getMealsById,
  updateMeals,
  deletedMeals,
} = require('../controllers/mealsController');

//MIDDLEWARES
const { mealsExists } = require('../middlewares/mealsMiddlewares');
const { restaurantExists } = require('../middlewares/restaurantsMiddlewares');
const {
  protectToken,
  protectAdmin,
} = require('../middlewares/usersMiddlewares');
const {
  createMealValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');

const router = express.Router();

//ENDPONINTS
router.get('/', getAllMeals);

router.get('/:mealId', getMealsById);

router.use(protectToken, protectAdmin);

router.post(
  '/:restaurantId',
  restaurantExists,
  createMealValidations,
  checkValidations,
  createMeals
);

router.patch('/:mealId', mealsExists, updateMeals);

router.delete('/:mealId', mealsExists, deletedMeals);

module.exports = { mealsRouters: router };
