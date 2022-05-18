const express = require('express');
const rateLimit = require('express-rate-limit');

//INIIT EXPRESS
const app = express();

//ENABLE INCOMIN JSON DATA
app.use(express.json());

//CONTROLLER
const { globalErrorHandler } = require('./controllers/errorsController');

//ROUTERS
const { usersRouter } = require('./routers/usersRoutes');
const { restaurantRouters } = require('./routers/restaurantRouters');
const { mealsRouters } = require('./routers/mealsRouters');
const { ordersRouters } = require('./routers/ordersRouters');

//LIMIT IP REQUESTS
const limiter = rateLimit({
  max: 10000,
  windowMs: 1 * 60 * 60 * 1000, // 1 hr
  message: 'Too many requests from this IP',
});

app.use(limiter);

//ENDPOINTS
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouters);
app.use('/api/v1/meals', mealsRouters);
app.use('/api/v1/orders', ordersRouters);

//GOBLAL ERROR HANDLER
app.use('*', globalErrorHandler);

module.exports = { app };
