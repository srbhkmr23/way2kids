// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import AppContainer from './src/navigation/MainNavigation';


// export default function App() {
//   return (
//     <AppContainer></AppContainer>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { StyleSheet, View, Text, Platform, StatusBar} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer  from './src/redux/reducers';

const createStoreWithMiddleWare = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleWare(rootReducer);

// const store = createStore(rootReducer);
import { Ionicons } from '@expo/vector-icons';
// import AppNavigator from './src/navigation/AppNavigator';
import AppContainer from './src/navigation/MainNavigation';


export default class App extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isLoadingComplete: false,
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={ store }>
            <AppContainer />
          </Provider>
        </View>
      );
    }
  }
  


  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }


  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/robot-dev.png'),
        require('./src/assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

