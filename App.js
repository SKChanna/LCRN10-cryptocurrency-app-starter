import React,  {useEffect} from 'react';
import Toast from 'react-native-toast-message';
// Redux
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';

import { Accounts, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import Tabs from "./navigation/tabs";

const Stack = createStackNavigator();
const Store = configureStore();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
            initialRouteName={'Home'}
          >
            <Stack.Screen
              name="Home"
              component={Tabs}
            />
            <Stack.Screen
              name="Transaction"
              component={Transaction}
            />
            <Stack.Screen
              name="CryptoDetail"
              component={Accounts}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  )
}

export default App;
