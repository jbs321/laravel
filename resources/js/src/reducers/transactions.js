import {
    TRANSACTION__CREATE,
    TRANSACTION__DELETE,
    TRANSACTION__FETCH,
    TRANSACTION__UPDATE,
    TRANSACTIONS__UPDATE_RETAILER
} from 'actions/transactions'

export default function (state = {}, {type, payload}) {
    let newState = { ...state }

    switch (type) {
        case TRANSACTION__FETCH:
        case TRANSACTIONS__UPDATE_RETAILER:
            return _.keyBy(payload, 'id')

        case TRANSACTION__DELETE:
            newState = _.omit(newState, [payload])
            return newState

        case TRANSACTION__UPDATE:
            newState[payload.id] = payload;
            return newState

        case TRANSACTION__CREATE:
            newState[payload.id] = payload;
            return newState
        default:
            return state
    }
}
