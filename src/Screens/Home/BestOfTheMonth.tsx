import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
// import {FlashList} from '@shopify/flash-list';
import {UUID} from '../../utils/UtilsFN';
import {Images} from '../../Database/TempFile';

type Props = {};

const BestOfTheMonth = (props: Props) => {
  const renderItem = ({item}: any) => {
    return (
      <View
        key={item?.id}
        style={{marginRight: 20, borderRadius: 16, overflow: 'hidden'}}>
        <Image
          source={{uri: item?.image_path}}
          style={{width: 200, height: 300, borderRadius: 16}}
        />
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTextStyle}>Best of the month</Text>
      <FlatList
        // estimatedItemSize={400}
        data={Images}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
