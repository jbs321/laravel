export const TRANSACTION__FETCH = "transaction__fetch";
export const TRANSACTION__CREATE = "transaction__create";
export const TRANSACTION__DELETE = "transaction__delete";
export const TRANSACTION__UPDATE = "transaction__update";

export function fetchTransaction () {
    const request = axios.get("/api/transaction");

    return {
        type: TRANSACTION__FETCH,
        payload: request
    }
}
