import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, View} from 'native-base';
class SettingsScreen extends React.Component {
    static navigationOptions = {
        headerStyle: {
          backgroundColor: '#3F51B5'
        },
        headerLeft: (<View/>),
        headerTitle: () => (
          <View style={styles.headerWrapper}>
            <Text
              adjustsFontSizeToFit
              style={styles.headerText}>Item List</Text>
          </View>
        ),
        headerRight: (<View/>)
    }
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Text>Settings</Text>
        );
    }
}
const styles = StyleSheet.create({
    headerWrapper: {
      flex: 1
    },
    headerText: {
      textAlign: 'center', // ok
      alignSelf: 'center', // ok
    }
});
export default SettingsScreen;