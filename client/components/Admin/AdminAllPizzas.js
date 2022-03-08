/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import FilterPizzas from '../FilterPizzas';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePizza } from '../../store/pizzas';
import history from '../../history';

const AdminAllPizzas = () => {
  const dispatch = useDispatch();
  const [pizzas, setPizzas] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

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

  const handleDelete = (pizza) => {
    dispatch(deletePizza(pizza.id));
  };

  const pizzaCities = Array.from(
    new Set(
      pizzas.map((el) => {
        return el.cityOfPizza;
      })
    )
  );
  const pizzasToShow = pizzas.filter((pizza) => {
    if (typeFilter && typeFilter !== 'All') {
      return pizza.cityOfPizza === typeFilter;
    }
    return true;
  });
  return (
    <div>
      <FilterPizzas pizzaCities={pizzaCities} setSelected={setTypeFilter} />
      <div className="allpizzas">
        {pizzasToShow.map((pizza) => {
          return (
            <div key={pizza.id} className="pizzacard">
              <Card style={{ width: '20rem' }} className="pizzacard-object">
                <Link to={`/adminPizzas/${pizza.id}`}>
                  <Card.Img
                    variant="top"
                    src={pizza.imageUrl}
                    className="my-image"
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{pizza.name}</Card.Title>
                  <Card.Text className="cardtext">
                    {pizza.description}
                  </Card.Text>
                  <Card.Text>{pizza.price}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(handleDelete(pizza));
                    }}
                  >
                    X
                  </Button>
                  <Link to={`/adminPizzas/${pizza.id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminAllPizzas;
