import axios from "axios";
import store from "../store";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  //   baseURL: 'https://wechatadmin.clcn.net.cn', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    console.log("store", store);

    config.headers = {
      ...config.headers,
      openId: store.state.openId,
    };
    // console.log('--------------->', config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
