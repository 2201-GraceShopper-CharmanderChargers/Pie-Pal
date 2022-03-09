const router = require('express').Router();
const { User, Order, Pizza, OrderItem } = require('../db/models');
module.exports = router;

//GET /api/orders/cart?userId={int}
router.get('/cart', async (req, res, next) => {
  try {
    if (req.query.userId) {
      const userId = req.query.userId;
      const user = await User.findByPk(userId);
      const pendingOrders = await user.getOrders({
        where: { status: 'Pending' },
      });
      const cart = pendingOrders[0];
      res.send(cart);
    } else {
      const orders = await Order.findAll();
      res.send(orders);
    }
  } catch (error) {
    next(error);
  }
});

//POST api/orders
//After processing an order, create a new cart as a pending order for the user.
router.post('/', async (req, res, next) => {
  try {
    const newCart = await Order.create({ status: 'Pending' });
    if (req.body.userId) {
      const userId = req.body.userId;
      await newCart.setUser(userId);
    } else if (req.body.items) {
      const newItems = req.body.items;
      await newItems.map(async (item) => {
        const itemModel = await OrderItem.findByPk(item.id);
        await itemModel.setOrder(newCart);
      });
    }
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

//PUT /api/orders/:id
//Updates an order, usually when processing checkout.
router.put('/:orderId', async (req, res, next) => {
  try {
    const oldOrder = await Order.findByPk(req.params.orderId);
    //Decrease the quantity of each pizza by the quantity of the order item.
    //1. Get the order items and the corresponding pizza quantities.
    console.log('oldOrder: ', oldOrder);
    let orderItems = await oldOrder.getOrderItems();
    console.log('orderItems: ', orderItems);
    let pizzaQuantities = await Promise.all(
      orderItems.map(async (item) => {
        const pizza = await item.getPizza();
        return pizza.quantity;
      })
    );

    //Filter the items that cannot satisfy the order item quantity.
    let outOfStock = orderItems
      .filter((item, i) => item.quantity > pizzaQuantities[i])
      .map((item) => item.name);

    //If none are out of stock, process the order.
    let newOrder;
    if (outOfStock.length === 0) {
      await orderItems.map(async (item) => {
        const pizza = await item.getPizza();
        const newQuantity = pizza.quantity - item.quantity;
        await pizza.update({ quantity: newQuantity });
      });
      newOrder = await oldOrder.update(req.body);
    }

    //Respond with the newOrder (if any) and the array of out-of-stock pizza names (if any)
    let response = { newOrder, outOfStock };
    res.send(response);
  } catch (error) {
    next(error);
  }
});

//DEPRECATED. NOW WE GET THE CART ITEMS FROM /api/orderItems?userId={int}
// GET /api/orders?userId={int}

// router.get('/', async (req, res, next) => {
//   try {
//     const userId = req.query.userId;
//     const user = await User.findByPk(userId);
//     const pendingOrders = await user.getOrders({ where: { status: 'Pending'}});
//     const cart = pendingOrders[0];
//     const cartItems = await cart.getOrderItems();
//     res.send(cartItems);
//   } catch (error) {
//     next(error);
//   }
// })

// router.get('/', async (req, res, next) => {
//   try {
//     if (req.query.userId) {
//       const userId = req.query.userId;
//       const user = await User.findByPk(userId);
//       const pendingOrders = await user.getOrders({ where: { status: 'Pending'}});
//       const cart = pendingOrders[0];
//       res.send(cart);
//     } else {
//       const orders = await Order.findAll();
//       res.send(orders);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// helper function for grabbing previous orders

// async function getCompletedOrders(userId) {
//   try {
//     const orders = await Order.findAll({
//       where: {
//         id: userId,
//         status: 'Completed',
//       },
//     });
//     return orders;
//   } catch (error) {
//     console.error(error);
//   }
// }

// router.get('/orderHistory', async function (req, res, next) {
//   try {
//     const user = await User.findByToken(req.headers.authorization)
//     const orders = await getCompletedOrders(user.id)
//     for (let i = 0; i < orders.length; i++){
//       const orderItems = await Order.getOrderItems(orders[i].id)
//       orders[i] = orderItems
//     }
//     res.send(orders)
//     } catch (error) {
//       next(error)
//     }
//   }
// )
