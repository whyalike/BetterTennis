import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Alert from './components/layouts/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
// Redux
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import {loadUser} from './actions/auth';

if (localStorage.token) {
  // Check the first time user loads
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []); // only run once (onMount and unMount)

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
