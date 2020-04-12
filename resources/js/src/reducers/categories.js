import { CATEGORY__FETCH, CATEGORY__CREATE, CATEGORY__DELETE, CATEGORY__UPDATE } from 'actions/categories'

export default function (state = {}, { type, payload }) {
    let newState = state

    switch (type) {
        case CATEGORY__FETCH:
            newState = _.keyBy(payload, 'id');
            return newState

        case CATEGORY__CREATE:
            newState = _.keyBy({ ...state, payload }, 'id')
            return newState

        case CATEGORY__DELETE:
            newState = _.omit(newState, [payload])
            return newState

        case CATEGORY__UPDATE:
            newState[payload.id].name = payload.name;
            return newState

        default:
            return state
    }
}
