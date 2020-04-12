import { dispatchHelper } from './action-helpers'

export const RETAILER__FETCH = 'retailer__fetch'
export const RETAILER__CREATE = 'retailer__create'
export const RETAILER__DELETE = 'retailer__delete'
export const RETAILER__UPDATE = 'retailer__update'
export const RETAILER__CATEGORY_UPDATE = 'retailer__category_update'
export const RETAILER__BULK_DELETE = 'retailer__bulk_delete'

export function fetchRetailer () {
    return dispatchHelper(axios.get('/api/retailer'), RETAILER__FETCH)
}

export function createRetailer (data) {
    return dispatchHelper(axios.post('/api/retailer', { name: data.name }), RETAILER__CREATE)
}

export function deleteRetailer (data) {
    return dispatchHelper(axios.post('/api/retailer/delete/' + data.id), RETAILER__DELETE)
}

export function updateRetailer (data) {
    return dispatchHelper(axios.put(`/api/retailer/${data.id}`, data), RETAILER__UPDATE)
}

export function updateRetailersWithCategoryId (categoryId, data = []) {
    return dispatchHelper(axios.post(`/api/retailers/category/${categoryId}`, { retailers: data }), RETAILER__CATEGORY_UPDATE)
}

export function deleteRetailers (data = []) {
    return dispatchHelper(axios.post(`/api/retailers/delete`, { retailers: data }), RETAILER__BULK_DELETE)
}
