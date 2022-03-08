/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminPage = (props) => {
  const { user } = props;
  console.log(user);
  return (
    <div>
      <div>
        <h2> Welcome,</h2>
        <h5>
          Below will send you to the pages that allow for editing product
          content and user content
        </h5>
      </div>
      <Link to="/adminPizzas">
        <button type="button">Edit Pizzas</button>
      </Link>
    </div>
  );
};

// export default AdminPage;
const mapState = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapState)(AdminPage);

AdminPage.propTypes = {
  user: PropTypes.object,
};

// class AdminPage extends React.Component {
//   render() {
//     return (
//       <div>
//         <div>
//           Welcome
//         </div>
//         <Link to="/adminPizzas">
//           <button type='button'>Edit Pizzas</button>
//         </Link>
//       </div>
//     );
//   }
// }

// export default AdminPage;
