import {RETAILER__FETCH, RETAILER__CREATE, RETAILER__DELETE, RETAILER__UPDATE} from 'actions/retailers';

export default function (state = {}, action) {
    let newState = state;

    switch (action.type) {
        case RETAILER__FETCH:
                return _.keyBy(action.payload.data, 'id');

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
            const {id, name, category} = action.payload.data;
            return updateRetailerState(state, id, name, category);
            break;
        default:
            return state;
    }
}


const updateRetailerState = (state, id, name, category) => {
    const newState = _.assign({}, state);
    newState[id].name = name;
    newState[id].category = category;
    return newState;
}
