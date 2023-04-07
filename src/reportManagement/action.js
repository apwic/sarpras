import {
    GET_REPORTS,
    SET_REPORTS,
    GET_REPORT,
    SET_REPORT,
    EDIT_REPORT,
    EDIT_REPORT_RESPONSE,
} from './actionTypes';

export function getReports(page, limit, query, filters) {
    return {
        type: GET_REPORTS,
        payload: {
            page,
            limit,
            query,
            filters,
        },
    };
}

export function setReports(data) {
    return {
        type: SET_REPORTS,
        payload: data,
    };
}

export function getReport(id) {
    return {
        type: GET_REPORT,
        payload: id,
    };
}

export function setReport(data) {
    return {
        type: SET_REPORT,
        payload: data,
    };
}

export function editReport(id, data) {
    return {
        type: EDIT_REPORT,
        payload: {
            id,
            data,
        },
    };
}

export function editReportResponse(data) {
    return {
        type: EDIT_REPORT_RESPONSE,
        payload: data,
    };
}
