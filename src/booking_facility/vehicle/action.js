import { OPEN_MODAL_FILTER_VEHICLE, CLOSE_MODAL_FILTER_VEHICLE } from "./actionTypes";

export function openModalFilterVehicle() {
    return {
        type: OPEN_MODAL_FILTER_VEHICLE,
    };
}

export function closeModalFilterVehicle() {
    return {
        type: CLOSE_MODAL_FILTER_VEHICLE,
    };
}