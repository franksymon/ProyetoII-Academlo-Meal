const express = require('express');

// Middlewares
const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/usersMiddlewares');

const { orderExists } = require('../middlewares/orderMiddlewares');

// Controller
const {
  getAllOrderUser,
  getOrderById,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/usersController');

const router = express.Router();

//ENDPONINTS
router.post('/signup', createUser);

router.post('/login', login);

// Apply protectToken middleware
router.use(protectToken);

router.get('/orders', getAllOrderUser);

router.get('/orders/:orderId', orderExists, getOrderById);

router
  .route('/:id')
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
