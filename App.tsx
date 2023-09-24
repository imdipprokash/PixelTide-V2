import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import React from 'react';
import DrawerNavigator from './src/Navigation/DrawerNavigator';
import {persistor, store} from './src/Redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {createStackNavigator} from '@react-navigation/stack';

type Props = {};
const stack = createStackNavigator();
const App = (props: Props) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
  },
  bannerStyle: {},
});
