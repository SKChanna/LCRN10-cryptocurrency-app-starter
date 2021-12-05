import axios from 'axios';
import {BASE_URL} from './apis';

const request = async (method, url, data = {}, isMultiPart) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzOTIzNzMwMn0.R40uoz_KKh3vGD1n-lc5gxLynb1-KxMREfNSu1a_vUU',
    },
  });
  try {
    let response = null;
    if (!isMultiPart) {
      response = await axiosInstance.request({
        url,
        method,
        data,
      });
    } else {
      response = await fetch(BASE_URL + url, data);
    }
    console.log(`${url}`, data);
    // if (response.data && response.data.data.hasError)
    return response.data;
  } catch (error) {
    console.log(`${url} Failed`, error);
    return false;
  }
};
export default request;
