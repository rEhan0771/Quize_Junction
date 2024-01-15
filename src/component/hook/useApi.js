import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
// import Toast from 'react-native-simple-toast';
import { AuthContext } from '../../modules/navigation/controller/AuthContext';
//import { onOpenToast } from '@utils/toast';
import { forgotPassword, getLeaderBoardData, getLoginData, getOTPData, getQuizeData, getRegisterData, postScore } from '../../modules/quize/quizeService';
  
  function useQuize( params ) {
    //console.log('1', params)
    return useQuery(['quize'], () => getQuizeData(params), {
    //   enabled: false,
    });
  }
  
  function useLogin() {
    const { authContext } = React.useContext(AuthContext);
    const { signIn } = authContext;
    console.log('signIn', signIn);
    return useMutation(['login'], ({ email, password }) => getLoginData({ email, password }), {
      onSuccess: (data) => {
        // Toast.show(
        //   'success',
        // );
        signIn(data.data)
      },
      onError: (data) => {
       // console.log("onErr", data)
        toast.show(
          'user name or password is incorrect'
        );
      },
    });
  }

  function useScore() {
    const { getToken , authContext  } = React.useContext(AuthContext);
    const { updateData } = authContext;
    const update = {...getToken};
    //console.log('getToken>>>>>>>>>>>>>>', getToken)
    return useMutation(['score'], (data) => postScore(data, getToken), {
      onSuccess: (data) => {
        toast.show(
          'success',
        );
        if(update?.total_quize && !Array.isArray(update?.total_quize)) {
          update.total_quize.totalQuizeAttempted = Number(data?.data?.totalQuizeAttempted);
        }
        else {
          update.total_quize = {};
          update.total_quize.totalQuizeAttempted = Number(data?.data?.totalQuizeAttempted);
        }
        console.log('update', update, data)
        updateData(update);
      },
      onError: (data) => {
        console.log("onErr", data, update)
        toast.show(
          'Quize is not submitted, something went wrong ...',
        );
      },
    });
  }
  
  function useRegister() {
    
    return useMutation(['register'], (req) => getRegisterData(req), {
      onSuccess: (data) => {
        toast.show(
          `OTP sent to ${data?.data?.email}`,
        );
      },
      onError: (data) => {
        console.log("onErr", data)
        const message = data?.data[0]?.msg ? data?.data[0]?.msg : 'somthing went wrong ...'
        toast.show(
          message,
        );
      },
    });
  }

  function useOTP() {
    
    return useMutation(['otp'], (req) => getOTPData(req), {
      onSuccess: (data) => {
        toast.show(
          'Registration success',
        );
      },
      onError: (data) => {
        console.log("onErr", data)
        const message = data?.message ? data?.message : 'somthing went wrong ...'
        toast.show(
          message,
        );
      },
    });
  }
  function useLeader(val, query, isEnabled) {
    const { getToken, authContext } = React.useContext(AuthContext);
    const { signOut } = authContext;
    // console.log('val>>>>>>>>>', val, query);
    return useQuery([query], () => getLeaderBoardData(val,getToken), {
      enabled:isEnabled ,
      onSuccess: (data) => {
        //console.log('onsucess Leader', data);
        // Toast.show(
        //   'success',
        // );
        // if(update?.total_quize && !Array.isArray(update?.total_quize)){
        //   update.total_quize.totalQuizeAttempted = Number(data?.data?.totalQuizeAttempted);
        // }
        // console.log('update', update, data)
        // updateData(update);
      },
      onError: (data) => {
        console.log("onErr", data)
        if(data.status===401) {
          signOut();
        toast.show(
          'Your session expired , please login again',
        );
        }
        else{
          toast.show(
            'somthing went wrong ...',
          );
        }
      },
    });
  }

  function useForgot() {
    // const { authContext } = React.useContext(AuthContext);
    // const { signIn } = authContext;
    // console.log('signIn', signIn);
    return useMutation(['forgot'], ({ email, password }) => forgotPassword({ email, password }), {
      onSuccess: (data) => {
        toast.show(
          'Password successfully reset!',
        );
        // signIn(data.data)
      },
      onError: (data) => {
       // console.log("onErr", data)
        toast.show(
          'Email-id is not registered'
        );
      },
    });
  }
  export { useQuize, useLogin, useScore, useRegister, useOTP, useLeader, useForgot };
  