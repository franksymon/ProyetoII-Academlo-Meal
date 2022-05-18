const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const createRestaurantValidations = [
  body('name').notEmpty().withMessage('Name Restaurant cannot be empty'),
  body('address').notEmpty().withMessage('Address Restaurant cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating Restaurant cannot be empty')
    .isInt({ min: 1, max: 5 })
    .withMessage('rating value must be between 1 to 5'),
];

const createReviewValidations = [
  body('comment')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: 100 })
    .withMessage('comments must be maximum 100 characters'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isInt({ min: 1, max: 5 })
    .withMessage('rating value must be between 1 to 5'),
];

const createMealValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isCurrency()
    .withMessage('Invalide value'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

module.exports = {
  createUserValidations,
  createRestaurantValidations,
  createReviewValidations,
  createMealValidations,
  checkValidations,
};
