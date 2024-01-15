import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { AppColor } from "../../utils/AppColor";
import { AppImage } from "../../utils/AppImage";

const Input = (props) => {
    const [active, setActive] = useState(false);
    const { name, value, onChangeText, placeholder, isErr, onIconPress, icon } = props;
    return (
        <View style={{
            height: 48, borderWidth: active ? 2 : 1.5, borderRadius: 6, marginTop: 21, flexDirection:'row'
            , borderColor: isErr ?  AppColor.error : active ? AppColor.primary : '#807F83', width: '100%', alignItems:'center'
        }}
        >
            <View style={{ position: 'absolute', top: -11, left: 10, justifyContent: 'center', alignItems: 'center', height: 17, backgroundColor: '#F2F2F2', }}>
                <Text style={{ color: isErr ?  AppColor.error : active ? '#47A576' : '#807F83', fontSize: 12, marginLeft: 2, marginRight: 2 }}>
                    {name}
                </Text>
            </View>
            <TextInput
                placeholder={placeholder}
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                value={value}
                placeholderTextColor='#8e8d91'
                onChangeText={(text) => onChangeText(text)}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingLeft: 15,
                    color:'black',
                    paddingBottom: 12, paddingTop: 12,
                    fontStyle: value ? 'normal' : 'italic'
                }}
                {...props}
            />
            {icon &&
            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginRight:5 }}
            onPress={onIconPress}
            >
            <Image source={icon} style={{width:25, height:25}} />
            </TouchableOpacity>
        }
        </View>
    )
}

export default Input;