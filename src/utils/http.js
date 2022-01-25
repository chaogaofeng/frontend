import axios from "axios";
import { Message } from "element-ui";
import router from "@/router";
let http = axios.create({
  baseURL: "http://8.211.163.33:2022",
  // baseURL: "",
  timeout: 10000,
});

http.interceptors.request.use(
  (config) => {
    if (localStorage.token) {
      config.headers.token = localStorage.token;
    }
    return config;
  },
  (err) => {
    console.error("请求失败", err);
  }
);

http.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      switch (response.data.code) {
        case 0:
          return response.data;
        case 1003:
          Message("请重新登录");
          localStorage.clear();
          router.push({ name: "login" });
          break;
        default:
          return response.data;
      }
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      return Promise.reject(error.response);
    }
  }
);
export default http;
