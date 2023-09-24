import {StyleSheet, Text, View} from 'react-native';
import {GAMBannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import React from 'react';
import {BANNER_ID3} from '../utils/AdsIds';

type Props = {
  ADS_ID?: string;
};

const AdsScreen = ({ADS_ID}: Props) => {
  return (
    <GAMBannerAd
      unitId={ADS_ID ? ADS_ID : BANNER_ID3}
      sizes={[BannerAdSize.ANCHORED_ADAPTIVE_BANNER]}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
      onAdLoaded={() => {
        console.log('Ad loaded');
      }}
      onAdFailedToLoad={error => {
        console.error('Ad failed to load: ', error);
      }}
    />
  );
};

export default AdsScreen;

const styles = StyleSheet.create({});
