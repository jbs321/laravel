export const RETAILER__FETCH = 'retailer__fetch'
export const RETAILER__CREATE = 'retailer__create'
export const RETAILER__DELETE = 'retailer__delete'
export const RETAILER__UPDATE = 'retailer__update'

export function fetchRetailer () {
    const request = axios.get('/api/retailer')

    return {
        type: RETAILER__FETCH,
        payload: request
    }
}

export function createRetailer (data) {
    let fd = new FormData()
    fd.append('name', data.name)
    const request = axios.post('/api/retailer', fd)

    return {
        type: RETAILER__CREATE,
        payload: request
    }
}

export function deleteRetailer (data) {
    axios.post('/api/retailer/delete/' + data.id)

    return {
        type: RETAILER__DELETE,
        payload: data.id
    }
}

export function updateRetailer (data) {
    const { id } = data
    const request = axios.put(`/api/retailer/${id}`, data)

    return {
        type: RETAILER__UPDATE,
        payload: request
    }
}
