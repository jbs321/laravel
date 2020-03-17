import {TRANSACTION__FETCH} from "actions/transactions";

export default function (state = [], action) {
    switch (action.type) {
        case TRANSACTION__FETCH:
                return action.payload;
            break;
        default:
            return state;
    }
}
