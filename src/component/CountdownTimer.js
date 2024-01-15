import { Text, View } from 'react-native';
import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './hook/useCountdown';

// const ExpiredNotice = () => {
//   return (
//     <div className="expired-notice">
//       <span>Expired!!!</span>
//       <p>Please select a future date and time.</p>
//     </div>
//   );
// };

export const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <View style={{flexDirection:'row',alignItems:'center', backgroundColor:'rgba( 255, 255, 255, 0.25 )', width:60, height:60, 
    borderRadius:30,justifyContent:'center',elevation:1, borderWidth:0.1, borderColor:'rgba( 255, 255, 255, 0.18 )', alignSelf:'center',bottom:20}}>
        {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <Text>:</Text>
        <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
        <Text>:</Text> */}
        <DateTimeDisplay value={minutes} type={'mm'} isDanger={minutes<1} />
        <Text style={{color:'white', fontWeight:'bold', fontSize:15, marginLeft:5,marginRight:5}}>:</Text>
        <DateTimeDisplay value={seconds} type={'ss'} isDanger={minutes<1} />
    </View>
  );
};

const CountdownTimer = ({ targetDate, onTimeChange, newTime,days, hours, minutes, seconds }) => {
  //const [nTime, setNTime] = useState(new Date().getTime());
 //const [days, hours, minutes, seconds]
  //const [days, hours, minutes, seconds] = useCountdown(targetDate,newTime);
//console.log('targetDate', targetDate, days, hours, minutes, seconds);
  // if (days + hours + minutes + seconds == 0) {
  //   return <Text>Expired</Text>;
  // } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  //}
};

export default CountdownTimer;
