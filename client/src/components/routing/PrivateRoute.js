import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: {isAuthenticated, loading},
  ...rest
}) => (
  <Route
    {...rest} // Any props that was set before (i.e. exact path="...")
    render={(
      routeProps // Same route props
    ) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...routeProps} /> // The component that was passed ina
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
