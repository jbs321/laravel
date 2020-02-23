import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import logsReducer from 'reducers/logs';
import importReducer from 'reducers/import';
import categoryReducer from 'reducers/categories';
import retailerReducer from 'reducers/retailers';
import transactionReducer from 'reducers/transactions';
import generalReducer from 'reducers/general';

const rootReducer = combineReducers({
    form: formReducer,
    logs: logsReducer,
    import: importReducer,
    categories: categoryReducer,
    retailers: retailerReducer,
    transaction: transactionReducer,
    general: generalReducer,
});

export default rootReducer;
