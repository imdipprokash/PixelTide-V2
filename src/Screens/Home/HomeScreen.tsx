import {StyleSheet, Text, View, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import SearchBar from '../../components/SearchBar';
import BestOfTheMonth from './BestOfTheMonth';
import Categories from './Categories';

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColor.bgColor}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={styles.mainContainer}>
        {/* SearchBar */}
        <SearchBar />
        {/* Best of the month */}
        <BestOfTheMonth />
        {/* Categories */}
        <Categories />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: SIZES.ScreenHeight * 0.08,
    paddingHorizontal: 16,
    gap: 15,
  },
});
