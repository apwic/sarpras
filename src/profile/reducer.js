import { OPEN_MODAL, CLOSE_MODAL } from "./actionTypes";

const initialState = {
    modalOpen: false,
    img: null,
};

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, modalOpen: true, img: action.payload };
        case CLOSE_MODAL:
            return { ...state, modalOpen: false, img: null };
        default:
            return state;
    }
}

export default profileReducer;