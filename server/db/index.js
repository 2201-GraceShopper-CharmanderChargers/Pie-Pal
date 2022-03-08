const db = require('./db');
const User = require('./models/User');
const Order = require('./models/Order');
const Pizza = require('./models/Pizza');
const OrderItem = require('./models/OrderItem');

User.hasMany(Order);
Order.belongsTo(User);
OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

Pizza.belongsToMany(Order, { through: 'pizzaOrders' });
Order.belongsToMany(Pizza, { through: 'pizzaOrders' });

// register models
require('./models');

module.exports = {
  db,
  User,
  Pizza,
  Order,
  OrderItem,
};