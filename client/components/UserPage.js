/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import EditUserPage from './EditUserPage';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import AdminPage from './Admin/AdminPage';
import { getCart } from '../store/cart';
import axios from 'axios';

import { Link } from 'react-router-dom';

export const UserHome = (props) => {
  const { email, isAdmin } = props;
  const dispatch = useDispatch();
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    async function loadCart() {
      try {
        const { data: cart } = await axios.get(
          `/api/orderItems?userId=${props.user.id}`
        );
        dispatch(getCart(cart));
      } catch (error) {
        console.error("Failed to retrieve the user's cart", error);
      }
    }
    loadCart();
  }, []);

  return isAdmin ? (
    <AdminPage />
  ) : (
    <div>
      <Card className="text-center" style={{}}>
        <Card.Body>
          <Card.Title>Welcome, </Card.Title>
          <Card.Text>your email is {email}</Card.Text>
          <Button type="button" variant="primary">
            Check Your History
          </Button>
          <Button onClick={() => setOpenEdit(!openEdit)}>
            Click me to edit this user
          </Button>
        </Card.Body>
        {openEdit === true ? <EditUserPage /> : null}
      </Card>
    </div>
  );
};

const mapState = (state) => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getCart: (userId) => dispatch(getCart(userId)),
  };
};

export default connect(mapState, mapDispatch)(UserHome);

UserHome.propTypes = {
  // firstName: PropTypes.string,
  email: PropTypes.string,
  user: PropTypes.object,
};
