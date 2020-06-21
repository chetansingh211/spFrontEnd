import internalAxiosInstance from './internalAxiosInstance';
import { responseHandler, errorHandler } from '../utils/utility';

export function getConfigurations() {
    return internalAxiosInstance.get('/v2/configurations')
        .then(response => {
            return responseHandler(response);
        })
        .catch(err => {
            return errorHandler(err)
        });
}

export function createMerchantOrder(data) {
    return internalAxiosInstance.post('/v2/orders', data)
        .then(response => {
            return responseHandler(response);
        })
        .catch(err => {
            return errorHandler(err)
        });
}