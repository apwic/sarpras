import { SET_REPORTS, SET_REPORT, EDIT_REPORT_RESPONSE } from './actionTypes';

const initialState = {
    reports: [],
    report: {},
    edit_response: {},
};

function reportManagementReducer(state = initialState, action) {
    switch (action.type) {
        case SET_REPORTS:
            return { ...state, reports: action.payload };
        case SET_REPORT:
            return { ...state, report: action.payload };
        case EDIT_REPORT_RESPONSE:
            return { ...state, edit_response: action.payload };
        default:
            return state;
    }
}

export default reportManagementReducer;
