import { CLOSE_MODAL_FILTER, OPEN_MODAL_FILTER } from "./actionTypes";

const initialState = {
    filterModalOpen: false,
};

function bookingFacilityReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true};
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false};
        default:
            return state;
    }
}

export default bookingFacilityReducer;