import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {SCREEEN_WIDTH, SCREEN_HEIGHT} from '../../utils/Style';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import {handleDownload} from '../../utils/UtilsFN';
import AdsScreen from '../../components/AdsScreen';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import {REWARDED_ID} from '../../utils/AdsIds';
const adUnitId = __DEV__ ? TestIds.REWARDED : REWARDED_ID;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: [
    'fashion',
    'clothing',
    'luxury',
    'designer',
    'style',
    'accessories',
  ],
});

const ItemView = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const {params}: any = useRoute();

  const [loaded, setLoaded] = useState(false);
  const handleShowAd = () => {
    if (!loaded) {
      rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoaded(true);
      });
    } else {
      rewarded?.show();
    }
  };
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {/* Reword ads */}

      {/* Status Bar */}
      <StatusBar backgroundColor={'#f2f2f2'} barStyle={'dark-content'} />

      {/* Ads */}
      <View style={{position: 'absolute', zIndex: 19, bottom: 75}}>
        <AdsScreen />
      </View>

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
          uri: params?.item,
        }}
        style={{
          width: SCREEEN_WIDTH * 0.95,
          height: SCREEN_HEIGHT * 0.96,
          borderRadius: 10,
        }}
        resizeMode="stretch"
      />

      <TouchableOpacity
        onPress={() => {
          handleShowAd();

          handleDownload(params?.item);
          setIsLoading(true);
          ToastAndroid.showWithGravity(
            'Downloading...',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          setIsLoading(true);
        }}
        style={{
          width: SCREEEN_WIDTH * 0.9,
          height: SCREEN_HEIGHT * 0.06,
        }}
        className=" flex flex-row justify-center space-x-1 absolute bottom-5 items-center  py-3   bg-blue-500 rounded-md self-center">
        <Text className="text-white font-semibold text-center text-xl">
          Download
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemView;

const styles = StyleSheet.create({});
