import {CATEGORY__FETCH, CATEGORY__CREATE, CATEGORY__DELETE, CATEGORY__UPDATE} from "../actions/categories";

export default function (state = {}, action) {
    let newState = state;

    switch (action.type) {
        case CATEGORY__FETCH:
                return _.keyBy(action.payload, 'id');
            break;
        case CATEGORY__CREATE:
                return [...state, action.payload];
            break;
        case CATEGORY__DELETE:
            var deletedId = action.payload;
            return newState.filter((data) => {
                return (data.id != deletedId);
            });
            break;
        case CATEGORY__UPDATE:
            var updatedActor = action.payload;
            newState.filter((data) => {
                return (data.id != updatedActor.id);
            });
            return [...newState, action.payload];
            break;
        default:
            return state;
    }
}
