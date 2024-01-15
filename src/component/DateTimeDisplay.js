import React from 'react';
import { Text, View } from 'react-native';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <View style={{backgroundColor:'transparent', alignItems:'center'}}>
      <Text style={{fontSize:15, fontWeight:'bold', color:isDanger?'red':'white'}}>{value}</Text>
      {/* <Text>{type}</Text> */}
    </View>
  );
};

export default DateTimeDisplay;
