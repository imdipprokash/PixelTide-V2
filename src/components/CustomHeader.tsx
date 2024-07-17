import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  Bars3BottomLeftIcon,
  ArrowLeftIcon,
} from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import RewardVideoAds from './RewardVideoAds';
import {useAppSelector} from '../hooks/reduxHook';

interface Props {
  toggleDrawer: () => void;
  isHomepage?: boolean;
  title?: string;
}
const CustomHeader = ({toggleDrawer, isHomepage, title}: Props) => {
  const nav = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const {coin} = useAppSelector(state => state.user);
  const EarnHandler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <View className="py-2 flex-row items-center justify-between ">
      <RewardVideoAds adsShowHnadler={isLoading} />
      <View className="flex-row items-center">
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
        <View className="flex-row mx-auto">
          <Image source={require('../assets/logo.png')} className="w-8 h-8" />
          <Text className=" text-center  text-xl text-black font-semibold ">
            {title ? title : 'PixelTide'}
          </Text>
        </View>
      </View>
      {/* <View className="flex-row items-center">
        {isHomepage ? (
          <View className="pr-4 flex-row items-center gap-1">
            <Text className="text-orange-400 font-bold text-lg ">¥ {coin}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={EarnHandler}
            className="pr-4 flex-row items-center gap-1">
            <Text className="text-orange-600 font-bold text-lg ">¥ Earn</Text>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

export default CustomHeader;
