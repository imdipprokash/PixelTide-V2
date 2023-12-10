import {StyleSheet} from 'react-native';
import {RewardedAd, RewardedAdEventType} from 'react-native-google-mobile-ads';
import React, {useEffect, useState} from 'react';
import {REWARDED_ID} from '../utils/AdsIds';
import {updateCoin} from '../utils/UtilsFN';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHook';
import {ADD_USER} from '../Redux/slices/userSlices';

type Props = {
  adsShowHnadler: boolean;
};

const rewarded = RewardedAd.createForAdRequest(REWARDED_ID, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const RewardVideoAds = ({adsShowHnadler}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const {id} = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const updateCoinHandler = async () => {
    if (id) {
      const res = await updateCoin(id);
      if (res) {
        dispatch(
          ADD_USER({
            userName: '',
            //@ts-ignore
            id: res?.user_id,
            email: '',
            mac: '',
            photo: '',
            //@ts-ignore
            coin: res?.coin,
            //@ts-ignore

            coin_id: res?.$id,
          }),
        );
      }
    }
  };
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    // Start loading the rewarded ad straight away
    adsShowHnadler === true && rewarded.load();

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        rewarded.load();
        setLoaded(false);
        updateCoinHandler();
      },
    );

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
