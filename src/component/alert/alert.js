import { Alert } from "react-native";
export const ConfirmWindow = (props) => {
    //console.log('props', props)
    var confirmValue;
    Alert.alert(
      'Alert',
      'Are you sure you want to end the Test?',
      [
        { text: 'No', onPress: () => {console.log('Cancel Pressed'), confirmValue='No'}, style: 'cancel' },
        { text: 'Yes', onPress: () => {props.onPress('Yes'), confirmValue='Yes'} },
      ],
      { cancelable: false });
    return confirmValue;

  }