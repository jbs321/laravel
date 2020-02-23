export const LOADING_ON = "loading_on";
export const LOADING_OFF = "loading_off";

export function setLoadingOn() {
    return {
        type: LOADING_ON,
    }
}

export function setLoadingOff() {
    return {
        type: LOADING_OFF,
    }
}
