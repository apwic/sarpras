import { SET_USER } from "./actionTypes";

const initialState = {
    user: null,
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export default authReducer;