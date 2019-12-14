import {IMPORT__IMPORT_FILE} from "../actions/import";

export default function (state = {}, action) {
    switch (action.type) {
        case IMPORT__IMPORT_FILE:
            if (action.payload.data) {
                return action.payload.data;
            }
            break;

        default:
            return state;
    }
}
