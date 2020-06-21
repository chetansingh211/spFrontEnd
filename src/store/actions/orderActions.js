import * as ACTION_TYPES from '../ActionTypes';

//Orders 
export function getConfigurations() {
    return {
        type: ACTION_TYPES.FETCH_CONFIGURATIONS,
    };
}

export function getConfigurationsDone(data) {
    return {
        type: ACTION_TYPES.FETCH_CONFIGURATIONS_DONE,
        data
    };
}

export function getConfigurationsFailed(error) {
    return {
        type: ACTION_TYPES.FETCH_CONFIGURATIONS_FAILED,
        error
    };
}

export function setTotalAmount(value) {
    return {
        type: ACTION_TYPES.SET_TOTALAMOUNT,
        value
    };
}

export function setGivenName(value) {
    return {
        type: ACTION_TYPES.SET_GIVENNAME,
        value
    };
}

export function setSurName(value) {
    return {
        type: ACTION_TYPES.SET_SURNAME,
        value
    };
}

export function setEmail(value) {
    return {
        type: ACTION_TYPES.SET_EMAIL,
        value
    };
}

export function setRedirectConfirmUrl(value) {
    return {
        type: ACTION_TYPES.SET_REDIRECTCONFIRMURL,
        value
    };
}

export function setRedirectCancelUrl(value) {
    return {
        type: ACTION_TYPES.SET_REDIRECTCANCELMURL,
        value
    };
}


export function createOrder(data) {
    return {
        type: ACTION_TYPES.CREATE_ORDER,
        data,
    };
}


export function createOrderDone(data) {
    return {
        type: ACTION_TYPES.CREATE_ORDER_DONE,
        data
    };
}

export function createOrderFailed(error) {
    return {
        type: ACTION_TYPES.CREATE_ORDER_FAILED,
        error
    };
}