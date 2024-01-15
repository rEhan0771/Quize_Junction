import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import LeaderCard from "../../component/card/LeaderCard";
import { useLeader } from "../../component/hook/useApi";

const categoryArr = ['all', 'General Knowledge', 'Scince', 'Mathematics', 'History', 'Computer', 'Mythology', 'Vehicles'];
const LeaderBoard = () => {
    const [category, setCategory] = useState(categoryArr[0])
    const [isEnabled, setIsEnabled] = useState(true);
    const cat = useRef(categoryArr[0]);
    const { isLoading, data, refetch } = useLeader(cat.current, 'leader', isEnabled);
   // console.log('data in Leader', data);
    const leader = useMemo(() => data?.data ? data?.data : [], [data]);

    //const refetchCategory = useCallback(()=> refetch() , [cat.current])
    useEffect(()=>{
    refetch()
    },[category])
    const _renderItem = (item, i) => {
        return (
            <LeaderCard leaderData={item} index={i} />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <Spinner visible={isLoading} color='#067d7d' />
            <View style={{alignItems:'center', marginTop:10}}>
                <FlatList 
                data={categoryArr}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{paddingLeft:10}}
                contentContainerStyle={{paddingRight:10}}
                renderItem={({item, index})=>(
                    <TouchableOpacity style={{marginRight:10, height:40,padding:5, 
                    alignItems:'center', justifyContent:'center', backgroundColor:item === category ? '#067d7d': 'white', borderRadius:3}}
                    onPress={()=>{setCategory(item)
                    //setIsEnabled(false)
                    cat.current = item;
                    // refetchCategory();
                    }}
                    >
                        <Text style={{color:item === category ? 'white' : '#067d7d'}}>{item.toUpperCase()}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
            <View style={{ flex: 1, marginTop: 20 }}>
                {leader && leader.length>0 ? (
                    <FlatList
                        data={leader}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => _renderItem(item, index)}
                    />)
                : null
                }
            </View>
        </View>
    )
}

export default LeaderBoard;