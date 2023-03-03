import { OPEN_MODAL_SU, CLOSE_MODAL_SU, SET_ALL_ASSIGNED_STAFF, REVOKE_ROLE, SET_ALL_UNSIGNED_STAFF, SET_STAFF_TO_ROLE } from "./actionTypes";

const initialState = {
    superUserModalOpen: false,
    selectedRole: null,
    allAssignedStaff: [],
    allUnsignedStaff: [],
};

function supeUserReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_SU:
            return { ...state, superUserModalOpen: true, selectedRole: action.selectedRole};
        case CLOSE_MODAL_SU:
            return { ...state, superUserModalOpen: false, selectedRole: null};
        case SET_ALL_ASSIGNED_STAFF:
            return { ...state, allAssignedStaff: action.payload};
        case REVOKE_ROLE:
            return { ...state, allAssignedStaff: state.allAssignedStaff.filter((staff) => staff.id !== action.payload)};
        case SET_ALL_UNSIGNED_STAFF:
            return { ...state, allUnsignedStaff: action.payload};
        default:
            return state;
    }
}

export default supeUserReducer;