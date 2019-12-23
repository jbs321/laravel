import {CATEGORY__FETCH, CATEGORY__CREATE, CATEGORY__DELETE, CATEGORY__UPDATE} from "../actions/categories";

export default function (state = [], action) {
    let newState = state;

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
            var deletedId = action.payload;
            return newState.filter((data) => {
                return (data.id != deletedId);
            });
            break;
        case CATEGORY__UPDATE:
            var updatedActor = action.payload.data;
            newState.filter((data) => {
                return (data.id != updatedActor.id);
            });
            return [...newState, action.payload.data];
            break;
        default:
            return state;
    }
}
