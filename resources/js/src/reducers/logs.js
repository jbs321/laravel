import {LOG__FETCH_ANNUAL_SUMMARY} from "actions/logs";

export default function (state = {headers: [], data: []}, action) {
    switch (action.type) {
        case LOG__FETCH_ANNUAL_SUMMARY:
            if (action.payload.data) {
                return action.payload.data;
            }

            break;

        default:
            return state;
    }
}
