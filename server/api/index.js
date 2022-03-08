const router = require('express').Router();

//only use user for now
router.use('/users', require('./user'));
router.use('/pizzas', require('./pizzas'));
router.use('/orderItems', require('./orderItems'));
router.use('/orders', require('./orders'));




router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;