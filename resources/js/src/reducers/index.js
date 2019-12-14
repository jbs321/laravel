import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import logsReducer from 'reducers/logs';
import importReducer from 'reducers/Import';

const rootReducer = combineReducers({
    form: formReducer,
    logs: logsReducer,
    import: importReducer,
    // isAuth: authReducer,
    // login: loginReducer
});

export default rootReducer;
