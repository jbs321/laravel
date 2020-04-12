import { RETAILER__FETCH, RETAILER__CREATE, RETAILER__DELETE, RETAILER__UPDATE } from 'actions/retailers'

export default function (state = {}, { type, payload }) {
    let newState = { ...state }

    switch (type) {
        case RETAILER__FETCH:
            newState = _.keyBy(payload, 'id');
            return newState

        case RETAILER__CREATE:
            return { payload, ...state }

        case RETAILER__DELETE:
            //payload -> deleted retailer id
            newState = _.omit(newState, [payload])
            return newState

        case RETAILER__UPDATE:
            newState = { ...state }
            const { id, name, categories } = payload
            newState[id].name = name
            newState[id].categories = categories
            return newState

        default:
            return state
    }
}
