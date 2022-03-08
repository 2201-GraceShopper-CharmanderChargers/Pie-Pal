/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchPizza } from '../../store/singlePizza';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import { Row, Col, FloatingLabel, InputGroup } from 'react-bootstrap';
import axios from 'axios'

export const AdminSinglePizzaEdit = (props) => {
  console.log(props.match.params.id)
  const [pizza, setPizza] = useState({});
  const dispatch = useDispatch()

  useEffect(() => {
    async function getPizza(props) {
      try {
        const res = await axios.get(`/api/pizzas/${props.match.params.id}`);
        const info = res.data;
        console.log(info)
        setPizza(info);
      } catch (error) {
        console.log('there was a problem');
      }
    }
    getPizza();
  }, []);
 console.log('pizza', pizza)
  return (
    <div>
      <Form>
        <FloatingLabel column="lg" lg={5} label="pizza name">
          <FormControl
            name="pizza name"
            type="text"
            placeholder={pizza.name}
          />
        </FloatingLabel>
      </Form>
    </div>
  );
  }


// import { addCart } from '../store/cart';
// import Cart from './Cart';
// import { Link } from 'react-router-dom';

// class SinglePizza extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       quantity: 1,
//     };
//     this.loading = true;
//     this.inCart = false;
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     if (event.target.name === 'quantity') {
//       this.setState({ quantity: Number(event.target.value) });
//     } else {
//       this.setState({
//         [event.target.name]: event.target.value,
//       });
//     }
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     this.props.addCart(this.state);
//     this.inCart = true;
//     this.setState({
//       ...this.props.pizza,
//       quantity: 1,
//     });
//   }

//   componentDidMount() {
//     this.loading = false;
//     this.props.fetchPizza(this.props.match.params.pizzaId);
//   }

//   componentDidUpdate(prevProps) {
//     if (
//       prevProps.pizza !== this.props.pizza ||
//       prevProps.cart !== this.props.cart
//     ) {
//       this.setState({
//         ...this.props.pizza,
//         quantity: 1,
//       });
//     }
//   }

//   render() {
//     const pizza = this.props.pizza;

//     return this.loading ? (
//       <div>
//         <form className="single-pizza" onSubmit={this.handleSubmit}>
//           <div className="container">
//             <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png" />
//             <h1>Charmander Probably ate the Pizza you were looking for</h1>
//           </div>
//         </form>
//       </div>
//     ) : !this.inCart ? (
//       <form className="single-pizza" onSubmit={this.handleSubmit}>
//         <img src={pizza.imageUrl} />
//         <h1>{pizza.name}</h1>
//         <p>{pizza.description}</p>
//         <p>${pizza.price}</p>
//         <label htmlFor="quantity">Quantity: </label>
//         <input
//           type="number"
//           name="quantity"
//           min="1"
//           value={this.state.quantity}
//           onChange={this.handleChange}
//         />
//         <div className="nav-buttons">
//           <Link to="/pizzas">
//             <button type="button">Back</button>
//           </Link>
//           <input type="submit" value="Add to Cart" />
//         </div>
//       </form>
//     ) : (
//       <Cart />
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     pizza: state.pizza,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchPizza: (id) => dispatch(fetchPizza(id)),
//     addCart: (pizza) => dispatch(addCart(pizza)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SinglePizza);