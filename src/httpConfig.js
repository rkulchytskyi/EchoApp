import axios from 'axios';
import CONFIG from './config';

const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'de'
};

const request = axios.create({
    baseURL: CONFIG.apiBaseUrl,
    headers
});

export default request