/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState, useEffect} from 'react';
 import {
   Dimensions, LogBox,
 } from 'react-native';
 import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
 import LinearGradient from 'react-native-linear-gradient';
 import Routes from './src/modules/navigation/controller/Routes';
 import Toast from "react-native-toast-notifications";
 const {width, height} = Dimensions.get("window");
 
 const url= 'https://opentdb.com/api.php?amount=10&category=9&type=multiple';
 
 const queryClient = new QueryClient();
 const App = () => {
 
   return(
     <QueryClientProvider client={queryClient}>
 
       <Routes />
       <Toast ref={(ref) => global['toast'] = ref} />
     </QueryClientProvider>
   )
 };
 
 LogBox.ignoreAllLogs()
 export default App;
 