// // const db = require('./db');
// // const User = require('./models/User')
// // // add associations here

// // module.exports = {
// //   db,
// //   User,

// // };


// const User = require('./models/User');
// const Order = require('./models/Order');
// const Pizza = require('./models/Pizza');
// const OrderItem = require('./models/OrderItem');

// const db = require('./db')

// /**
//  * If we had any associations to make, this would be a great place to put them!
//  * ex. if we had another model called BlogPost, we might say:
//  *
//  *    BlogPost.belongsTo(User)
//  */
// User.hasMany(Order);
// Order.belongsTo(User);
// OrderItem.belongsTo(Order);
// Order.hasMany(OrderItem);

// Pizza.belongsToMany(Order, { through: 'pizzaOrders' });
// Order.belongsToMany(Pizza, { through: 'pizzaOrders' });

// /**
//  * We'll export all of our models here, so that any time a module needs a model,
//  * we can just require it from 'db/models'
//  * for example, we can say: const {User} = require('../db/models')
//  * instead of: const User = require('../db/models/user')
//  */
// module.exports = {
//   db,
//   User,
//   Pizza,
//   Order,
//   OrderItem,
// };

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