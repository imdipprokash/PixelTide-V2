import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHook';
import {RootState} from '../Redux/store';
import {REMOVE_USER} from '../Redux/slices/userSlices';

type Props = {};

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const {userName, email, id, photo} = useAppSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useAppDispatch();
  return (
    <DrawerContentScrollView {...props}>
      {userName && (
        <View className="">
          <Image
            source={{uri: photo || ''}}
            className="w-14 h-14 rounded-full mx-auto my-2 "
          />
          <Text className="text-gray-600 text-center font-bold text-lg mb-2">
            {userName}
          </Text>
        </View>
      )}
      <DrawerItemList {...props} />
      {/* <AdsScreen /> */}

      {userName && (
        <View className="">
          <TouchableOpacity
            className="w-28 mx-auto "
            activeOpacity={0.7}
            onPress={() => dispatch(REMOVE_USER())}>
            <Text className="text-black text-xl bg-gray-400 px-3 py-1 rounded-xl font-bold text-center">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
