import { dispatchHelper } from 'actions/action-helpers'

export const TRANSACTION__FETCH = "transaction__fetch";
export const TRANSACTION__CREATE = "transaction__create";
export const TRANSACTION__DELETE = "transaction__delete";
export const TRANSACTION__UPDATE = "transaction__update";

export function fetchTransaction () {
    return dispatchHelper(axios.get("/api/transaction"), TRANSACTION__FETCH)
}
