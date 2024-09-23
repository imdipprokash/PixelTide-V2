import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import {UUID} from '../../utils/UtilsFN';
import {GetImages} from '../../apis/Images';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {};

const BestOfTheMonth = (props: Props) => {
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

  const renderItem = ({item}: any) => {
    return (
      <View
        key={UUID()}
        style={{marginRight: 20, borderRadius: 16, overflow: 'hidden'}}>
        <TouchableOpacity activeOpacity={0.6}>
          <Image
            source={{uri: item?.image_url}}
            style={{
              width: SIZES.ScreenWidth * 0.5,
              height: SIZES.ScreenHeight * 0.3,
              borderRadius: 16,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTextStyle}>Best of the month</Text>
      {/* Show Images or skelton */}
      {data?.length === 0 ? (
        <SkeletonPlaceholder borderRadius={16}>
          <SkeletonPlaceholder.Item gap={20} flexDirection="row">
            <SkeletonPlaceholder.Item
              width={SIZES.ScreenWidth * 0.5}
              height={SIZES.ScreenHeight * 0.3}
            />
            <SkeletonPlaceholder.Item
              width={SIZES.ScreenWidth * 0.5}
              height={SIZES.ScreenHeight * 0.3}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default BestOfTheMonth;

const styles = StyleSheet.create({
  titleTextStyle: {
    color: AppColor.titleTextColor,
    fontSize: 19,
    fontFamily: 'PTSansBold',
  },
  mainContainer: {
    gap: 15,
    height: SIZES.ScreenHeight * 0.35,
  },
  wrapper: {},
  itemViewStyle: {
    width: SIZES.ScreenWidth * 0.4,

    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
