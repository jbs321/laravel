export const LOADING_SPINNER = "loading_spinner";

export const dispatchHelper = (request, type) => {
    return function (dispatch) {
        dispatch(spinner())

        return request
            .then(({ data }) => {
                dispatch(spinner(false))
                return dispatch(onSuccess(type, data))
            })
            .catch((error) => {
                dispatch(spinner(false))
                return dispatch(onError(error))
            })
    }
}

export function onSuccess (type, data) {
    return { type: type, payload: data }
}

export const onError = (error) => {
    console.log(error)
}

export function spinner(turnOn = true) {
    return {
        type: LOADING_SPINNER,
        payload: turnOn,
    }
}
