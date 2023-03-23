import {
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    SET_FACILITIES,
    SET_FACILITY_CLICKED,
} from './actionTypes';

const initialState = {
    filterModalOpen: false,
    facilities: [],
    facilityClicked: {},
};

function facilityReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FACILITIES:
            return { ...state, facilities: action.payload };
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true };
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false };
        case SET_FACILITY_CLICKED:
            return { ...state, facilityClicked: action.payload };
        default:
            return state;
    }
}

export default facilityReducer;
