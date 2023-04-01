import { OPEN_MODAL_FILTER, CLOSE_MODAL_FILTER } from './actionTypes';

const initialState = {
    myReports: [],
};

function myReportReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_FILTER:
            return { ...state, filterModalOpen: true };
        case CLOSE_MODAL_FILTER:
            return { ...state, filterModalOpen: false };
        default:
            return state;
    }
}

export default myReportReducer;
