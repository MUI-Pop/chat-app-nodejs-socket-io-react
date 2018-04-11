import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Redux related imports
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

//Import Redux Stores
import authenticationReducer from './store/reducer/authentication';
import signUpReducer from './store/reducer/signup';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    signUp: signUpReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
