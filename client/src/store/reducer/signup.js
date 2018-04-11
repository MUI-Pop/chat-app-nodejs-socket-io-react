import * as ACTIONTYPES from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    success: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTIONTYPES.SIGNUP_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case ACTIONTYPES.SIGNUP_INIT:
            return {
                ...state,
                loading: true
            }

        case ACTIONTYPES.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }

        default:
            return state;
    }
}

export default reducer;