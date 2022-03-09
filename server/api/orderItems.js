const router = require('express').Router();
const { OrderItem, Order, User } = require('../db/models');
module.exports = router;

//GET /api/orderItems?orderId={int}
//Get all the order items associated with a given order.
router.get('/', async (req, res, next) => {
  try {
    if (req.query.orderId) {
      const order = await Order.findByPk(req.query.orderId);
      const items = await order.getOrderItems();
      res.send(items);
    }
  } catch (error) {
    next(error);
  }
});

//GET /api/orderItems/cart?userId={int}
//On login, retrieve the cart items associated with the user.
router.get('/cart', async (req, res, next) => {
  try {
    if (req.query.userId) {
      const userId = req.query.userId;
      const user = await User.findByPk(userId);
      const pendingOrders = await user.getOrders({
        where: { status: 'Pending' },
      });
      const cart = pendingOrders[0];
      const cartItems = await cart.getOrderItems();
      res.send(cartItems);
    }
  } catch (error) {
    next(error);
  }
});

//POST /api/orderItems
//Creates a new order item when it is added to the cart. Assigns the orderItem to the pending order associated with the registered user.
router.post('/', async (req, res, next) => {
  try {
    //Create an orderItem based on the info provided from the pizza object. NOTE: Quantity refers to the quantity selected by the user, not the inventory quantity.
    const { user, newPizza } = req.body;
    let cartItems;
    let cart;
    //If there's a user, get the cart and associated items from their pending order.
    if (user) {
      const userModel = await User.findByPk(user.id);
      const pendingOrders = await userModel.getOrders({
        where: { status: 'Pending' },
      });
      cart = pendingOrders[0];
      cartItems = await cart.getOrderItems();
    } else {
      //If not, the guest has all order items not assigned to an order.
      cartItems = await OrderItem.findAll({ where: { orderId: null } });
    }

    //Check whether the order item already exists in the cart. If so, only update the quantity.
    const matchingOrderItems = cartItems.filter(
      (item) => item.name === newPizza.name
    );
    let newOrderItem;
    if (matchingOrderItems.length > 0) {
      newOrderItem = matchingOrderItems[0];
      const newQuantity = newOrderItem.quantity + newPizza.quantity;
      await newOrderItem.update({ quantity: newQuantity });
    } else {
      //If it does not already exist, create a new order item.
      newOrderItem = await OrderItem.create({
        name: newPizza.name,
        description: newPizza.description,
        price: newPizza.price,
        imageUrl: newPizza.imageUrl,
        quantity: newPizza.quantity,
      });
      if (user) {
        //If there's a user, assign that new order item to the cart.
        newOrderItem.setOrder(cart);
      }
      //Associate the order item with its pizza item. Use this to adjust quantity of pizzas upon checkout.
      newOrderItem.setPizza(newPizza.id);
    }
    res.send(newOrderItem);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/orderItems/:id
// Deletes an order item, primarily due to its removal from the cart.
router.delete('/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    const result = await item.destroy();
    res.send(result);
  } catch (error) {
    next(error);
  }
});

// PUT /api/orderItems/:id
// updates an order item, usually because the quantity is updated in the cart.
router.put('/:id', async (req, res, next) => {
  try {
    const item = await OrderItem.findByPk(req.params.id);
    const newPizza = req.body;
    const newOrderItem = await item.update({
      name: newPizza.name,
      description: newPizza.description,
      price: newPizza.price,
      imageUrl: newPizza.imageUrl,
      quantity: newPizza.quantity,
    });
    res.send(newOrderItem);
  } catch (error) {
    next(error);
  }
});
