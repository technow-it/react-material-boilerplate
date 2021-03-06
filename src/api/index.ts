import axios from "axios";
axios.defaults.baseURL = "http://localhost:10000/api";

export const responseErrorCheck = (res: any) => {
  if (res.status > 199 || res.status < 300) {
    return res.data;
  }
  console.log("responseErrorCheck");

  throw new Error(res.status.toString());
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },

  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let errorMessage = "";
    const errorBody = error.response.data;
    if (Array.isArray(errorBody)) {
      errorBody.forEach((error) => {
        if (error.msg) errorMessage += error.msg + " " + error.param;
      });
    } else {
      errorMessage += errorBody.clientMessage ?? errorBody.systemMessage;
    }

    return Promise.reject(errorMessage);
  }
);
