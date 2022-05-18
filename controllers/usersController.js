const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// MODELS
const { User } = require('../models/userModel');
const { Order } = require('../models/orderModel');
const { Restaurant } = require('../models/restaurantModel');
const { Meals } = require('../models/mealModel');

// UTILS
const { catchAsync } = require('../utils/catchAsync');

dotenv.config({ path: './config.env' });

const getAllOrderUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const userOrders = await Order.findAll({
    where: { userId: sessionUser.id },
    include: { model: Meals },
    include: { model: Restaurant },
  });

  res.status(200).json({ status: 'success', userOrders });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const userOrder = await Order.findOne({
    where: { userId: sessionUser.id },
    include: { model: Meals },
    include: { model: Restaurant },
  });

  res.status(200).json({ status: 'success', userOrder });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
    role,
  });

  // Remove password from response
  newUser.password = undefined;

  res.status(201).json({ newUser });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({ name, email });

  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'deleted' });

  res.status(200).json({
    status: 'success',
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate that user exists with given email
  const user = await User.findOne({
    where: { email, status: 'active' },
  });

  // Compare password with db
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  // Generate JWT
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;

  res.status(200).json({ token, user });
});

module.exports = {
  getAllOrderUser,
  getOrderById,
  createUser,
  updateUser,
  deleteUser,
  login,
};
