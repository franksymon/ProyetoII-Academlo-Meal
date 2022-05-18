const express = require('express');

//CONTROLLER
const {
  createOrder,
  getAllOrders,
  updateOrder,
  deletedOrder,
} = require('../controllers/ordersController');

//MIDDLEWARES
const {
  protectToken,
  protectAccountOwner,
} = require('../middlewares/usersMiddlewares');

const { orderExists } = require('../middlewares/orderMiddlewares');

const router = express.Router();

//ENDPONINTS
router.use(protectToken);

router.post('/', createOrder);

router.get('/me', getAllOrders);

router.patch('/:orderId', protectAccountOwner, orderExists, updateOrder);

router.delete('/:orderId', protectAccountOwner, orderExists, deletedOrder);

module.exports = { ordersRouters: router };
