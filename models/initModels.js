const { Meals } = require('./mealModel');
const { Order } = require('./orderModel');
const { Restaurant } = require('./restaurantModel');
const { Reviews } = require('./reviewModel');
const { User } = require('./userModel');

const initModels = () => {
  // 1 User <----> M Order
  User.hasMany(Order);
  Order.belongsTo(User);

  // 1 Restaurant <----> M Reviews
  Restaurant.hasMany(Reviews);
  Reviews.belongsTo(Restaurant);

  // 1 Restaurant <----> M meals
  Restaurant.hasMany(Meals);
  Meals.belongsTo(Restaurant);

  // 1 order <----> 1 Meal
  Meals.hasOne(Order);
  Order.belongsTo(Meals);
};

module.exports = { initModels };
