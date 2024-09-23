import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import {GetImages} from '../../apis/Images';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {UUID} from '../../utils/UtilsFN';

type Props = {};

const CategoryScr = (props: Props) => {
  const nav = useNavigation<any>();
  const [data, setData] = useState([]);
  const GetBestOfMonth = async () => {
    const res = await GetImages();
    if (res !== 0) {
      setData(res);
    }
  };
  useEffect(() => {
    GetBestOfMonth();
  }, []);

  const renderItem = ({item, index}: any) => {
    const is1StCol = index % 2 === 0 ? true : false;

    return (
      <TouchableOpacity
        key={UUID()}
        style={{flexGrow: 1, alignItems: 'center'}}
        onPress={() => {
          nav.navigate('ItemOverview', {image_url: item?.image_url});
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
      <Text style={styles.titleTextStyle}>Nature</Text>
      <Text style={styles.subTextStyle}>36 wallpaper available </Text>
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
