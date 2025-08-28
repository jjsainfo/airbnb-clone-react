import axios from "axios";
import axiosRetry from "axios-retry";
import  Logger  from "../lib/logger";


const API_BASE_URL = 'https://91c48a924bb9.ngrok-free.app'

export const apiclient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
    },
   
});

axiosRetry(apiclient, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
        return error.response?.status === 503 || error.response?.status === 504;
    },
});


apiclient.interceptors.request.use(
    (config) => {
        const myLogger = new Logger();
        myLogger.log(`Request made to ${config.url} with method ${config.method}`);
        return config;
    }
    
);


apiclient.interceptors.request.use(
    (response) => response ,
    (error) => {
        //alert("Request error: " + error.message);
        const myLogger = new Logger();
        myLogger.log(`Request error: ${error.message}`);
        myLogger.error(`Request error: ${error.message}`);
        myLogger.info(`Request error: ${error.message}`);
        return Promise.reject(error);
    }
);

apiclient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
    
);


apiclient.interceptors.response.use(
    (response) => response,
    (error) => {
        //alert("Response error: " + error.message);
        if(error.response.status === 401) {
            localStorage.removeItem('access_token');
            refreshToken();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);  