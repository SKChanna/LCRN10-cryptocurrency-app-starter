import React,  {useEffect} from 'react';
import { CryptoDetail, Transaction } from "./screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen'
import LinearGradient from "react-native-linear-gradient";

import Tabs from "./navigation/tabs";
import {COLORS} from "./constants";

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
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
          component={CryptoDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
