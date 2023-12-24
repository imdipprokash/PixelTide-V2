import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import AboutScreen from '../Screens/AboutScreen';
import {useAppSelector} from '../hooks/reduxHook';
import StackNav from './StackNav';
import Wallet from '../Screens/Wallet/Wallet';

type Props = {};

const DrawerNavigator = (props: Props) => {
  const Drawer = createDrawerNavigator();
  const {userName} = useAppSelector(state => state.user);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'front',
        swipeEdgeWidth: 0,
        drawerStyle: {
          backgroundColor: '#f2f2f2',
          width: '60%',
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={StackNav} />
      {/* <Drawer.Screen name="Wallet" component={Wallet} /> */}
      <Drawer.Screen name="About" component={AboutScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
