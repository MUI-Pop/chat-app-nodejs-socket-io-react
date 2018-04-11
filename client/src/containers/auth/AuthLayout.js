//React related imports
import React, { Component } from 'react';

//Import Login and SignUp Forms
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

class AuthLayout extends Component {

    state = {
        isLoginActive: true
    }

    renderLoginOrSignUp = (e, btnName) => {
        if (btnName === 'login') {
            this.setState({
                ...this.state,
                isLoginActive: true
            })
        } else {
            this.setState({
                ...this.state,
                isLoginActive: false
            })
        }
    }

    render = () => {
        return (
            <div className="auth-layout">
                <ul className="tab-group">
                    <li className="tab"><a className={this.state.isLoginActive ? 'active' : ''} onClick={(e) => this.renderLoginOrSignUp(e, 'login')}>Log In</a></li>
                    <li className="tab"><a className={this.state.isLoginActive ? '' : 'active'} onClick={(e) => this.renderLoginOrSignUp(e, 'signup')}>Sign Up</a></li>
                </ul>
                {this.state.isLoginActive ? <LoginForm /> : <SignUpForm />}
            </div>
        )
    }
}

export default AuthLayout;