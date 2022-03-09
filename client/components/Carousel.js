/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const imageArr = [
  'https://pbs.twimg.com/media/Dwecl7tVsAUcmX4?format=jpg&name=medium',

  'https://pbs.twimg.com/media/EVQJm7sX0AAb6Y8?format=jpg&name=medium',

  'https://pbs.twimg.com/media/EIs2eGhXUAAtCxs?format=jpg&name=4096x4096',

  'https://pbs.twimg.com/media/DuzMghQV4AAmzcI?format=jpg&name=medium',

  'https://pbs.twimg.com/media/E-e5UGXUUAsR3qm?format=jpg&name=large',

  'https://pbs.twimg.com/media/Dd31sGEUwAEzaD9?format=jpg&name=large',

  'https://pbs.twimg.com/media/DhMFj_wWsAAJ0fs?format=jpg&name=4096x4096',

  'https://pbs.twimg.com/media/DEnl9TLVwAAmWq5?format=jpg&name=medium',

  'https://pbs.twimg.com/media/Dyj0omQUUAASJCN?format=jpg&name=large',

  'https://pbs.twimg.com/media/FM82sB-XIAYiOJz?format=jpg&name=medium',

  'https://pbs.twimg.com/media/Cgl86ZVXEAAJaO9?format=jpg&name=medium',
];

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
      <Carousel fade controls={false} pause={false}>
        {imageArr.map((pizza, i) => {
          return (
            <Carousel.Item
              interval={2000}
              className="carosuelImage"
              key={i}
            >
              <img className="carouselslide" src={pizza} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselSlide;
