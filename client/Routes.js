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
  AdminPage,
  AdminAllPizzas,
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
          isAdmin ? (
            <Switch>
              <Route exact path="/" component={AdminPage} />
              <Route exact path="/adminHome" component={AdminPage} />
              <Route exact path="/adminPizzas" component={AdminAllPizzas} />
              <Redirect to="/adminHome" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={UserHome} />
              <Route exact path="/userhome" component={UserHome} />
              <Route exact path="/pizzas" component={AllPizzas} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/checkout" component={Checkout} />
              <Route
                exact
                path="/checkoutsuccess"
                component={CheckoutSuccess}
              />
              <Route exact path="/:pizzaId" component={SinglePizza} />
              {/* <Route exact path="/*" component={notFoundpage} /> */}
              <Redirect to="/userhome" />
            </Switch>
          )
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

      // <Switch>
      //   {/* Routes placed here are available to all visitors */}

      //   {isLoggedIn && (
      //     <Switch>
      //       {/* Routes placed here are only available after logging in */}
      //       <Route path="/home" component={UserHome} />
      //     </Switch>
      //   )}
      //   {/* Displays our Login component as a fallback */}
      //   <Route component={Login} />
      // </Switch>
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


// import React from 'react';
// import { connect } from 'react-redux';
// import { Login, Signup } from './components/Auth';
// import { me } from './store';
// import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
// import HomePage from './components/HomePage';

// class Routes extends React.Component {
//   componentDidMount() {
//     this.props.loadInitialData();
//   }
//   render() {
//     const { isLoggedIn } = this.props;
//     return (
//       <div>
//         {isLoggedIn ? (
//           <Switch>
//             <Route path="/home" component={HomePage} />
//             <Redirect to="/home" />
//           </Switch>
//         ) : (
//           <Switch>
//             <Route path="/" exact component={Login} />
//             <Route path="/login" component={Login} />
//             <Route path="/signup" component={Signup} />
//           </Switch>
//         )}
//       </div>
//     );
//   }
// }