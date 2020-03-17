import {LOG__FETCH_ANNUAL_SUMMARY} from "actions/logs";

export default function (state = {headers: [], data: []}, action) {
    switch (action.type) {
        case LOG__FETCH_ANNUAL_SUMMARY:
            return action.payload
            break;

        default:
            return state;
    }
}
