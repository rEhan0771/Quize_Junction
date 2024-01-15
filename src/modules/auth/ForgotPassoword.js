import React, { useEffect, useMemo, useState } from "react";
import { Button, Image, NativeModules, Pressable, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useForgot } from "../../component/hook/useApi";
import Input from "../../component/input/Input";
import { AppColor } from "../../utils/AppColor";
import { AppImage } from "../../utils/AppImage";
//import { getLoginData } from "../quize/quizeService";


const ForgotPassword = ({ navigation }) => {
    const { isLoading, isError, data, mutate: forgotPassword } = useForgot();
    // console.log(isLoading, data, getLoginData);
    //const mutation = useLogin();
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
        confirmPassword:''
    })
    const [userErr, setUserErr] = useState({
        email: '',
        password: '',
        confirmPassword:''
    })

    const [psdShow, setPsdShow] = useState(false);
    const [confirmPsdShow, setConfirmPsdShow] = useState(false)
     useEffect(()=>{
        
    // const name = useMemo(() => {
        if (data && !isLoading) {
            // data && data?.data.firstName+" "+data?.data.lastName},[data]);
            navigation.navigate('Login')
        }
        else if(isError && !isLoading){
            console.log('err>>>>>')
        }
    }, [data, isLoading])

    const onSubmit = () => {
        // mutation.mutate({email:'ajp@yopmail.com', password:'Test@1235'})
        const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (userInput.email.trim().length === 0 || !regx.test(userInput.email)) {
            setUserErr({ ...userErr, email: 'Please enter valid email' })
            return;
        }
        if (userInput.password.trim().length === 0) {
            setUserErr({ ...userErr, email: '', password: 'Please enter password' })
            return;
        }
        if (userInput.confirmPassword.trim().length === 0) {
            setUserErr({ ...userErr, email: '', password: '',confirmPassword:'Please enter password' })
            return;
        }
        if (userInput.confirmPassword !== userInput.password) {
            setUserErr({ ...userErr, email: '', password: '',confirmPassword:'Password should be same' })
            return;
        }
        forgotPassword(userInput)
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
                    secureTextEntry={!psdShow}
                    value={userInput.password}
                    isErr={userErr.password ? true : false}
                    onChangeText={(text) => {
                        setUserInput({ ...userInput, password: text })
                        setUserErr({ ...userErr, password: '' })
                    }}
                    icon={psdShow ? AppImage.unlock : AppImage.lock}
                    onIconPress={()=>setPsdShow(!psdShow)}
                />
                {/* <Image source={AppImage.lock} style={{width:25, height:25, }} /> */}
            {userErr.password && <Text style={{ color: AppColor.error , marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{userErr.password}</Text>}
            </View>
            <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. *****'
                    name='Confirm Password'
                    secureTextEntry={!confirmPsdShow}
                    value={userInput.confirmPassword}
                    isErr={userErr.confirmPassword ? true : false}
                    onChangeText={(text) => {
                        setUserInput({ ...userInput, confirmPassword: text })
                        setUserErr({ ...userErr, confirmPassword: '' })
                    }}
                    icon={confirmPsdShow ? AppImage.unlock : AppImage.lock}
                    onIconPress={()=>setConfirmPsdShow(!confirmPsdShow)}
                />
            {userErr.confirmPassword && <Text style={{ color: AppColor.error , marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{userErr.confirmPassword}</Text>}
            </View>
            {isError && <Text style={{color:AppColor.error, marginTop:30}}>Email is not registerd</Text>}
            <Pressable style={{
                backgroundColor: '#067d7d', width: '60%', height: 40,
                alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop:isError? 10 : 30
            }}
                onPress={() => onSubmit()}
            >
                <Text style={{ color: 'white', fontSize:16 }}>Login</Text>
            </Pressable>
            {/* <TouchableOpacity style={{marginTop:10, marginBottom:10, alignSelf:'flex-end', marginRight:90}}>
                <Text style={{color:'blue'}}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:30}} activeOpacity={0.5}
            onPress={()=>navigation.navigate('Register')}
            >
                <Text style={{fontSize:17}}> New user? <Text style={{color:AppColor.primary}}>Register</Text></Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={onButtonClick}>
            <Text>Apply</Text>
        </TouchableOpacity> */}
        </View>
    )
}

export default ForgotPassword;