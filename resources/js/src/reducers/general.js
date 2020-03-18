import { LOADING_SPINNER } from 'actions/action-helpers'

export default function (state = {spinner: false}, action) {
    switch (action.type) {
        case LOADING_SPINNER:
            return {
                spinner: action.payload
            };
        default:
            return state;
    }
}
