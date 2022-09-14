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

    if(config.method === 'get'){
      config.params = {
        ...config.params,
        openId: store.state.openId
      }
    }else{
      config.data = {
        ...config.data,
        openId: store.state.openId
      }
    }
    console.log("store", config);

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
