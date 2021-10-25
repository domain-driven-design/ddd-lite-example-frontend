import axios from "axios";
import {message} from "antd";

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

        let paths = window.location.pathname.split('/');
        if (paths.length > 3 && paths[1] === "groups") {
            config.headers["Group-Id"] = paths[2];
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response.status === 401) {
            message.error("认证失败，请重新登录");
        } else {
            message.error(error.response.data.message)
        }
        return Promise.reject(error);
    }
);

export default service;
