import axios from 'axios';
import {BASE_URL} from './apis';

const request = async (method, url, data = {}, isMultiPart) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzOTU3NDc1Mn0.didbfbMg7xwjz0Ni8zwXK9p6UT9PHEAuqtEiVg-fOpY',
    },
  });
  try {
    let response = null;
    console.log(`--------- Hitting Server -------`,`${url}`, data);
    if (!isMultiPart) {
      response = await axiosInstance.request({
        url,
        method,
        data,
      });
    } else {
      response = await fetch(BASE_URL + url, data);
    }
    // if (response.data && response.data.data.hasError)
    return response.data;
  } catch (error) {
    console.log(`${url} Failed`, error);
    return false;
  }
};
export default request;
