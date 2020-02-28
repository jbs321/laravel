export const TRANSACTION__FETCH = 'transaction__fetch'
export const TRANSACTION__CREATE = 'transaction__create'
export const TRANSACTION__DELETE = 'transaction__delete'
export const TRANSACTION__UPDATE = 'transaction__update'

export function fetchTransaction () {
    const request = axios.get('/api/transaction')

    return {
        type: TRANSACTION__FETCH, payload: request
    }
}

export function updateTransaction (data) {
    let fd = new FormData()
    fd.append('id', data.id)
    fd.append('retailer_id', data.retailer_id)
    fd.append('account_type', data.account_type)
    fd.append('description_1', data.description_1)
    fd.append('description_2', data.description_2 ?? '')
    fd.append('cad', data.cad)
    fd.append('usd', data.usd ?? '')
    fd.append('account_type', data.account_type)
    fd.append('transaction_date', data.transaction_date)

    const request = axios.post('/api/transaction/' + data.id, fd)

    return {
        type: TRANSACTION__UPDATE,
        payload: request
    }
}
