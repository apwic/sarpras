import { OPEN_MODAL_SU, CLOSE_MODAL_SU, SET_ALL_ASSIGNED_STAFF, REVOKE_ROLE_SUCCESS, SET_ALL_UNSIGNED_STAFF, SET_STAFF_TO_ROLE_SUCCESS } from "./actionTypes";


const initialState = {
    superUserModalOpen: false,
    selectedRole: null,
    booking_staff: [],
    sanitation_staff: [],
    defect_staff: [],
    safety_staff: [],
    loss_staff: [],
    allUnsignedStaff: [],
};

function supeUserReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_SU:
            return { ...state, superUserModalOpen: true, selectedRole: action.selectedRole};
        case CLOSE_MODAL_SU:
            return { ...state, superUserModalOpen: false, selectedRole: null};
        case SET_ALL_ASSIGNED_STAFF:
            return { 
                ...state, booking_staff: action.payload.booking_staff,
                sanitation_staff: action.payload.sanitation_staff,
                defect_staff: action.payload.defect_staff, 
                safety_staff: action.payload.safety_staff, 
                loss_staff: action.payload.loss_staff
            };
        case REVOKE_ROLE_SUCCESS:
            const id_revoke = action.payload.id;
            const role_revoke = action.payload.role;
            const staff_revoke = state[role_revoke.toLowerCase()].find(staff => staff.id === parseInt(id_revoke));
            staff_revoke.role = "BASIC_USER";
            return { 
                ...state,
                [role_revoke.toLowerCase()] : state[role_revoke.toLowerCase()].filter(staff => staff.id !== parseInt(id_revoke)),
                allUnsignedStaff: [...state.allUnsignedStaff, staff_revoke],
            };
        case SET_STAFF_TO_ROLE_SUCCESS:
            const id_set = action.payload.id;
            const role_set = action.payload.role;
            const staff_set = state.allUnsignedStaff.find(staff => staff.id === parseInt(id_set));
            staff_set.role = role_set;
            return {
                ...state,
                allUnsignedStaff: state.allUnsignedStaff.filter(staff => staff.id !== parseInt(id_set)),
                [role_set.toLowerCase()] : [...state[role_set.toLowerCase()], staff_set],
            };
        case SET_ALL_UNSIGNED_STAFF:
            return { ...state, allUnsignedStaff: action.payload};
        default:
            return state;
    }
}

export default supeUserReducer;