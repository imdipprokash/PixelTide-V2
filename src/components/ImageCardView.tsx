import {
  Image,
  StyleSheet,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, {useState} from 'react';
import {imageCardType} from '../../Typing';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../utils/Style';
import {useNavigation} from '@react-navigation/native';
import {ArrowSmallRightIcon} from 'react-native-heroicons/outline';
import AdsScreen from './AdsScreen';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ImageCardView = ({imgURL, id, text, index}: imageCardType) => {
  const [isImgLoading, setImgLoading] = useState(true);

  const nav = useNavigation();

  const isShowAds = index < 2 ? false : index % 2 === 0 ? true : false;

  return (
    <View>
      <TouchableOpacity
        className=" overflow-hidden shadow-sm"
        onPress={() => {
          //@ts-ignore
          !isImgLoading && nav.navigate('ItemsPage', {imgURL, id, text});
        }}
        style={{
          margin: SCREEN_WIDTH * 0.015,
          backgroundColor: '#fff',
          borderRadius: 10,
        }}
        key={id}>
        <View style={{display: isImgLoading ? 'flex' : 'none'}}>
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item
              alignItems="center"
              justifyContent="center">
              <SkeletonPlaceholder.Item
                width={SCREEN_WIDTH * 0.9}
                height={SCREEN_HEIGHT * 0.35}
                borderRadius={10}
                top={4}
              />

              <SkeletonPlaceholder.Item
                marginTop={20}
                width={80}
                height={25}
                left={-30}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>

        <FastImage
          source={{
            uri: imgURL,
            priority: FastImage.priority.high, // Adjust priority as needed
          }}
          style={[
            {
              width: SCREEN_WIDTH * 0.9,
              height: SCREEN_HEIGHT * 0.35,

              overflow: 'hidden',
              borderRadius: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              alignSelf: 'center',
              top: 4,
            },
            // Platform.OS === 'android' && {elevation: 3},
          ]}
          resizeMode={FastImage.resizeMode.cover}
          onLoad={() => {
            setImgLoading(false);
          }}
        />
        <View
          className="px-2 py-2 mt-2"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text className="text-gray-700 font-bold pl-2">{text}</Text>
          <View className="bg-blue-200 rounded-md py-1 px-3">
            <ArrowSmallRightIcon color={'#000'} size={20} />
          </View>
        </View>
      </TouchableOpacity>

      {isShowAds && (
        <View className="py-2">
          <AdsScreen />
        </View>
      )}
    </View>
  );
};

export default ImageCardView;

const styles = StyleSheet.create({});
