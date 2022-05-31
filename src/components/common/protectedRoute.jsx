import React from 'react';
import { Navigate } from 'react-router';
import auth from '../../services/authService';
import PropTypes from 'prop-types';
import { withRouter } from '../../utils/withRouter';

const ProtectedRoute = ({ component: Component, location }) => {
  const user = auth.getUser();
  return (
    <React.Fragment>
      {user ? <Component /> : <Navigate to="/login" replace={true} state={location.pathname} />} /
    </React.Fragment>
  );
};

export default withRouter(ProtectedRoute);

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
  location: PropTypes.object
};
