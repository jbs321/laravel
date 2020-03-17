export const dispatchHelper = (request, type) => {
    return function (dispatch) {
        return request
            .then(({data}) => dispatch(onSuccess(type, data)))
            .catch((error) => dispatch(onError(error)))
    }
}

export function onSuccess (type, data) {
    return { type: type, payload: data }
}

export const onError = (error) => {
    console.log(error)
}

