import {
    GET_MYREPORTS,
    SET_MYREPORTS,
    GET_MYREPORT_CLICKED,
    SET_MYREPORT_CLICKED,
    SET_TOTAL_REPORTS,
    OPEN_MODAL_FILTER,
    CLOSE_MODAL_FILTER,
    POST_REPORT,
    POST_REPORT_SUCCESS,
} from './actionTypes';

export function getMyReports(page, limit, query, filters) {
    return {
        type: GET_MYREPORTS,
        payload: {
            page,
            limit,
            query,
            filters,
        },
    };
}

export function setMyReports(data) {
    return {
        type: SET_MYREPORTS,
        payload: data,
    };
}

export function getMyReportClicked(payload) {
    return {
        type: GET_MYREPORT_CLICKED,
        payload: payload,
    };
}

export function setMyReportClicked(data) {
    return {
        type: SET_MYREPORT_CLICKED,
        payload: data,
    };
}

export function setTotalReports(data) {
    return {
        type: SET_TOTAL_REPORTS,
        payload: data,
    };
}

export function openModalFilter() {
    return {
        type: OPEN_MODAL_FILTER,
    };
}

export function closeModalFilter() {
    return {
        type: CLOSE_MODAL_FILTER,
    };
}

export function postReport(data) {
    return {
        type: POST_REPORT,
        payload: data,
    };
}

export function postReportSuccess(message) {
    return {
        type: POST_REPORT_SUCCESS,
        payload: message,
    };
}
