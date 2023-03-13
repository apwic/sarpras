import { CLOSE_MODAL_FILTER_VEHICLE, OPEN_MODAL_FILTER_VEHICLE } from "./actionTypes";

const initialState = {
    filterVehicleModalOpen: false,
};

function vehicleReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_MODAL_FILTER_VEHICLE:
            return { ...state, filterVehicleModalOpen: true};
        case CLOSE_MODAL_FILTER_VEHICLE:
            return { ...state, filterVehicleModalOpen: false};
        default:
            return state;
    }
}

export default vehicleReducer;