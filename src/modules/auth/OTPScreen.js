import React, { useEffect, useMemo, useState } from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useLogin, useOTP } from "../../component/hook/useApi";
import Input from "../../component/input/Input";
import { AppColor } from "../../utils/AppColor";
//import { getLoginData } from "../quize/quizeService";


const OTPScreen = ({ navigation, route }) => {
    const { email, password } = route.params;
    const { isLoading, isError,error, data,isSuccess, mutate: getOTPData } = useOTP();
    const { isLoading:loading, isError:isErr, data:loginData, mutate: getLoginData } = useLogin();
    const [otp, setOtp] = useState('');
    const [otpErr, setOtpErr] = useState('');

    const loader = isLoading || loading;
    
    useEffect(()=>{
    if(data && isSuccess) {
        getLoginData({email, password})
    }
    },[data])
    const onOTP = () => {
        
        if (otp.trim().length === 0) {
            setOtpErr('Please enter OTP')
            return;
        }
        
        getOTPData({email,otp});
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner visible={loader} color='#067d7d' />
            
            <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. 1234'
                    name='Enter OTP'
                    value={otp}
                    isErr={otpErr ? true : false}
                    onChangeText={(text) => {
                        setOtp(text);
                        setOtpErr('');
                    }}
                />
                {otpErr && <Text style={{ color: AppColor.error, marginTop: 5, marginLeft: 5, marginBottom: 8, alignSelf: 'flex-start' }}>{otpErr}</Text>}
            </View>
            {isError && <Text style={{color:AppColor.error, marginTop:30}}>{error?.message}</Text>}
            <Pressable style={{
                backgroundColor: '#067d7d', width: '60%', height: 40,
                alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop:isError? 10 : 30
            }}
                onPress={() => onOTP()}
            >
                <Text style={{ color: 'white', fontSize:16 }}>Submit</Text>
            </Pressable>
            
        </View>
    )
}

export default OTPScreen;