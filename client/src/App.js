//React Import
import React, { Component } from 'react';

//CSS import
import './App.css';

import { Route, Switch, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import AuthLayout from './containers/auth/AuthLayout';
import HomePage from './containers/HomePage';
import ProtectedRouteHOC from './containers/hoc/ProtectedRoute';

import * as authenticationActions from './store/actions/authentication';

import * as ACTIONTYPES from './store/actions/actionTypes';

class App extends Component {

  componentWillMount = () => {
    if (authenticationActions.isTokenAvailable() && authenticationActions.isTokenExpired()) {
      this.props.setAuthenticated();
    }
  }

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Switch>
          <Route exact path="/auth" component={AuthLayout} />
          <Route exact path="/" component={ProtectedRouteHOC(HomePage)} />
        </Switch>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setAuthenticated: () => dispatch({
        type: ACTIONTYPES.AUTH_SUCCESS
      })
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
