/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { fetchPizza } from '../store/singlePizza';
import { addCart } from '../store/cart';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

class SinglePizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.loading = true;
    this.inCart = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target.name === 'quantity') {
      this.setState({ quantity: Number(event.target.value) });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addCart(this.state);
    this.inCart = true;
    this.setState({
      ...this.props.pizza,
      quantity: 1,
    });
  }

  componentDidMount() {
    this.loading = false;
    this.props.fetchPizza(this.props.match.params.pizzaId);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.pizza !== this.props.pizza ||
      prevProps.cart !== this.props.cart
    ) {
      this.setState({
        ...this.props.pizza,
        quantity: 1,
      });
    }
  }

  render() {
    const pizza = this.props.pizza;

    return this.loading ? (
      <div>
        <form className="single-pizza" onSubmit={this.handleSubmit}>
          <div className="container">
            <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/78c484d8-34a9-40ec-aa54-50ae46cf3855/dekxp8p-c823eeeb-c7a5-4a0d-a106-5819b3729268.jpg/v1/fill/w_1131,h_707,q_70,strp/pizza___charmander_by_sajiro158_dekxp8p-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODAwIiwicGF0aCI6IlwvZlwvNzhjNDg0ZDgtMzRhOS00MGVjLWFhNTQtNTBhZTQ2Y2YzODU1XC9kZWt4cDhwLWM4MjNlZWViLWM3YTUtNGEwZC1hMTA2LTU4MTliMzcyOTI2OC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.jBrr1gsuBzvZr1fvFBvDWl-ZMCIQtu6N_pJioMp0e34" />
            <h1>Charmander Probably ate the Pizza you were looking for</h1>
          </div>
        </form>
      </div>
    ) : !this.inCart ? (
        <form className="single-pizza" onSubmit={this.handleSubmit}>
          <div className="singleImg">
            <img src={pizza.imageUrl} />
          </div>
          <div id="singleContent">
            <h1>{pizza.name}</h1>
            <h3>{pizza.description}</h3>
            <h4>${pizza.price}</h4>
          </div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <div className="nav-buttons">
            <Link to="/pizzas">
              <button type="button">Back</button>
            </Link>
            <input type="submit" value="Add to Cart" />
          </div>
        </form>
    ) : (
      <Cart />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pizza: state.pizza,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPizza: (id) => dispatch(fetchPizza(id)),
    addCart: (pizza) => dispatch(addCart(pizza)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePizza);
