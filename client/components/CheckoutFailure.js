import React from 'react';

const CheckoutFailure = (props) => {
  const outOfStock = props.location.state.outOfStock;
  return (
    <div>
      <h1>Uh Oh, some of these items are out of stock:</h1>
      <ul>
        {outOfStock.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <img
        className="NotFoundImg"
        src="https://pbs.twimg.com/media/DfiSJlpU0AABI53.jpg"
      />
    </div>
  );
};

export default CheckoutFailure;
