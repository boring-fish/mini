import axios from './rest.axios';
import { AxiosRequestConfig } from 'axios';

export class HttpRequest {
   Post(
    url,
    body,
    params,
    headers,
    noLoading= false,
  ){
    return this.request(
      {
        method: 'POST',
        url: url,
        data: body,
        params: params,
        headers: headers,
      },
      {
        noLoading: noLoading
      }
    );
  }

  Get(
    url,
    params,
    noLoading = false,
  ){
    return this.request(
      {
        method: 'GET',
        url: url,
        params: params,
      },
      {
        noLoading: noLoading
      }
    );
  }

  Put(
    url,
    // body,
    params,
    noLoading = false,
    cancelToken = null
  ){
    return this.request(
      {
        method: 'PUT',
        url: url,
        // data: body,
        params: params,
      },
      {
        noLoading: noLoading
      }
    );
  }

  Delete(
    url,
    params = null,
    noLoading = false,
  ){
    return this.request(
      {
        method: 'DELETE',
        url: url,
        params: params,
      },
      {
        noLoading: noLoading
      }
    );
  }

  // public buildUrlWithParams(url: any, params: any) {
  //   let paramItem = [];
  //   for (let key in params || {}) {
  //     if (params[key] instanceof Array) {
  //       for (let one of params[key]) {
  //         paramItem.push(
  //           `${encodeURIComponent(key.toString())}=${encodeURIComponent(one.toString())}`
  //         );
  //       }
  //     } else if (params[key] !== null && params[key] !== undefined) {
  //       paramItem.push(
  //         `${encodeURIComponent(key.toString())}=${encodeURIComponent(params[key].toString())}`
  //       );
  //     }
  //   }
  //   if (paramItem.length > 0) {
  //     return `${url}?${paramItem.join('&')}`;
  //   } else {
  //     return url;
  //   }
  // }

   request(
    config,
    options
    // options?: { noLoading?: boolean }
  ){
    config.headers = Object.assign(this.getHeaders(), config.headers);
    config = Object.assign(config, options);
    config.paramsSerializer = params => {
      let paramItem = [];
      for (let key in params || {}) {
        if (params[key] instanceof Array) {
          for (let one of params[key]) {
            paramItem.push(
              `${encodeURIComponent(key.toString())}=${encodeURIComponent(one.toString())}`
            );
          }
        } else if (params[key] !== null && params[key] !== undefined) {
          paramItem.push(
            `${encodeURIComponent(key.toString())}=${encodeURIComponent(
              params[key].toString()
            )}`
          );
        }
      }
      return paramItem.join('&');
    };

    return axios.request(config).then(rsp => {
      return rsp.data;
    });
  }

   getHeaders() {
    return {
      // 'Content-Type': 'application/json;charset=UTF-8',
      // 'Access-Control-Allow-Origin':'*'
    };
  }
}
