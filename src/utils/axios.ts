import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    responseType: "json",
    withCredentials: true
});

// Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response.status === 401) {
            // unauthorized
            // logout();
        }
        if (error.response.status === 500) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

export default instance;