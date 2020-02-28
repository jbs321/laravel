import { TRANSACTION__FETCH, TRANSACTION__UPDATE } from '../actions/transactions'

export default function (state = {}, action) {
    switch (action.type) {
        case TRANSACTION__FETCH:
            if (action.payload.data) {
                return _.keyBy(action.payload.data, 'id');
            }
            break
        case TRANSACTION__UPDATE:
            if (action.payload.data) {
                state[action.payload.data.id] = action.payload.data;
                return state
            }
            break
        default:
            return state
    }
}
