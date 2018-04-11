import * as ACTIONTYPES from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null,
    isAuthenticated: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case ACTIONTYPES.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case ACTIONTYPES.AUTH_INIT:
            return {
                ...state,
                loading: true
            }

        case ACTIONTYPES.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true
            }

        case ACTIONTYPES.AUTH_EXPIRED:
            return {
                ...state,
                isAuthenticated: false
            }
            
        default:
            return state;
    }
}

export default reducer;