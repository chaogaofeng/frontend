import http from "@utils/http";

http.defaults.timeout = 500000;
http.defaults.withCredentials = true;
http.defaults.baseURL =
  process.env.NODE_ENV == "development"
    ? process.env.VUE_APP_DEV_BASE_URL
    : process.env.VUE_APP_PRO_BASE_URL;


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}) {  
  return new Promise((resolve, reject) => {
    http
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response && response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}, config) {
  return new Promise((resolve, reject) => {
    http({
      url,
      method: "post",
      data,
      config,
    }).then(
      (response) => resolve(response.data),
      (err) => reject(err)
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    http.patch(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    http.put(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
