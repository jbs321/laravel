export const CATEGORY__FETCH = "category__fetch";
export const CATEGORY__CREATE = "category__create";
export const CATEGORY__DELETE = "category__delete";

export function fetchCategories () {
    const request = axios.get("/api/category");

    return {
        type: CATEGORY__FETCH,
        payload: request
    }
}

export function createCategory(data) {
    let fd = new FormData();
    fd.append("name", data.name);
    const request = axios.post("/api/category", fd);

    return {
        type: CATEGORY__CREATE,
        payload: request
    }
}

export function deleteCategory(data) {
    let fd = new FormData();
    fd.append("id", data.id);
    const request = axios.post("/api/category/delete/{category_id}", fd);

    return {
        type: CATEGORY__DELETE,
        payload: request
    }
}
