/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CarouselSlide = () => {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    async function getPizzas() {
      try {
        const res = await axios.get('/api/pizzas');
        const info = res.data;
        setPizzas(info);
      } catch (error) {
        console.log('there was a problem');
      }
    }
    getPizzas();
  }, []);

  // const {pizzas} = props
  return (
    <div className="carousel">
      <Carousel fade controls={false}>
        {pizzas.map((pizza) => {
          return (
            <Carousel.Item
              interval={1000}
              className="carosuelImage"
              key={pizza.id}
            >
              <img className="carouselslide" src={pizza.imageUrl} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselSlide;
