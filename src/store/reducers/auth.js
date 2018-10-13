import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../utility";


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state) => {
    return updateObject(state, {loading: true, error: null});
};

const authFail = (state, action) => {
    return updateObject(state, {loading: false, error: action.error});
};

const authSuccess = (state, action) => {
    return updateObject(state,
        {
            token: action.idToken,
            userId: action.userId,
            loading: false,
            error: null
        });
};

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null,
        error: null,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state);
        default:
            return state;
    }
};

export default reducer;