/* eslint-disable no-unused-vars */
const pizzaRouter = require('express').Router();
const Pizza = require('../db/models/Pizza');
const Order = require('../db/models/Order');


pizzaRouter.get('/', async (req, res, next) => {
  try {
    const allPizzas = await Pizza.findAll();
    res.send(allPizzas);
  } catch (error) {
    console.error(error);
  }
});

pizzaRouter.get('/:pizzaId', async (req, res, next) => {
  try {
    const pizza = await Pizza.findOne({
      where: {
        id: req.params.pizzaId,
      },
    });
    res.json(pizza);
  } catch (error) {
    console.error(error);
  }
});

pizzaRouter.delete('/:pizzaId', async (req, res, next) => {
  try {
    const pizza = await Pizza.findByPk(req.params.pizzaId);
    await pizza.destroy();
    res.json(pizza);
  } catch (error) {
    console.error('this pizza wont die', error);
  }
});

pizzaRouter.put('/:pizzaId', async (req,res,next) => {
  try {
    const pizza = await Pizza.findByPk(req.params.pizzaId);
    await pizza.update({...req.body.pizza})
    res.joson(pizza)
  } catch (error) {
    console.error(error)
  }
})

module.exports = pizzaRouter;
