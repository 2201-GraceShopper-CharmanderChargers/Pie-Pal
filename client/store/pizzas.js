import axios from 'axios';

// ACTION TYPES
const SET_PIZZAS = 'SET_PIZZAS';
const DELETE_PIZZA = 'DELETE_PIZZA';

// ACTION CREATORS
export const setPizzas = (pizzas) => {
  return {
    type: SET_PIZZAS,
    pizzas,
  };
};
export const deletePizzaAction = (pizza) => {
  return {
    type: DELETE_PIZZA,
    pizza,
  };
};

// THUNKS

export const fetchPizzas = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/pizzas');
      dispatch(setPizzas(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deletePizza = (id) => {
  return async (dispatch) => {
    const { data } = await axios.delete(`/api/pizzas/${id}`);
    console.log('delete', data);
    dispatch(deletePizzaAction(data));
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function pizzasReducer(pizzas = [], action) {
  switch (action.type) {
    case SET_PIZZAS: {
      return action.pizzas;
    }
    case DELETE_PIZZA: {
      return pizzas.filter((pizza) => {
        return pizza.id !== action.pizza.id;
      });
    }
    default:
      return pizzas;
  }
}
