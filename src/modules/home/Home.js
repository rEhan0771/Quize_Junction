import React, { useContext, useEffect } from "react";
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import CategoryCard from "../../component/card/CategoryCard";
import { useLeader } from "../../component/hook/useApi";
import { AppColor } from "../../utils/AppColor";
import { AppImage } from "../../utils/AppImage";
import { AuthContext } from "../navigation/controller/AuthContext";

const arr=[{name:'General Knowledge', img:AppImage.general_knowledge, categoryId:9},
{name:'Scince', img:AppImage.scince, categoryId:17}, {name:'Mathematics', img:AppImage.math, categoryId:19},
{name:'History', img:AppImage.history, categoryId:23}, {name:'Computer', img:AppImage.computer, categoryId:18},
{name:'Mythology', img:AppImage.mythology,categoryId:20}, {name:'Vehicles', img:AppImage.vehicle, categoryId:28},
]
const Home = ({navigation}) =>{
    const { getToken } = useContext(AuthContext)
    const { isLoading, data } = useLeader('', 'leaderHome', true);
    
    
    const _renderItem=(item,i)=>{

        return(
            <CategoryCard data={item} key={i}
            onPress={()=>navigation.navigate('Quize', {categoryId:item.categoryId, categoryName:item.name})}
            />
        )
    }

    return(
        <View style={{flex:1}}>
             <Spinner visible={isLoading} color='#067d7d' />
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20,margin:15}}>
            <Text style={{fontSize:19,color:'#067d7d', fontStyle:'italic', fontWeight:'500', marginLeft:10}}>Hi {getToken.firstName+" "+getToken.lastName}</Text> 
            <TouchableOpacity
            activeOpacity={0.5}
            style={{justifyContent:'center', alignItems:'center'}}
            onPress={()=>navigation.navigate('LeaderBoard')}
            >
            <Image 
            source={AppImage.profile}
            style={{width:35,height:35,resizeMode:'contain'}}
            />
            <Text style={{marginTop:5, color:AppColor.primary}}>Leader Board</Text>
            </TouchableOpacity>
            </View>
        <Text style={{fontSize:20, margin:20, marginTop:10, color:'#067d7d', fontWeight:'700'}}>Let's Play</Text>
        <View style={{flex:1}}>
            <FlatList 
            data={arr}
            numColumns={2}
            keyExtractor={(item,index)=>index.toString()}
            renderItem={({item,index})=>_renderItem(item,index)}
            />
        </View>
        </View>
    )
}

export default Home;