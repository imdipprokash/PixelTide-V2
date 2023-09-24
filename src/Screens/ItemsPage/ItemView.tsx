import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {SCREEEN_WIDTH, SCREEN_HEIGHT} from '../../utils/Style';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {ArrowDownTrayIcon} from 'react-native-heroicons/outline';
import AdsScreen from '../../components/AdsScreen';
import {handleDownload} from '../../utils/UtilsFN';
import RewardVideoAds from '../../components/RewardVideoAds';

const ItemView = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {params}: any = useRoute();

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {/* Reword ads */}
      <RewardVideoAds adsShowHnadler={isLoading} />
      {/* Status Bar */}
      <StatusBar backgroundColor={'#f2f2f2'} barStyle={'dark-content'} />

      <View className=" absolute top-3 px-4 z-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex flex-row space-x-2 items-center bg-gray-100 p-1 px-3 rounded-xl">
          <ArrowLeftIcon size={18} color={'#000'} />
          <Text className="text-black">Back</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: params?.imgUrl,
        }}
        style={{
          width: SCREEEN_WIDTH * 0.95,
          height: SCREEN_HEIGHT * 0.96,
          borderRadius: 10,
        }}
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={() => {
          handleDownload(params?.imgUrl);
          setIsLoading(true);
          ToastAndroid.showWithGravity(
            'Downloading...',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }}
        style={{
          width: SCREEEN_WIDTH * 0.8,
        }}
        className=" flex flex-row justify-center space-x-2 absolute bottom-16 items-center  py-3   bg-blue-500 rounded-md self-center">
        <ArrowDownTrayIcon size={20} color={'#fff'} />
        <Text className="text-white font-semibold italic text-center">
          Download
        </Text>
      </TouchableOpacity>
      <View className=" absolute bottom-0">
        <AdsScreen />
      </View>
    </View>
  );
};

export default ItemView;

const styles = StyleSheet.create({});
