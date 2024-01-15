import React, { useEffect, useMemo, useState } from "react";
import { Button, NativeModules, Pressable, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useLogin } from "../../component/hook/useApi";
import Input from "../../component/input/Input";
import { AppColor } from "../../utils/AppColor";
import { AppImage } from "../../utils/AppImage";
//import { getLoginData } from "../quize/quizeService";


const Login = ({ navigation }) => {
    const { isLoading, isError, data, mutate: getLoginData } = useLogin();
    // console.log(isLoading, data, getLoginData);
    //const mutation = useLogin();
    // const apiCall=()=>{
    //     fetch('https://hidayaa.info/api/all/surahList/ExponentPushToken[gukKUoPlVnf9-ZuUZPziv8]')
    //     .then((res)=> console.log('res', res))
    //     .catch((err)=> console.log('err>>', err))
    // }
    // useEffect(()=>{
    //     apiCall();
    // },[])
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    })
    const [userErr, setUserErr] = useState({
        email: '',
        password: ''
    })

    const [show, setShow] = useState(false);

     useEffect(()=>{
        
    // const name = useMemo(() => {
        if (data && !isLoading) {
            // data && data?.data.firstName+" "+data?.data.lastName},[data]);
            navigation.navigate('Quize')
        }
        else if(isError && !isLoading){
            console.log('err>>>>>')
        }
    }, [data, isLoading])

    const onLogin = () => {
        // mutation.mutate({email:'ajp@yopmail.com', password:'Test@1235'})
        if (userInput.email.trim().length === 0) {
            setUserErr({ ...userErr, email: 'Please enter user id' })
            return;
        }
        if (userInput.password.trim().length === 0) {
            setUserErr({ ...userErr, email: '', password: 'Please enter password' })
            return;
        }
        getLoginData(userInput)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner visible={isLoading} color='#067d7d' />
            {/* <Button 
        title="Login"
        onPress={()=>navigation.navigate('Quize')}
        /> */}

            <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. xyz@gmail.com'
                    name='Enter Email'
                    value={userInput.email}
                    isErr={userErr.email ? true : false}
                    onChangeText={(text) => {
                        setUserInput({ ...userInput, email: text })
                        setUserErr({ ...userErr, email: '' })
                    }}
                />
                {userErr.email && <Text style={{ color: AppColor.error, marginTop: 5, marginLeft: 5, marginBottom: 8, alignSelf: 'flex-start' }}>{userErr.email}</Text>}
            </View>
            <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. *****'
                    name='Enter Password'
                    secureTextEntry={!show}
                    value={userInput.password}
                    isErr={userErr.password ? true : false}
                    onChangeText={(text) => {
                        setUserInput({ ...userInput, password: text })
                        setUserErr({ ...userErr, password: '' })
                    }}
                    icon={show ? AppImage.unlock : AppImage.lock}
                    onIconPress={()=>setShow(!show)}
                />
            {userErr.password && <Text style={{ color: AppColor.error , marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{userErr.password}</Text>}
            </View>
            {isError && <Text style={{color:AppColor.error, marginTop:30}}>Email or Password is wrong</Text>}
            <Pressable style={{
                backgroundColor: '#067d7d', width: '60%', height: 40,
                alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop:isError? 10 : 30
            }}
                onPress={() => onLogin()}
            >
                <Text style={{ color: 'white', fontSize:16 }}>Login</Text>
            </Pressable>
            <TouchableOpacity style={{marginTop:10, marginBottom:10, alignSelf:'flex-end', marginRight:90}}
            onPress={()=>navigation.navigate('ForgotPassword')}
            >
                <Text style={{color:'blue'}}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:30}} activeOpacity={0.5}
            onPress={()=>navigation.navigate('Register')}
            >
                <Text style={{fontSize:17}}> New user? <Text style={{color:AppColor.primary}}>Register</Text></Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={onButtonClick}>
            <Text>Apply</Text>
        </TouchableOpacity> */}
        </View>
    )
}

export default Login;