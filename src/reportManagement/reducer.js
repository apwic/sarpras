import { SET_REPORTS, SET_REPORT } from './actionTypes';

const initialState = {
    reports: [],
    report: {},
};

function reportManagementReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REPORTS:
            return { ...state, reports: action.payload };
        case SET_REPORT:
            return { ...state, report: action.payload };
        default:
            return state;
    }
}

export default reportManagementReducer;
