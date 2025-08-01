import axios from 'axios';


export const dev_user_api = axios.create({
    baseURL:import.meta.env.VITE_DEV_USER_API,
    withCredentials:true
})

dev_user_api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response && error.response?.status === 401 && !originalRequest._retry){
           originalRequest._retry = true;
           try {
               const retryResponse = await dev_user_api(originalRequest);
               return retryResponse;
           } catch (retryError) {
               window.location.href = '/login';
               return Promise.reject(retryError);
           }
        }
        return Promise.reject(error)
    }
)


export const dev_admin_api = axios.create({
    baseURL:import.meta.env.VITE_DEV_ADMIN_API,
    withCredentials:true
}) 

dev_admin_api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401  && !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const retryResponse =  await dev_admin_api(originalRequest)
                return retryResponse;
            } catch (retryError) {
                localStorage.removeItem('admin')
                window.location.href = '/admin/login'
                return Promise.reject(retryError);
            }
        };

        return Promise.reject(error)
    }
)