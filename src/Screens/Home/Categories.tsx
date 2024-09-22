import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import {Categories_Data} from '../../Database/TempFile';

type Props = {};

const Categories = (props: Props) => {
  const chunkArray = (array: any, size: any) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const rows = chunkArray(Categories_Data, 2);
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleTextStyle}>Categories</Text>

      <View style={styles.container}>
        {rows.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((item: any, index: any) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={styles.btnStyle}>
                <ImageBackground
                  source={{uri: item?.image_path}}
                  style={styles.bgImage}
                />
                <Text style={styles.textStyle}>{item?.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
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
  },

  //
  container: {
    flex: 1,
    gap: 15,
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnStyle: {
    width: SIZES.ScreenWidth * 0.44,
    height: SIZES.ScreenHeight * 0.12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bgImage: {
    width: SIZES.ScreenWidth * 0.44,
    height: SIZES.ScreenHeight * 0.12,
    zIndex: -10,
    borderRadius: 50,
    opacity: 0.7,
  },
  textStyle: {
    position: 'absolute',
    alignSelf: 'center',
    top: '38%',
    fontSize: 20,
    fontFamily: 'PTSansBold',
    color: '#ffffff',
  },
});
