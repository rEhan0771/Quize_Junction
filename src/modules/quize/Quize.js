/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//import Entities from 'html-entities';
import OptionComp from '../../component/OptionComp';
import { AppImage } from '../../utils/AppImage';
import { decodeData, shuffle } from './helper';
import { useQuize } from '../../component/hook/useApi';
import { useFocusEffect } from '@react-navigation/native';
import CountdownTimer from '../../component/CountdownTimer';
import { useCountdown } from '../../component/hook/useCountdown';
import { ConfirmWindow, confirmWindow } from '../../component/alert/alert';
import Spinner from 'react-native-loading-spinner-overlay';
const { width, height } = Dimensions.get("window");

const Quize = ({ navigation, route }) => {
  //const {view } = route?.params;
  const [question, setQuestion] = useState(0);
  const [mcqIndex, setMcqIndex] = useState([]);
  const { isLoading, data } = useQuize({ amount: 10, category: route?.params?.categoryId, type: 'multiple' });
  const [quize, setQuize] = useState([]);
  const [result, setResult] = useState([]);
  const [nTime, setNTime] = useState(new Date().getTime());
  const startTime = 4.96 * 60;
  const [time, setTime] = useState(new Date().getTime() + (startTime * 1000)+3000);
  const [days, hours, minutes, seconds] = useCountdown(time);
  const timeCapture = useRef({prevTime:0, currTime:0});
  
  useEffect(() => {
    console.log('hi');
    fectchData();
    //initialData();
  }, [data])

  useEffect(() => {
    if (days + hours + minutes + seconds == 0 || (days + hours + minutes + seconds) < 0) {
      console.log('setTime useff')
      setTime(0);
      const capturetime = {...timeCapture.current}
      capturetime.currTime = startTime - ((minutes*60)+seconds);
          timeCapture.current = capturetime;
      goToResult()
    }
  }, [days, hours, minutes, seconds])

  //const initialData = useCallback(()=> fectchData(),[data])
  //  useEffect(()=>{
  //   let timer= setInterval(()=>{
  //     console.log('yu')
  //   },1000)

  //   clearInterval(timer)

  //  // return()=> clearInterval(timer)
  //  },[])

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = () => setQuestion(0);

      return () => unsubscribe();
    }, [route?.params?.view])
  );

  const fectchData = () => {
    //  const data= await fetch(url);
    //  const parse= await data.json();
    //console.log('bbb>>>>>>>>>>>>>>', data)
    if (data && !isLoading) {
      //const entities = new Entities();
      setTime(new Date().getTime() + ((0.02 + 5) * 60 * 1000));
      //console.log('ddd>>>>>>>>>>>>>>', data)
      let decodedData = data && data.results.map((item) => {
        return {
          ...decodeData(item)
        }
      });
      //console.log('decodedData', decodedData);
      let temp = decodedData && decodedData.map((item, i) => {
        return {
          ...item,
          q: i,
          questionArr: shuffle([...item.incorrect_answers, item.correct_answer])
          //questionArr: [decodeURIComponent(shuffle([...item.incorrect_answers,item.correct_answer]))]
        }
      })
      temp = shuffle(temp);
      setQuize(temp)
      //console.log(temp, temp[0].questionArr)
    }
  }
  const goToResult = () => {
    console.log('hit>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    navigation.navigate('Result', { result, type: route?.params?.categoryName, time: timeCapture})
  }
  const endTest = () => {
    const outPut = {
      onPress: (val) => {
        console.log('val>>>>', val)
        if (val === 'Yes') {
          const capture = {...timeCapture.current}
          capture.prevTime = startTime - ((minutes*60)+seconds);
          timeCapture.current = capture;
          console.log('capture>>', capture, timeCapture, minutes,seconds )
          setTime(new Date().getTime() + (0.02 * 60 * 1000));
        }
      }
    }
    ConfirmWindow(outPut)
    //console.log('confirmValue', confirmValue,)
    // Alert.alert(
    //   'Alert',
    //   'Are you sure you want to end the Test?',
    //   [
    //     { text: 'No', onPress: () => {console.log('Cancel Pressed')}, style: 'cancel' },
    //     { text: 'Yes', onPress: () => {setTime(0)} },
    //   ],
    //   { cancelable: false })
  }
  const onSelected = (id, i) => {
    let service = [...quize];
    let mcqIndexCopy = [...mcqIndex];
    for (let data of service) {
      if (data.q == id) {
        data.selected = (data.selected == null) ? i : i;
        break;
      }
    }
    let res = [...result];
    mcqIndexCopy[question] = i;
    res[question] = quize[question].correct_answer === quize[question].questionArr[i] ? true : false
    console.log('mcqI', mcqIndexCopy, res)
    setMcqIndex(mcqIndexCopy);
    setQuize(service);
    setResult(res);
  }
  const filterValue = (val) => {
    if (val === 'attempt') {
      const attempt = [...result].filter(item => item !== undefined);
      return attempt;
    }
    if (val === 'result') {
      const tResult = [...result].filter(item => item === true);

      return tResult;
    }
  }
  const renderList = (item, i) => {
    return (
      // <TouchableOpacity style={{width:width-40,borderRadius:10,overflow:'hidden',marginTop:20,backgroundColor:'#c3c9c9'}} 
      // onPress={()=>alert(i)}
      // activeOpacity={0.5}
      // >
      <OptionComp
        data={item}
        view={route?.params?.view ? true : false}
        index={i}
        correct_answer={quize[question].correct_answer}
        selected={i === mcqIndex[question] ? true : false}
        onPress={() => onSelected(question, i)}
      />
      // </TouchableOpacity>
    )
  }
  // if (isLoading) {
  //   return <Spinner visible={isLoading} color='#067d7d'/>
  // }

  return (

    <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
      <Spinner visible={isLoading} color='#067d7d' />
      <LinearGradient
        colors={['#067d7d', '#005B5B', '#067d7d']}
        style={{ width: '100%', height: '25%' }}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      //locations={[0.1, 0.98,0.1]}
      >
        {route?.params?.view !== true ?
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable>
                <Image
                  source={null}
                  style={{ width: 35, height: 35, marginTop: 25, marginLeft: 25 }}
                />
              </Pressable>
              {!route?.params?.view && <Pressable style={{
                marginTop: 20, marginRight: 20, backgroundColor: 'darkred', alignItems: 'center', justifyContent: 'center',
                borderRadius: 5
              }}
                onPress={() => endTest()}
              >
                <Text style={{ color: 'white', marginLeft: 5, marginRight: 5 }}>End Test</Text>
              </Pressable>}
            </View>
            {data && !isLoading ? <CountdownTimer targetDate={time} newTime={nTime}
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            // onTimeChange={(val)=>{
            //   console.log('val>>>>', val)
            //   if(val==0){
            //     //setNTime(0);
            //     setTime(0);
            //   }
            //   }}
            />
          :
          <View style={{flexDirection:'row',alignItems:'center', backgroundColor:'rgba( 255, 255, 255, 0.25 )', width:60, height:60, 
    borderRadius:30,justifyContent:'center',elevation:1, borderWidth:0.1, borderColor:'rgba( 255, 255, 255, 0.18 )', alignSelf:'center',bottom:20}}>
       <Text style={{color:'white', fontWeight:'bold', fontSize:15, marginRight:5}}>5</Text>
        <Text style={{color:'white', fontWeight:'bold', fontSize:15, marginLeft:5,marginRight:5}}>:</Text>
        <Text style={{color:'white', fontWeight:'bold', fontSize:15, marginLeft:5}}>00</Text>
    </View>
          }
          </>
          :
          <View style={{ marginTop: 20, flexDirection: 'row', margin: 10, justifyContent: 'space-around' }}>
            <View style={{
              width: 95, height: 40, backgroundColor: 'rgba( 255, 255, 255, 0.25 )',
              alignItems: 'center', justifyContent: 'center', borderRadius: 5
            }}>
              <Text style={{ color: '#02f742' }}>Correct: {filterValue('result').length}</Text>
            </View>
            <View style={{
              width: 95, height: 40, backgroundColor: 'rgba( 255, 255, 255, 0.25 )',
              alignItems: 'center', justifyContent: 'center', borderRadius: 5
            }}>
              <Text style={{ color: 'darkred' }}>Wrong: {filterValue('attempt').length - filterValue('result').length}</Text>
            </View>
            <View style={{
              width: 100, height: 40, backgroundColor: 'rgba( 255, 255, 255, 0.25 )',
              alignItems: 'center', justifyContent: 'center', borderRadius: 5
            }}>
              <Text style={{ color: 'yellow' }}>Attempt: {filterValue('attempt').length}</Text>
            </View>
          </View>}
      </LinearGradient>
      {/* </LinearGradient> */}
      <View style={{
        flex: 1, width: "92%", borderRadius: 10, borderWidth: 0.5, borderColor: '#E5E5E5', position: 'absolute',
        top: "15%", backgroundColor: 'white', height: height * 0.8, alignSelf: 'center'
      }}>
        <View style={{ margin: 15 }}>
          {quize.length > 0 && <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold' }}>
            Q.{question + 1}) {quize[question].question}
          </Text>}
          <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
            Select Answer
          </Text>
          {quize.length > 0 &&
            <FlatList
              data={quize[question].questionArr}
              renderItem={({ item, index }) => renderList(item, index)}
            />}
        </View>
        {/* <TouchableOpacity style={{width:width-40,borderRadius:40, borderColor:'white',overflow:'hidden',height:50,
     backgroundColor:'rgba(255, 255, 225,0.1)', marginTop:20}}
     >
     <Text style={{margin:10,color:'white', fontWeight:'bold'}}>Lorem Ipsum dolor</Text>
   </TouchableOpacity> */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'absolute', bottom: 20, width: '100%' }}>
          <Pressable style={{ width: '25%', height: 50, backgroundColor: '#005B5B', alignItems: 'center', borderRadius: 10, justifyContent: 'center' }}
            onPress={() => setQuestion((x) => x - 1)}
            disabled={question === 0 ? true : false}
          >
            <Text style={{ color: 'white' }}>Prev</Text>
          </Pressable>
          <Pressable style={{ width: '25%', height: 50, backgroundColor: '#005B5B', alignItems: 'center', borderRadius: 10, justifyContent: 'center' }}
            onPress={() => {
              if ((quize.length - 1) === question) {
                if (route?.params?.view === true) {
                  navigation.navigate('Home');
                  return
                }
                else {
                  endTest();
                  return;
                }
              }
              setQuestion((x) => x + 1)
            }}
          >
            <Text style={{ color: 'white' }}>{(quize.length - 1) === question ? route?.params?.view === true ? 'Home' : 'Finish' : 'Next'}</Text>
          </Pressable>
        </View>
      </View>

      {/*
 <LinearGradient
 colors={['#09FBD7','#005B5B', '#08F7F5', ]}
 style={{flex:1}}
 start={{ x: 0.9, y: 0.4 }}
 end={{ x: 0.1, y: 0.3 }}
 locations={[0, 0.9, 0]}
 >
 
 </LinearGradient> */}
    </View>
  )
};

export default Quize;
