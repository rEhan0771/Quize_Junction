import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import Quize from "../../quize/Quize";
import { NavigationContainer } from "@react-navigation/native";
import Result from "../../result/Result";
import EncryptedStorage from 'react-native-encrypted-storage';
import { AuthContext } from "./AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import Home from "../../home/Home";
import OTPScreen from "../../auth/OTPScreen";
import LeaderBoard from "../../leaderBoard/LeaderBoard";
import ForgotPassword from "../../auth/ForgotPassoword";


const Stack = createNativeStackNavigator();

const Routes = () => {
const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userData: action.data,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userData: action.data,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userData: null,
          };
        case 'update':
            return {
              ...prevState,
              userData: action.data,
              isLoading: false,
            };  
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userData: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userData;

      try {
        userData = await EncryptedStorage.getItem('userData');

      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', data: JSON.parse(userData) });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        console.log('data>>>>>', data);
        await EncryptedStorage.setItem("userData",JSON.stringify(data))
        dispatch({ type: 'SIGN_IN', data: data });
      },
      signOut: async() => {
        await EncryptedStorage.removeItem("userData");
        dispatch({ type: 'SIGN_OUT' })},
      signUp: async (data) => {

        dispatch({ type: 'SIGN_IN', data: data });
      },
      updateData: async (data) => {
        await EncryptedStorage.setItem("userData",JSON.stringify(data))
        dispatch({ type: 'update', data: data });
      },
    }),
    []
  );
    // const getToken = ()=>{

    //     token = JSON.parse(state.userData).token;
    // }
  if(state.isLoading) {
    return <Spinner visible={state.isLoading} color='#067d7d'/>
  }
  

    return(
        <AuthContext.Provider value={{authContext, getToken:state.userData}}>
        <NavigationContainer>
        {state.userData == null ? (
            <AuthScreen />
        ):
        (
            <HomeScreen />
        )}
        </NavigationContainer>
        </AuthContext.Provider>
    )
    }
const AuthScreen = ()=> {

    return(
        <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='OTPScreen' component={OTPScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        </Stack.Navigator>
    )
}

const HomeScreen = ()=> {

    return(
        <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} 
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen name='Quize' component={Quize} 
        options={{
            headerShown:false
        }}
        />
        <Stack.Screen name='Result' component={Result} 
        options={{
            headerBackVisible:false
        }}
        />
        <Stack.Screen name='LeaderBoard' component={LeaderBoard}/>
        </Stack.Navigator>
    )
}
export default Routes;