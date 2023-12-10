import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import React, {useEffect} from 'react';
import {persistor, store} from './src/Redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import DrawerNavigator from './src/Navigation/DrawerNavigator';

// Hlw
type Props = {};
const App = (props: Props) => {
  // const dispatch = useAppDispatch();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <BottomNav /> */}
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
