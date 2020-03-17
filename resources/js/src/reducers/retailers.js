import {RETAILER__FETCH, RETAILER__CREATE, RETAILER__DELETE, RETAILER__UPDATE} from 'actions/retailers';

export default function (state = {}, action) {
    switch (action.type) {
        case RETAILER__FETCH:
                return _.keyBy(action.payload, 'id');
            break;
        case RETAILER__CREATE:
                return [action.payload, ...state];
            break;
        case RETAILER__DELETE:
            var deletedId = action.payload;
            return state.filter((data) => {
                return (data.id != deletedId);
            });
            break;
        case RETAILER__UPDATE:
            const newState = _.assign({}, state);
            const {id, name, categories} = action.payload;
            newState[id].name = name;
            newState[id].categories = categories;
            return newState;
            break;
        default:
            return state;
    }
}
