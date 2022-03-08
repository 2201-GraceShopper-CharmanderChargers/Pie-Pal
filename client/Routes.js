/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { me } from './store';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import {
  Login,
  Signup,
  AllPizzas,
  SinglePizza,
  Cart,
  UserHome,
  HomePage,
  Checkout,
  CheckoutSuccess,
  CheckoutFailure,
  AdminPage,
  AdminAllPizzas,
  AdminSinglePizzaEdit,
  PageNotFound
=======
>>>>>>> 3515ab5a46c41c05789701a4cec53cea88d2ecf7
} from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={UserHome} />
            <Route exact path="/userhome" component={UserHome} />
            <Route exact path="/pizzas" component={AllPizzas} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/checkoutsuccess" component={CheckoutSuccess} />
            <Route
              exact
              path="/checkoutfailure"
              render={(props) => <CheckoutFailure {...props} />}
            />
            <Route exact path="/:pizzaId" component={SinglePizza} />
            {/* <Route exact path="/*" component={notFoundpage} /> */}
            <Redirect to="/userhome" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/pizzas" component={AllPizzas} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/:pizzaId" component={SinglePizza} />
            {/* <Route path="/*" component={notFoundpage} /> */}
            <Redirect to="/home" />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.user.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
