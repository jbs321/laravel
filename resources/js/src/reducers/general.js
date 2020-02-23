import {LOADING_ON, LOADING_OFF} from "actions/general";

export default function (state = {isLoading: false}, action) {
    switch (action.type) {
        case LOADING_ON:
            return {isLoading: true};
        case LOADING_OFF:
            return {isLoading: false};
            break;
        default:
            return state;
    }
}
