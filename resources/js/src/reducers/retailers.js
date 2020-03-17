import {RETAILER__FETCH, RETAILER__CREATE, RETAILER__DELETE, RETAILER__UPDATE} from 'actions/retailers';

export default function (state = [], action) {
    let newState = state;

    switch (action.type) {
        case RETAILER__FETCH:
                return action.payload;
            break;
        case RETAILER__CREATE:
                return [...state, action.payload];
            break;
        case RETAILER__DELETE:
            var deletedId = action.payload;
            return newState.filter((data) => {
                return (data.id != deletedId);
            });
            break;
        case RETAILER__UPDATE:
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
