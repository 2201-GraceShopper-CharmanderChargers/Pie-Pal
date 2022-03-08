/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as NavBar } from './NavBar';
export { default as UserHome } from './UserPage';
// export { Login, Signup } from './auth-form'

import { Login, Signup } from './Auth';
import AllPizzas from './AllPizzas';
import SinglePizza from './SinglePizza';
import Cart from './Cart';
import HomePage from './HomePage';
import CheckoutSuccess from './CheckoutSuccess';
import Checkout from './Checkout';
import AdminPage from './Admin/AdminPage';
import AdminAllPizzas from './Admin/AdminAllPizzas';
import UserPage from './UserPage';
import { AdminSinglePizzaEdit } from './Admin/AdminSinglePizza';

// import LoginForm from './LoginForm';
// import SignUpForm from './SignUpForm';

export {
  Login,
  Signup,
  AllPizzas,
  SinglePizza,
  Cart,
  HomePage,
  Checkout,
  CheckoutSuccess,
  AdminPage,
  AdminAllPizzas,
  UserPage,
  AdminSinglePizzaEdit,
};
