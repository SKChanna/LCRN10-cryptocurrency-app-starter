import axios from 'axios';
import {BASE_URL} from './apis';
import {Toast} from "react-native-toast-message/lib/src/Toast";

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
    if (!response.data || response.data.hasError) {
      console.error(response);
      showError({error: '', message: response.data.responseMessage});
      return false;
    }
    return response.data;
  } catch (error) {
    const {config, data} = error.response;
    console.error("Error", {
      request: {
        baseURL: config.baseURL,
        url: config.url,
        data: config.data,
        headers: config.headers,
        method: config.method
      },
      data: {
        error: data.error,
        message: data.message,
        status: data.status
      }
    });
    showError(data);
    return false;
  }
};

const showError = ({ error, message }) => {
  Toast.show({
    type: 'error',
    text1: 'Server Error 😢',
    text2: 'click for details.',
    position: 'bottom',
    onPress: () => Toast.show({
      type: 'error',
      text1: error,
      text2: message,
      position: 'bottom',
      onPress: () => Toast.hide()
    })
  });
};

export default request;
