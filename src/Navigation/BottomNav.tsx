import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DrawerNavigator from './DrawerNavigator';

type Props = {};

const BottomNav = (props: Props) => {
  const BtnStck = createBottomTabNavigator();
  return (
    <BtnStck.Navigator screenOptions={{headerShown: false}}>
      <BtnStck.Screen name="HomeSrc" component={DrawerNavigator} />
    </BtnStck.Navigator>
  );
};

export default BottomNav;
