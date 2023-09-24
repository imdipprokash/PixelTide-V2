import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  Bars3BottomLeftIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';

interface Props {
  toggleDrawer: () => void;
  isHomepage?: boolean;
}
const CustomHeader = ({toggleDrawer, isHomepage}: Props) => {
  const nav = useNavigation();
  return (
    <View className="py-2 flex-row items-center">
      {isHomepage && (
        <TouchableOpacity onPress={toggleDrawer}>
          <Bars3BottomLeftIcon color={'#34de'} size={28} fill={'#fff'} />
        </TouchableOpacity>
      )}
      {!isHomepage && (
        <TouchableOpacity
          onPress={() => {
            nav.goBack();
          }}
          className="pr-2">
          <ArrowLeftIcon color={'#34de'} size={20} fill={'#fff'} />
        </TouchableOpacity>
      )}
      <View className="flex-row">
        <Image source={require('../assets/logo.png')} className="w-8 h-8" />
        <Text className=" text-center  text-xl text-black font-semibold">
          PixelTide
        </Text>
      </View>
    </View>
  );
};

export default CustomHeader;
