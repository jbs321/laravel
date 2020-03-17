import {IMPORT__IMPORT_FILE} from "../actions/import";

export default function (state = {}, action) {
    switch (action.type) {
        case IMPORT__IMPORT_FILE:
                return action.payload;
            break;

        default:
            return state;
    }
}
