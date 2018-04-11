import React, { Component } from 'react';

//React-Redux imports
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

function ProtectedRouteHOC(ProtectedRoute) {

    class ValidatedAuth extends Component {

        render = () => {
            if (this.props.isAuth) {
                return (<ProtectedRoute {...this.props} />)
            } else {
                return (<Redirect to={{
                    pathname: '/auth',
                    state: { from: this.props.location }
                }
                } />)
            }
        }
    }
    
    const stateToProps = state => {
        return {
            isAuth: state.authentication.isAuthenticated,
        }
    }
    
    return connect(stateToProps)(ValidatedAuth);
}

export default ProtectedRouteHOC;