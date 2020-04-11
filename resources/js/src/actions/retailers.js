import { dispatchHelper } from './action-helpers'

export const RETAILER__FETCH = 'retailer__fetch'
export const RETAILER__CREATE = 'retailer__create'
export const RETAILER__DELETE = 'retailer__delete'
export const RETAILER__UPDATE = 'retailer__update'
export const RETAILER__CATEGORY_UPDATE = 'retailer__category_update'

export function fetchRetailer () {
    return dispatchHelper(axios.get('/api/retailer'), RETAILER__FETCH)
}

export function createRetailer (data) {
    const fd = new FormData()
    fd.append('name', data.name)
    return dispatchHelper(axios.post('/api/retailer', fd), RETAILER__CREATE)
}

export function deleteRetailer (data) {
    return dispatchHelper(axios.post('/api/retailer/delete/' + data.id), RETAILER__DELETE)
}

export function updateRetailer (data) {
    const { id } = data
    return dispatchHelper(axios.put(`/api/retailer/${id}`, data), RETAILER__UPDATE)
}

export function updateRetailersWithCategoryId (categoryId, data = [], cb) {
    const request = axios.post(`/api/retailers/category/${categoryId}`, {retailers: data});

    //callback on success
    request.then(() => cb());

    return dispatchHelper(request, RETAILER__CATEGORY_UPDATE)
}
