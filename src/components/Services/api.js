import axios from "axios";

const BASE_URL = "http://localhost:8080/data/";
export const AXIOS_INSTANCE_WITHOUT_HEADERS = axios.create();
export const AXIOS_INSTANCE_API = axios.create();

AXIOS_INSTANCE_WITHOUT_HEADERS.interceptors.request.use(
  async (config) => {
    let request = config;
    request.baseURL = BASE_URL;
    request.url = config.url;
    return request;
  },
  (error) => error
);
