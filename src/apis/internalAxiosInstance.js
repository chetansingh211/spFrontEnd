import axios from 'axios';
import { apiConfig } from '../globals/config';

const internalAxiosInstance = axios.create({
	baseURL: apiConfig.apiUrl,
	timeout: 250000
});

internalAxiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
export default internalAxiosInstance;