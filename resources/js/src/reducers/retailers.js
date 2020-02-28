import {RETAILER__FETCH, RETAILER__CREATE, RETAILER__DELETE, RETAILER__UPDATE} from 'actions/retailers';

export default function (state = {}, action) {
    let newState = state;

    switch (action.type) {
        case RETAILER__FETCH:
            if (action.payload.data) {
                return action.payload.data;
            }
            break;
        case RETAILER__CREATE:
            if (action.payload.data) {
                return [...state, action.payload.data];
            }
            break;
        case RETAILER__DELETE:
            var deletedId = action.payload;
            return newState.filter((data) => {
                return (data.id != deletedId);
            });
            break;
        case RETAILER__UPDATE:
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
