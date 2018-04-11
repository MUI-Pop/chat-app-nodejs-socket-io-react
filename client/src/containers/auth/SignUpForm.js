//React related imports
import React, { Component } from 'react';

//React-Redux imports
import { connect } from 'react-redux';

//Component Imports
import Button from '../../components/UI/Button';
import InputBox from '../../components/UI/InputBox';
import Label from '../../components/UI/Label';

//Redux Action import
import * as signUp from '../../store/actions/signup';

class SignUpForm extends Component {

    state = {
        firstName: {
            value: '',
            touched: false
        },
        lastName: {
            value: '',
            touched: false
        },
        email: {
            value: '',
            touched: false
        },
        Login: {
            loginId: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
        },
    }

    onFieldChange = (fieldName, e) => {
        e.preventDefault();
        switch (fieldName) {

            case 'firstName':
                this.setState({
                    ...this.state,
                    ...this.state.Login,
                    firstName: {
                        ...this.state.firstName,
                        value: e.target.value,
                        touched: true
                    }
                });
                break;

            case 'lastName':
                this.setState({
                    ...this.state,
                    ...this.state.Login,
                    lastName: {
                        ...this.state.lastName,
                        value: e.target.value,
                        touched: true
                    }
                });
                break;

            case 'email':
                this.setState({
                    ...this.state,
                    ...this.state.Login,
                    email: {
                        ...this.state.email,
                        value: e.target.value,
                        touched: true
                    }
                });
                break;

            case 'loginId':
                let login_loginId = {
                    ...this.state.Login,
                    loginId: {
                        ...this.state.Login.loginId,
                        value: e.target.value,
                        touched: true
                    },
                    password: {
                        ...this.state.Login.password,
                    }
                };
                this.setState({
                    ...this.state,
                    Login: login_loginId
                });
                break;

            case 'password':
                let login_password = {
                    ...this.state.Login,
                    password: {
                        ...this.state.Login.password,
                        value: e.target.value,
                        touched: true
                    },
                    loginId: {
                        ...this.state.Login.loginId,
                    }
                };
                this.setState({
                    ...this.state,
                    Login: login_password
                });
                break;
        }
    }

    signUp = (e) => {
        e.preventDefault();
        this.props.signUp(this.state.firstName.value, this.state.lastName.value, this.state.email.value, this.state.Login.loginId.value, this.state.Login.password.value);
    }

    render = () => {

        return (
            <div className="signup-form">
                <form onSubmit={this.signUp} >
                    <Label>Firstname</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your FirstName"
                        value={this.state.firstName.value}
                        onChange={(e) => this.onFieldChange('firstName', e)}
                    />
                    {(this.state.firstName.value === '' && this.state.firstName.touched) ?
                        <div>
                            <b>
                                <font color="red">Firstname is required</font>
                            </b>
                        </div>
                        :
                        null}
                    <Label>Lastname</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your LastName"
                        value={this.state.lastName.value}
                        onChange={(e) => this.onFieldChange('lastName', e)}
                    />
                    {(this.state.lastName.value === '' && this.state.lastName.touched) ?
                        <div>
                            <b>
                                <font color="red">Lastname is required</font>
                            </b>
                        </div>
                        :
                        null}
                    <Label>Email</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your Email"
                        value={this.state.email.value}
                        onChange={(e) => this.onFieldChange('email', e)}
                    />
                    {(this.state.email.value === '' && this.state.email.touched) ?
                        <div>
                            <b>
                                <font color="red">Email is required</font>
                            </b>
                        </div>
                        :
                        null}
                    <Label>Username</Label>
                    <InputBox
                        type="textbox"
                        placeholder="Enter your Username"
                        value={this.state.Login.loginId.value}
                        onChange={(e) => this.onFieldChange('loginId', e)}
                    />
                    {(this.state.Login.loginId.value === '' && this.state.Login.loginId.touched) ?
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
                        placeholder="Enter your Password"
                        value={this.state.Login.password.value}
                        onChange={(e) => this.onFieldChange('password', e)}
                    />
                    {(this.state.Login.password.value === '' && this.state.Login.password.touched) ?
                        <div>
                            <b>
                                <font color="red">Password is required</font>
                            </b>
                        </div>
                        :
                        null}
                    <Button>Get Started</Button>
                    {this.props.error ?
                        <div>
                            <b>
                                <font color="red">{this.props.error}</font>
                            </b>
                        </div>
                        :
                        null}
                </form>
            </div>
        )
    }
}

const stateToProps = state => {
    return {
        loading: state.signUp.loading,
        error: state.signUp.error,
        isSuccess: state.signUp.success !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signUp: (firstName, lastName, email, loginId, password) => dispatch(signUp.signUp(firstName, lastName, email, loginId, password))
    }
}

export default connect(stateToProps, mapDispatchToProps)(SignUpForm);