import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/Home/HomeScreen';
import ItemsPage from '../Screens/ItemsPage/ItemsPage';
import ItemView from '../Screens/ItemsPage/ItemView';
import Wallet from '../Screens/Wallet/Wallet';
import ItemOverview from '../Screens/ItemOverview/ItemOverview';

type Props = {};

const StackNav = (props: Props) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="leadingPage" component={HomeScreen} />
      <Stack.Screen name="ItemOverview" component={ItemOverview} />
      <Stack.Screen name="ItemView" component={ItemView} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
};

export default StackNav;

const styles = StyleSheet.create({});
