import { dispatchHelper } from 'actions/action-helpers'

export const TRANSACTION__FETCH = 'transaction__fetch'
export const TRANSACTION__CREATE = 'transaction__create'
export const TRANSACTION__DELETE = 'transaction__delete'
export const TRANSACTION__UPDATE = 'transaction__update'
export const TRANSACTIONS__UPDATE_RETAILER = 'transactions__update_retailer'

export function fetchTransaction () {
    return dispatchHelper(axios.get('/api/transaction'), TRANSACTION__FETCH)
}

export function createTransaction (data) {
    return dispatchHelper(axios.post(`/api/transaction`, data), TRANSACTION__CREATE)
}

export function deleteTransaction (oldData) {
    return dispatchHelper(axios.post(`/api/transaction/delete/${oldData.id}`), TRANSACTION__DELETE)
}

export function updateTransaction (data) {
    return dispatchHelper(axios.put(`/api/transaction/${data.id}`, data), TRANSACTION__UPDATE)
}

export function updateTransactionRetailer (retailer, selectedRows) {
    return dispatchHelper(axios.put(`/api/transactions/retailer/${retailer.id}`, {retailer: retailer, transactions: selectedRows}), TRANSACTIONS__UPDATE_RETAILER)
}
