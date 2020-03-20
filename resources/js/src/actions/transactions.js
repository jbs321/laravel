import { dispatchHelper } from 'actions/action-helpers'
import qs from 'qs';

export const TRANSACTION__FETCH = "transaction__fetch";
export const TRANSACTION__CREATE = "transaction__create";
export const TRANSACTION__DELETE = "transaction__delete";
export const TRANSACTION__UPDATE = "transaction__update";

export function fetchTransaction () {
    return dispatchHelper(axios.get("/api/transaction"), TRANSACTION__FETCH)
}

export function updateTransaction (retailer, selectedRows, cb = undefined) {
    const data = new FormData();

    data.append('retailer', retailer);
    data.append('transactions[]', _.map(selectedRows, row => row.id));
    const request = axios.put("/api/transaction", qs.stringify({
        retailer: retailer,
        transactions: selectedRows
    }));

    request.then((response) => {
        if (_.isFunction(cb)) {
            cb()
        }
    });

    return dispatchHelper(request, TRANSACTION__UPDATE)
}
