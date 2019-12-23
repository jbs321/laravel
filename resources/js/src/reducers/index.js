import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import logsReducer from 'reducers/logs';
import importReducer from 'reducers/import';
import categoryReducer from 'reducers/categories';

const rootReducer = combineReducers({
    form: formReducer,
    logs: logsReducer,
    import: importReducer,
    categories: categoryReducer,
    // login: loginReducer
});

export default rootReducer;
