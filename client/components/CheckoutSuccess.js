/* eslint-disable no-unused-vars */
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

const CheckoutSuccess = (props) => {
  const handleClick = () => {
    props.history.push('/pizzas');
  };

  const randomNum = () => {
    var val = Math.floor(100000 + Math.random() * 9000);
    return val;
  };

  return (
    <div className = "checkoutSuccess" >

    <Card className="text-center">
      <Card.Body>
        <img
        id="babypic"
        src="https://pbs.twimg.com/media/DXYvb89VwAIn7tH?format=jpg&name=4096x4096"
        alt="tank you"
      />
        <Card.Text>
        <h1>Order confirmed</h1>
        <h2>Your Pizzas are on the way!</h2>
        <h3>Your order number is {randomNum()}</h3>
        </Card.Text>
          <Button variant="primary" onClick={handleClick}>
          Get more pizzas
        </Button>
      </Card.Body>
    </Card>



    </div>
  );
};

export default CheckoutSuccess;
