import React, { useEffect, useRef } from "react";
import { Button, View, Text, Pressable, BackHandler } from "react-native";
import Lottie from 'lottie-react-native';
import { useScore } from "../../component/hook/useApi";
import { AuthContext } from "../navigation/controller/AuthContext";


const Result = ({ navigation, route }) => {
    const { result, type, time } = route.params;
    const { isLoading, isError, data, mutate:postScore } = useScore();
    const { getToken } = React.useContext(AuthContext);
    const isApiHit = useRef(true);
    
    console.log('result ..', result, time);
    const attempt = [...result].filter(item => item !== undefined);
    const tResult = [...result].filter(item => item === true);
    useEffect(() => {
        if(isApiHit.current) {
        const total = (getToken?.total_quize && !Array.isArray(getToken?.total_quize)) ? getToken?.total_quize?.totalQuizeAttempted+1:1 ;
        console.log('total>>>>>',(getToken?.total_quize && !Array.isArray(getToken?.total_quize)) )
        postScore(
            {
                "category": type,
                "totalQuizeAttempted": total,
                "result": tResult.length > 5 ? "pass" : "fail",
                "attempted": attempt.length,
                "correctAttempt": tResult.length,
                "totalQuestions": 10,
                "completedInTime": time?.current?.prevTime
            }
        )
        isApiHit.current = false;
        }
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            gotoHome
        );

        return () => backHandler.remove();
    }, [])
    const gotoHome = () => {
        navigation.navigate('Home');
        return true;
    }
    return (
        <View style={{ flex: 1, justifyContent:'center' }}>
            {tResult.length > 5 && <View style={{ width: '80%', height: '40%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                <Lottie source={require('../../assets/images/congratulation_animation.json')} autoPlay loop />
            </View>}

            <Text style={{ textAlign: 'center', margin: 10, fontSize: 18, fontWeight: 'bold' }}>
                Result
            </Text>
            {tResult.length <= 5 && <Text style={{ textAlign: 'center', margin: 10, fontSize: 18, fontWeight: 'bold' }}>
                You have not clear the test.
            </Text>}
            <View style={{ margin: 10, marginLeft: 15 }}>
                <Text>Total Questions : 10</Text>
                <Text>Attempted : {attempt.length}</Text>
                <Text>Correct Attempt : {tResult.length}</Text>
            </View>
            <View style={{
                alignSelf: 'center', width: 150, height: 150, borderRadius: 75,
                backgroundColor: tResult.length > 5 ? 'green' : 'red', borderWidth: 1, borderColor: "#E5E5E5", elevation: 8, overflow: 'hidden'
                , alignItems: 'center', justifyContent: 'center', margin: 10
            }}>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>You Score</Text>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>{(tResult.length / 10 * 100).toFixed(2)}</Text>
            </View>
            <View style={{felx:1,flexDirection:'row', justifyContent:'space-around'}}>
            <Pressable
                style={{
                    width: '45%', height: 40, borderRadius: 7, marginTop: 10,
                    backgroundColor: '#067d7d', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'
                }}
                onPress={() => navigation.navigate('Quize', { view: true })}
            >
                <Text style={{ color: 'white', fontSize: 14 }}>Check Answer</Text>
            </Pressable>
            <Pressable
                style={{
                    width: '45%', height: 40, borderRadius: 7, marginTop: 10,
                    backgroundColor: '#067d7d', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'
                }}
                onPress={() => gotoHome()}
            >
                <Text style={{ color: 'white', fontSize: 14 }}>Go to Home</Text>
            </Pressable>
            </View>
            {/* <Text>you score {tResult.length} out of 10</Text> */}
        </View>
    )
}

export default Result;