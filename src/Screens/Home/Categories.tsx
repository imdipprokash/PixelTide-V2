import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import {Categories_Data} from '../../Database/TempFile';

type Props = {};

const Categories = (props: Props) => {
  const renderItem = ({item, index}: any) => {
    const isOdd = (index + 1) % 2;

    console.log(isOdd);
    return (
      <View
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          marginLeft: isOdd !== 0 ? 0 : SIZES.ScreenWidth * 0.04,
        }}>
        <ImageBackground
          source={{uri: item?.image_path}}
          style={{
            width: SIZES.ScreenWidth * 0.44,
            height: 100,
            zIndex: -10,
            borderRadius: 50,
            opacity: 0.8,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: '40%',
            fontSize: 20,
            fontFamily: 'PTSansBold',
            color: AppColor.bgColor,
          }}>
          {item?.title}
        </Text>
      </View>
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTextStyle}>Categories</Text>
      <FlatList
        contentContainerStyle={{gap: 15}}
        numColumns={2}
        data={Categories_Data}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Categories;

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
});
