import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
import LinearGradient from "react-native-linear-gradient";

import {Accounts, BalanceSheet, Home, Payments} from "../screens"
import { COLORS, FONTS, icons } from "../constants"
import {NavigationContainer} from "@react-navigation/native";
import {color} from "react-native-reanimated";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator()

const TabBarCustomButton = ({children, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={{
          width: 55,
          height: 55,
          borderRadius: 35
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )
}

const Tabs = () => {
    return (
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
            style: styles.tabNavigatorStyle
          }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({focused}) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                      <AntDesignIcon name='dashboard' size={23} color={focused ? COLORS.primary : COLORS.black} />
                      <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body6}}>
                        HOME
                      </Text>
                    </View>
                  )
                }}
            />
            <Tab.Screen
                name="BalanceSheet"
                component={BalanceSheet}
                options={{
                  tabBarIcon: ({focused}) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                      <FontAwesomeIcon name='balance-scale' size={23} color={focused ? COLORS.primary : COLORS.black} />
                      <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body6}}>
                        Balance Sheet
                      </Text>
                    </View>
                  )
                }}
            />
            <Tab.Screen
                name="PaymentsPage"
                component={Payments}
                options={{
                  tabBarIcon: ({focused}) => (
                    <Image
                      source={icons.transaction}
                      resizeMode="contain"
                      style={{
                        width: 23,
                        height: 23,
                        tintColor: COLORS.white
                      }}
                    />
                  ),
                  tabBarButton: (props) => (
                    <TabBarCustomButton {...props} />
                  )
                }}
            />
            <Tab.Screen
                name="Accounts"
                component={Accounts}
                options={{
                  tabBarIcon: ({focused}) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                      <AntDesignIcon name='contacts' size={24} color={focused ? COLORS.primary : COLORS.black} />
                      <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body6}}>
                        ACCOUNTS
                      </Text>
                    </View>
                  )
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Home}
                options={{
                  tabBarIcon: ({focused}) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                      <Image
                        source={icons.settings}
                        resizeMode="contain"
                        style={{
                          width: 23,
                          height: 23,
                          tintColor: focused ? COLORS.primary : COLORS.black
                        }}
                      />
                      <Text style={{ color: focused ? COLORS.primary : COLORS.black, ...FONTS.body6}}>
                        SETTINGS
                      </Text>
                    </View>
                  )
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
  tabNavigatorStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: COLORS.white,
    borderTopColor: 'transparent',
    height: 50
  }
})

export default Tabs;
