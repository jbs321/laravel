import {TRANSACTION__FETCH} from "../actions/transactions";

export default function (state = [], action) {
    let newState = state;

    switch (action.type) {
        case TRANSACTION__FETCH:
            if (action.payload.data) {
                return action.payload.data;
            }
            break;
        default:
            return state;
    }
}
