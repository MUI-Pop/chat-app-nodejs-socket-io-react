//React related imports
import React, { Component } from 'react';

//React-Redux imports
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//Component Imports
import Button from '../../components/UI/Button';
import InputBox from '../../components/UI/InputBox';
import Label from '../../components/UI/Label';

import { Redirect } from 'react-router-dom';

//Redux Action import
import * as authentication from '../../store/actions/authentication';

class LoginForm extends Component {

    state = {
        username: {
            value: '',
            touched: false
        },
        password: {
            value: '',
            touched: false
        }
    }

    onUserNameChange = (e) => {
        let username = e.target.value;
        this.setState({
            ...this.state,            
            username: {
                ...this.state.username,
                value: username,
                touched: true
            }
        })
    }

    onPasswordChange = (e) => {
        let password = e.target.value;

        this.setState({
            ...this.state,            
            password: {
                ...this.state.password,
                value: password,
                touched: true
            }
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state.username.value, this.state.password.value);
    }

    render = () => {
        const redirectTo = this.props.location.state ? this.props.location.state.from : '/';

        return (
            <div className="login-form">
                {this.props.isAuth ? <Redirect to={redirectTo} /> :
                    <form onSubmit={this.submitLogin}>
                        <Label>Username</Label>
                        <InputBox
                            type="textbox"
                            placeholder="Enter your username"
                            value={this.state.username.value}
                            onChange={this.onUserNameChange}
                        />
                         {(this.state.username.value === '' && this.state.username.touched) ?
                            <div>
                                <b>
                                    <font color="red">Username is required</font>
                                </b>
                            </div>
                            :
                            null}
                        <Label>Password</Label>
                        <InputBox
                            type="password"
                            placeholder="Enter your password"
                            value={this.state.password.value}
                            onChange={this.onPasswordChange}
                        />
                          {(this.state.password.value === '' && this.state.password.touched) ?
                            <div>
                                <b>
                                    <font color="red">Password is required</font>
                                </b>
                            </div>
                            :
                            null}
                        <Button
                        >Enter</Button>
                        {this.props.error ?
                            <div>
                                <b>
                                    <font color="red">{this.props.error}</font>
                                </b>
                            </div>
                            :
                            null}
                    </form>
                }
            </div>
        );
    }

}

const stateToProps = state => {
    return {
        loading: state.authentication.loading,
        error: state.authentication.error,
        isAuth: state.authentication.isAuthenticated,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (username, password) => dispatch(authentication.authenticate(username, password))
    }
}

export default withRouter(connect(stateToProps, mapDispatchToProps)(LoginForm));