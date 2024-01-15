import React, { useEffect, useState } from "react";
import { Button, Pressable, ScrollView, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { useRegister } from "../../component/hook/useApi";
import Input from "../../component/input/Input";
import { AppColor } from "../../utils/AppColor";
import { isEmpty } from "../quize/helper";

//const objValue = { placeholder: 'ex. John', name: 'Enter First Name', value: '', isError: '' };
const inputArr =
    [{ id: 'firstName', placeholder: 'ex. John', name: 'Enter First Name*', value: '', isError: '' },
    { id: 'lastName', placeholder: 'ex. Smith', name: 'Enter Last Name*', value: '', isError: '' },
    { id: 'email', placeholder: 'ex. xyz@gmail.com', name: 'Enter Email*', value: '', isError: '' },
    { id: 'password', placeholder: 'ex. ******', name: 'Enter Password*', value: '', isError: '' },
    { id: 'confirmPassword', placeholder: 'ex. ******', name: 'Confirm Password*', value: '', isError: '' }];

const Register = ({ navigation }) => {
    const [inputData, setInputData] = useState(inputArr);
    const { isLoading, isError, error, data, isSuccess, mutate: getRegisterData } = useRegister();
    console.log('eror>>>>>>>>', error, data);

    useEffect(() => {
        if (data && isSuccess) {
            navigation.navigate('OTPScreen', {email:data?.data?.email,password:inputData[3].value});
        }
    }, [data])
    const onRegister = () => {
        const inputDataCopy = [...inputData];
        inputData.forEach((item, i) => {
            inputDataCopy[i].isError = item.value ? isValid(item) : 'requird*'
        })

        setInputData(inputDataCopy);
        if (inputDataCopy.every(item => isEmpty(item.isError) && !isEmpty(item.value))) {
            const data = {
                firstName: inputDataCopy[0].value,
                lastName: inputDataCopy[1].value,
                email: inputDataCopy[2].value,
                password: inputDataCopy[3].value,
            }
            getRegisterData(data);
        }
    }
    const isValid = (ele) => {
        const regx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const passRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        //console.log('ele>>>', ele, inputData[3].value);
        if (ele.id === 'email' && !regx.test(ele.value)) {

            return 'Please enter valid email'
        }
        if (ele.id === 'password' && !passRegx.test(ele.value)) {

            return 'Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character'
        }

        if (ele.id === 'confirmPassword' && ele.value !== inputData[3].value) {
            return 'Password should be matched'
        }
    }
    const inputHandeler = (text, i) => {
        const inputDataCopy = [...inputData];
        inputDataCopy[i].value = text;
        inputDataCopy[i].isError = '';

        setInputData(inputDataCopy);
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner visible={isLoading} color='#067d7d'/>
            <ScrollView style={{ flex: 1, width: '100%', }} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '80%' }}>
                    {inputData.map((item, i) => (
                        <>
                            <Input
                                key={i.toString()}
                                placeholder={item.placeholder}
                                name={item.name}
                                value={item.value}
                                isErr={item.isError ? true : false}
                                onChangeText={(text) => inputHandeler(text, i)}
                            />
                            {item.isError && <Text style={{ color: AppColor.error, marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{item.isError}</Text>}
                        </>
                    ))
                    }
                </View>
                {isError && <Text style={{ color: AppColor.error, marginTop: 30 }}>{error?.data[0]?.msg ? error?.data[0]?.msg : 'somthing went wrong ...'}</Text>}
                <Pressable style={{
                    backgroundColor: '#067d7d', width: '60%', height: 40,
                    alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: isError ? 10 : 30
                }}
                    onPress={() => onRegister()}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Register</Text>
                </Pressable>
                {/* <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. John'
                    name='Enter First Name'
                    value={inputData.firstName}
                    isErr={isInputErr.firstName ? true : false}
                    onChangeText={(text) => {
                        setInputData({ ...inputData, firstName: text })
                        setIsInputErr({ ...isInputErr, firstName: '' })
                    }}
                />
            {isInputErr.firstName && <Text style={{ color: AppColor.error , marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{isInputErr.firstName}</Text>}
            </View>
            <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. John'
                    name='Enter First Name'
                    value={inputData.firstName}
                    isErr={isInputErr.firstName ? true : false}
                    onChangeText={(text) => {
                        setInputData({ ...inputData, firstName: text })
                        setIsInputErr({ ...isInputErr, firstName: '' })
                    }}
                />
            {isInputErr.firstName && <Text style={{ color: AppColor.error , marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{isInputErr.firstName}</Text>}
            </View>
            <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. John'
                    name='Enter First Name'
                    value={inputData.firstName}
                    isErr={isInputErr.firstName ? true : false}
                    onChangeText={(text) => {
                        setInputData({ ...inputData, firstName: text })
                        setIsInputErr({ ...isInputErr, firstName: '' })
                    }}
                />
            {isInputErr.firstName && <Text style={{ color: AppColor.error , marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{isInputErr.firstName}</Text>}
            </View>
            <View style={{ width: '80%' }}>
                <Input
                    placeholder='ex. John'
                    name='Enter First Name'
                    value={inputData.firstName}
                    isErr={isInputErr.firstName ? true : false}
                    onChangeText={(text) => {
                        setInputData({ ...inputData, firstName: text })
                        setIsInputErr({ ...isInputErr, firstName: '' })
                    }}
                />
            {isInputErr.firstName && <Text style={{ color: AppColor.error , marginLeft: 5, marginTop: 5, marginBottom: 8 }}>{isInputErr.firstName}</Text>}
            </View> */}
            </ScrollView>
        </View>
    )
}

export default Register;