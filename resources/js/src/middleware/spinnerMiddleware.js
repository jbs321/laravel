import {setLoadingOff, setLoadingOn} from 'actions/general';

export const spinnerMiddleware = (store) => next => action => {
    if(action.payload instanceof Promise) {
        store.dispatch(setLoadingOn());

        action.payload
            .then(() => {
                next(store.dispatch(setLoadingOff()));
            }).catch((e) => {
                next(store.dispatch(setLoadingOff()));
        });
    }

    return next(action);
};
