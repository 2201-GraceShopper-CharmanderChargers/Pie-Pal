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
    return (
      <div>
        <div>
          <CarouselSlide />
          <div className="hometext">
            <h3 className="homeheader">Pizza is not just food</h3>
            <h5>
              Welcome to Pie Pal! where we believe in the power of pizza. For
              many, pizza is not just food but a way of life. ... more
              description ... more description .. more description
            </h5>
          </div>
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

export default HomePage;
