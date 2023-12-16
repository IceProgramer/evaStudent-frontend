import axios, {AxiosInstance} from 'axios';

const myAxios: AxiosInstance = axios.create({
    baseURL: "http://localhost:8088",
    withCredentials: true,
});

myAxios.defaults.withCredentials = true;

/**
 * 拦截器
 */
// add a request interceptor
myAxios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);

});
declare module 'axios' {
    export interface AxiosResponse<T = any> extends Promise<T> {}
}
// add a response interceptor
myAxios.interceptors.response.use(function (response) {
    // 未登录跳转到登陆页
    if (response?.data?.code === 40100) {
        window.location.href = '/login';
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});


export default myAxios;
