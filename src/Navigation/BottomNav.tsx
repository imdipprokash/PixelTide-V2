import {View, Text, TouchableOpacity, Keyboard} from 'react-native';
import React from 'react';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import DrawerNavigator from './DrawerNavigator';
import {
  HomeIcon,
  ArrowUpTrayIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import UploadSrc from '../Screens/UploadSrc/UploadSrc';
import UserSrc from '../Screens/UserSrc/UserSrc';

type Props = {};

const BottomNav = (props: Props) => {
  const BtnStck = createBottomTabNavigator();
  const CustomTabbarBtn = ({children, onPress}: BottomTabBarButtonProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPress}
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          top: -30,
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 10,
          },
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            backgroundColor: '#f2f2f3',
          }}>
          {children}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BtnStck.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <BtnStck.Screen
        name="HomeSrc"
        component={DrawerNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <HomeIcon color={focused ? '#000fff' : '#666'} />
          ),
        }}
      />
      <BtnStck.Screen
        name="UploadSrc"
        component={UploadSrc}
        options={{
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,

          tabBarIcon: ({focused}) => (
            <ArrowUpTrayIcon color={focused ? '#000fff' : '#666'} size={35} />
          ),
        }}
      />
      <BtnStck.Screen
        name="UserSrc"
        component={UserSrc}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <UserIcon color={focused ? '#000fff' : '#666'} />
          ),
        }}
      />
    </BtnStck.Navigator>
  );
};

export default BottomNav;
