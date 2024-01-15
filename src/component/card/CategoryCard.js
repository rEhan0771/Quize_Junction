import React from "react";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";


const CategoryCard = ({data, onPress}) =>{

    return(
        <TouchableOpacity style={{width:'45%', height:200, backgroundColor:'white', margin:10, 
        alignItems:'center',justifyContent:'center', borderRadius:10, elevation:1}}
        activeOpacity={0.7}
        onPress={onPress}
        >
        <Image 
        source={data.img}
        style={{width:'100%', height:140}}
        />
        <Text style={{marginTop:10, fontSize:16, color:'black'}}>{data.name}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard;