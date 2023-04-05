import {
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    POST_REPORT_SUCCESS,
} from './actionTypes';

const initialState = {
    myReports: [],
    messagePostReport: '',
};

function myReportReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true };
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false };
        case POST_REPORT_SUCCESS:
            return { ...state, messagePostReport: action.payload };
        default:
            return state;
    }
}

export default myReportReducer;
