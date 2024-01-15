import React, { useState } from 'react';
import { Dimensions, TouchableOpacity ,Text} from 'react-native';
//import { BackdropFilter, Blur, Canvas, Fill, RoundedRect, Text, useFont } from '@shopify/react-native-skia';

const {width, height} = Dimensions.get("window");
const rect = { x: 0, y: 0, width:width-40, height: 50, r:30 }
const OptionComp = ({data, onPress, selected, correct_answer, view, index}) => {
    // const font = useFont(require("../assets/fonts/Nunito-Medium.ttf"), 16);
    // if (font === null) {
    //     return null;
    // }
    // #e3e8e8
    //const [display, setDispaly] =useState({});
    if(view) {
      return(
        <TouchableOpacity style={{width:'100%',borderRadius:20, borderColor:'#E5E5E5',overflow:'hidden',
        backgroundColor:correct_answer===data?'rgba(0, 128, 0,0.25)': selected?'rgba(222, 19, 7,0.2)':'#e3e8e8', marginTop:20,justifyContent:'center',borderWidth:0.5}}
        activeOpacity={0.5}
        onPress={onPress}
        disabled
        >
        <Text style={{margin:10,marginLeft:20,marginTop:10,marginBottom:10,
          color:correct_answer===data? 'green': selected?'red':'grey', fontWeight:'bold'}}>{data}</Text>
      </TouchableOpacity>
    )
    }

    return(
        <TouchableOpacity style={{width:'100%',borderRadius:20, borderColor:'#E5E5E5',overflow:'hidden',
        backgroundColor:selected?'green':'#e3e8e8', marginTop:20,justifyContent:'center',borderWidth:0.5}}
        activeOpacity={0.5}
        onPress={onPress}
        >
        <Text style={{margin:10,marginLeft:20,marginTop:10, marginBottom:10,
          color:selected?'white':'grey', fontWeight:'bold'}}>{data}</Text>
      </TouchableOpacity>
    )
    // return (
    //     <Canvas style={{width:width-40,height:50}}>
    //         <RoundedRect x={0} y={0} width={width-40} height={50} r={10} color="rgba(255, 255, 255,0.1)" >
    //         <Blur blur={15}/>
    //         <Fill color="rgba(255, 255, 255,0.5)" />
    //         </RoundedRect>
    //         <Text
    //             x={20}
    //             y={30}
    //             color={'black'}
    //             text={data}
    //             font={font}
    //             size={32}
    //         />
            
    //         {/* </Rect> */}
    //         {/* <BackdropFilter filter={<Blur blur={10} />
    //         } clip={rect}>
    //             <Fill color="rgba(255, 255, 255, 0.2)" />

    //         </BackdropFilter> */}

    //     </Canvas>
    // )
}

export default OptionComp;