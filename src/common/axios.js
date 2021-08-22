import axios from "axios";
import { message } from "antd";

const service = axios.create({
  timeout: 60000,
});

service.interceptors.request.use(
  (config) => {
    if (window.localStorage.getItem("token")) {
      config.headers["Authorization"] = `Bearer ${window.localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      message.error("认证失败，请重新登录");
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
