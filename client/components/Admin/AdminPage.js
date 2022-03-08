import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../store/users';
import { deletePizza } from '../../store/pizzas';
import AdminAllPizzas from './AdminAllPizzas';

class AdminPage extends React.Component {
  render() {
    return (
      <div>
        <AdminAllPizzas />
      </div>
    );
  }
}

export default AdminPage;
