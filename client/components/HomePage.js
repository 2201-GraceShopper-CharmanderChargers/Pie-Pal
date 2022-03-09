/* eslint-disable no-unused-vars */
import React from 'react';
import CarouselSlide from './Carousel';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
  }
  componentDidMount() {
    this.loading = false;
  }
  render() {
    const {isLoggedIn} = this.props
    console.log(isLoggedIn)
    return (
      <div>
        <div>
          <CarouselSlide />
          {isLoggedIn ? (
            <div className="userpagecontent">
            <h3 className="homeheader">Welcome Back!</h3>
            <h3 id="starthere">
              See what we have this week <i class="arrow right"></i>
            </h3>
            </div>

          ) : (
            <div>
             <div className="hometext">
            <h3 className="homeheader">Welcome to Pie Pal!</h3>
            <hr />
            <h5 className="aboutus">
              Pizza has no rules and how you get it should be no different. Here
              at Pie Pal we offer the opportunity to try pizza from anywhere in
              the country! With our state of the art package and delivery
              system, we can have your pizza delivered fresh, just as if it was
              out of the oven. With hundreds of pizzeras that have joined this
              network from around the states, you have a wide variety of options
              to choose from.
            </h5>
          </div>
          <div>
            <h3 id="starthere">
              Start Here <i class="arrow right"></i>
            </h3>
            </div> 
            </div>        
            )}
         

            <div className="icon">
              <Link to="/pizzas">
                <div className="pizza-container">
                  <div className="pizza" id="hvr-sink">
                    <div className="basil">
                      <div className="leaf"></div>
                    </div>
                    <div className="onions"></div>
                    <div className="olives"></div>
                    <div className="pepperonis"></div>
                    <div className="slices">
                      <div className="slice slice-1"></div>
                      <div className="slice slice-2"></div>
                      <div className="slice slice-3"></div>
                      <div className="slice slice-4"></div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        
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



// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState)(HomePage);


