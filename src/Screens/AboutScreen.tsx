import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import AdsScreen from '../components/AdsScreen';
import {BANNER_ID2} from '../utils/AdsIds';
import {_mainStyle} from '../utils/Style';
type Props = {};

const AboutScreen = ({navigation}: any) => {
  return (
    <>
      <View style={_mainStyle._mainView}>
        <CustomHeader toggleDrawer={() => navigation.openDrawer()} />
        <Text className="text-black font-bold text-center text-xl">
          About Us
        </Text>
        <Text className="text-gray-600 text-lg px-4 py-6">
          This amazing platform is absolutely free for you to use. You have the
          opportunity to showcase your stunning photos and earn money by
          allowing other users to download them. It's an inclusive platform,
          where anyone can upload and anyone can download images. If you
          encounter any issues at all, please don't hesitate to reach out to me
          via email at pixeltide@gmail.com
        </Text>
        <TouchableOpacity
          className="mx-auto my-10"
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <Text className="text-black px-4 py-3 bg-blue-400 rounded-full w-40 text-center">
            ← Back
          </Text>
        </TouchableOpacity>
      </View>
      <AdsScreen ADS_ID={BANNER_ID2} />
    </>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({});
