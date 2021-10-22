import axios from "axios";
//可以使用自定义配置新建一个 axios 实例
const service = axios.create({
    //基本的url //cnpm i axios –S
    baseURL: " http://neko37.picp.net",
    // baseURL: " http://192.168.69.216:2333",
    //请求的超时时间
    timeout: 10000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // if (config.url.endsWith("login")) {
    //     return config;
    // }
    // if (sessionStorage.getItem("mytoken") && !config.headers.Authorization) {
    //     config.headers.Authorization = `${sessionStorage.getItem("mytoken")}`
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    return response.data;//data写在这里以后使用就不用每次都写
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

//暴露
export default service