import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {SearchIcon} from '../assets/svg';
import {AppColor} from '../utils/Constant';

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <View style={styles?.mainContainer}>
      <TextInput placeholder="Find Wallpaper..." style={styles.inputBoxStyle} />
      <SearchIcon color={AppColor.iconColor} width={25} height={25} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  inputBoxStyle: {
    flexGrow: 1,
    color: AppColor.iconColor,
    fontSize: 16,
    fontFamily: 'PTSansRegular',
  },
});
