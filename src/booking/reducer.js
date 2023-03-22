import {
    CLOSE_MODAL_FILTER,
    OPEN_MODAL_FILTER,
    SET_FACILITIES,
} from './actionTypes';

const initialState = {
    filterModalOpen: false,
    facilities: [],
};

function facilityReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FACILITIES:
            return { ...state, facilities: action.payload };
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true };
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false };
        default:
            return state;
    }
}

export default facilityReducer;
