import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import {GetImageByCategory} from '../../apis/Images';
import {FlashList} from '@shopify/flash-list';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {UUID} from '../../utils/UtilsFN';
import AdsScreen from '../../components/AdsScreen';

// ads ins
import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-3346761957556908/9282538858';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

type Props = {};

const CategoryScr = ({route}: any) => {
  const {category_name} = route.params;
  const nav = useNavigation<any>();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const GetImageByCategoryHandler = async () => {
    const res = await GetImageByCategory({category_name: category_name});

    if (res?.data) {
      setData(res?.data);
    }
  };
  useEffect(() => {
    GetImageByCategoryHandler();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = interstitial.addAdEventListener(
        AdEventType.LOADED,
        () => {
          setLoaded(true);
        },
      );

      interstitial.load();

      return unsubscribe;
    }, [loaded]),
  );

  const renderItem = ({item, index}: any) => {
    const is1StCol = index % 2 === 0 ? true : false;

    return (
      <TouchableOpacity
        key={UUID()}
        style={{flexGrow: 1, alignItems: 'center'}}
        onPress={() => {
          if (loaded) {
            interstitial.show().then(() => {
              setLoaded(false);
              nav.navigate('ItemOverview', {image_url: item?.image_url});
            });
          } else {
            nav.navigate('ItemOverview', {image_url: item?.image_url});
          }
        }}>
        <Image
          source={{uri: item?.image_url}}
          resizeMode={'stretch'}
          style={{
            width: SIZES.ScreenWidth * 0.435,
            height:
              index === 0
                ? SIZES.ScreenHeight * 0.31
                : SIZES.ScreenHeight * 0.35,
            borderRadius: SIZES.ScreenHeight * 0.013,
            marginBottom: SIZES.ScreenHeight * 0.012,
            marginTop:
              index === 0 ? 0 : is1StCol ? -SIZES.ScreenHeight * 0.04 : 0,
          }}
        />
      </TouchableOpacity>
    );
  };

  const SkeltonView = () => {
    const items = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];

    return (
      <SkeletonPlaceholder borderRadius={16}>
        <SkeletonPlaceholder.Item gap={20} flexDirection="column">
          {items?.map((item, index) => {
            return (
              <SkeletonPlaceholder.Item
                key={UUID()}
                gap={20}
                flexDirection="row">
                <SkeletonPlaceholder.Item
                  key={UUID()}
                  width={SIZES.ScreenWidth * 0.43}
                  height={
                    index === 0
                      ? SIZES.ScreenHeight * 0.31
                      : SIZES.ScreenHeight * 0.35
                  }
                  marginTop={index === 0 ? 0 : -SIZES.ScreenHeight * 0.04}
                />
                <SkeletonPlaceholder.Item
                  key={UUID()}
                  width={SIZES.ScreenWidth * 0.43}
                  height={SIZES.ScreenHeight * 0.35}
                />
              </SkeletonPlaceholder.Item>
            );
          })}
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  return (
    <View style={styles?.mainContainer}>
      <Text style={styles.titleTextStyle}>{category_name}</Text>
      <Text style={styles.subTextStyle}>
        {data.length} wallpaper available{' '}
      </Text>
      {data?.length === 0 ? (
        SkeltonView()
      ) : (
        <FlashList
          numColumns={2}
          estimatedItemSize={4000}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
        />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 1,
          alignSelf: 'center',
        }}>
        <AdsScreen />
      </View>
    </View>
  );
};

export default CategoryScr;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColor.bgColor,
    paddingTop: SIZES.ScreenHeight * 0.06,
    paddingHorizontal: 16,
    gap: 8,
  },
  titleTextStyle: {
    color: AppColor.titleTextColor,
    fontSize: 30,
    fontFamily: 'PTSansBold',
  },
  subTextStyle: {
    color: AppColor.iconColor,
    fontSize: 18,
    fontFamily: 'PTSansRegular',
    bottom: 10,
  },
});
