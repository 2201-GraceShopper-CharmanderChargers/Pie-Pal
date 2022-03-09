/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as NavBar } from './NavBar';
// export { default as UserHome } from './Admin/UserPage';
// export { Login, Signup } from './auth-form'

import { Login, Signup } from './Auth';
import AllPizzas from './AllPizzas';
import OnePizza from './OnePizza';
import Cart from './Cart';
import HomePage from './HomePage';
import CheckoutSuccess from './CheckoutSuccess';
import CheckoutFailure from './CheckoutFailure';
import Checkout from './Checkout';
import PageNotFound from './PageNotFound';

// import LoginForm from './LoginForm';
// import SignUpForm from './SignUpForm';

export {
  Login,
  Signup,
  AllPizzas,
  OnePizza,
  Cart,
  HomePage,
  Checkout,
  CheckoutSuccess,
  CheckoutFailure,
  PageNotFound,
};
