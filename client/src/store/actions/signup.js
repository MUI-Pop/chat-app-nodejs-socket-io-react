import axios from 'axios';
import * as ACTIONTYPES from './actionTypes';
import * as CONFIG from '../../utils/config';

const CLIENT_ID = CONFIG.CLIENT_ID;
const CLIENT_SECRET = CONFIG.CLIENT_SECRET;
const GRANT_TYPE = CONFIG.GRANT_TYPE;

const signUpStart = () => {
    return {
        type: ACTIONTYPES.SIGNUP_INIT,
    }
}

const signUpFailed = (error) => {
    return {
        type: ACTIONTYPES.SIGNUP_FAILED,
        error
    }
}

const signUpSuccess = () => {
    return {
        type: ACTIONTYPES.SIGNUP_SUCCESS
    }
}

export const signUp = (firstName, lastName, email, loginId, password) => {

    const signUpObj = {
        firstName,
        lastName,
        email,
        Login: {
            loginId,
            password
        }
    };

    return (dispatch) => {
        dispatch(signUpStart());

        axios.post(`/api/profiles`, signUpObj)
            .then(response => {
                dispatch(signUpSuccess());
            }).catch(e => {
                console.log(e);
                dispatch(signUpFailed(e.response.data.errors[0].message));
            })
    }
}

