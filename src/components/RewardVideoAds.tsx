import {StyleSheet} from 'react-native';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import React, {useEffect, useState} from 'react';
import {REWARDED_ID} from '../utils/AdsIds';

type Props = {
  adsShowHnadler?: boolean;
};

const rewarded = RewardedAd.createForAdRequest(REWARDED_ID, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const RewardVideoAds = ({adsShowHnadler}: Props) => {
  const [loaded, setLoaded] = useState(false);

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
        rewarded.load();
        setLoaded(false);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [adsShowHnadler]);

  useEffect(() => {
    loaded === true && rewarded.show();
  }, [loaded]);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return <></>;
};

export default RewardVideoAds;

const styles = StyleSheet.create({});
