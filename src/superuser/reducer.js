import { OPEN_MODAL_SU, CLOSE_MODAL_SU, GET_ALL_ASSIGNED_STAFF } from "./actionTypes";

const initialState = {
    superUserModalOpen: false,
    selectedRole: null,
    allAssignedStaff: []
};

function supeUserReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_SU:
            return { ...state, superUserModalOpen: true, selectedRole: action.selectedRole};
        case CLOSE_MODAL_SU:
            return { ...state, superUserModalOpen: false, selectedRole: null};
        case GET_ALL_ASSIGNED_STAFF:
            return { ...state, allAssignedStaff: action.payload};
        default:
            return state;
    }
}

export default supeUserReducer;