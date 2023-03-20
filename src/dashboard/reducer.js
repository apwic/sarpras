import { SET_CALENDAR, OPEN_MODAL, CLOSE_MODAL } from './actionTypes';

const initialState = {
    calendarRef: null,
    calendarModalOpen: false,
    selectedDate: null,
};

function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CALENDAR:
            return { ...state, calendarRef: action.calendarRef };
        case OPEN_MODAL:
            return {
                ...state,
                calendarModalOpen: true,
                selectedDate: action.selectedDate,
            };
        case CLOSE_MODAL:
            return { ...state, calendarModalOpen: false, selectedDate: null };
        default:
            return state;
    }
}

export default dashboardReducer;
