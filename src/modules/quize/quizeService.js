import { useContext } from "react";
import env from "../../../env";
import Toast from 'react-native-simple-toast';
import ApiClient, { setToken } from "../../utils/apiClient";
import { AuthContext } from "../navigation/controller/AuthContext";


export async function getQuizeData(params) {
  try {
    const response = await ApiClient.get(`${env.QUIZE_URL}`, {
      params: {
        ...params
      },
    });

    return response.data;
  } catch (error) {
    console.error('getUsers - Error: ', error);
    throw error;
  }
}

export async function getLoginData({ email, password }) {
  console.log('getLoginData', `${env.API_URL}/auth/login`);
  //const body = JSON.stringify({email, password})
  try {
    const response = await ApiClient.post(`${env.API_URL}/auth/login`, {
      email,
      password
    });
    //console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("response error", error.response.data);
      throw error.response.data
    } else {
      throw error;
    }
    //console.error('Login - Error: ', error);

  }
}

export async function getRegisterData(req) {
  
  try {
    const response = await ApiClient.post(`${env.API_URL}/auth/register`, req);
    //console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("response error", error.response.data);
      throw error.response.data
    } else {
      throw error;
    }
    //console.error('Login - Error: ', error);

  }
}

export async function getOTPData(req) {
  
  try {
    const response = await ApiClient.post(`${env.API_URL}/auth/verify-otp`, req);
    //console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("response error", error.response.data);
      throw error.response.data
    } else {
      throw error;
    }
    //console.error('Login - Error: ', error);

  }
}
export async function postScore(data, token) {
  //console.log('getLoginData', `${env.API_URL}/report`, data);

  const tok = token.token ? token.token : JSON.parse(token).token;
 // console.log('tok$$$$$$$$$$$$', token, tok, JSON.parse(token).token);
  try {
    const response = await ApiClient.post(`${env.API_URL}/report`,
      data,
      {
        headers: {
          Authorization: `Bearer ${tok}`
        }
      });
    //console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("response error", error.response.authorization, error.request._headers.authorization);
      throw error.response.data
    } else {
      throw error;
    }
    //console.error('Login - Error: ', error);

  }
}

export async function getLeaderBoardData(data,token) {
  const tok = token.token ? token.token : JSON.parse(token).token;
  console.log('leader api data', `${env.API_URL}/report/${data}`)
  try {
    const response = await ApiClient.get(`${env.API_URL}/report/${data}`, {
       
      headers: {
          Authorization: `Bearer ${tok}`
        }
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("response error", error.response.status, error.request._headers.authorization);
      if(error.response.status===401){
        throw error.response
      }
    } else {
      throw error;
    }
    //console.error('Login - Error: ', error);

  }
}

export async function forgotPassword({ email, password }) {
 // console.log('getLoginData', `${env.API_URL}/auth/login`);
  //const body = JSON.stringify({email, password})
  try {
    const response = await ApiClient.post(`${env.API_URL}/auth/forgot-password`, {
      email,
      password
    });
    //console.log('response.data', response.data)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("response error", error.response.data);
      throw error.response.data
    } else {
      throw error;
    }
    //console.error('Login - Error: ', error);

  }
}