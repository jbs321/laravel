import {CATEGORY__FETCH, CATEGORY__CREATE, CATEGORY__DELETE} from "../actions/categories";

export default function (state = [], action) {
    switch (action.type) {
        case CATEGORY__FETCH:
            if (action.payload.data) {
                return action.payload.data;
            }
            break;
        case CATEGORY__CREATE:
            if (action.payload.data) {
                return [...state, action.payload.data];
            }
            break;
        case CATEGORY__DELETE:
            let newState = state;
            // newState.filter((data) => {
            //     return (data.id != )
            // })
            break;
        default:
            return state;
    }
}
