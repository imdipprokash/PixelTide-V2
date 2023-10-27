import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ArrowUpTrayIcon,
  ArrowDownCircleIcon,
  HeartIcon,
} from 'react-native-heroicons/solid';
import ImageCardView from '../../components/ImageCardView';

type Props = {};

const UserSrc = (props: Props) => {
  return (
    <View className="">
      {/* User Basic info sections */}
      <View>
        <View className="w-[100px] mx-auto mt-5 h-[100px] bg-blue-200 rounded-full "></View>
        <Text className="text-center py-1">Dipprokash S.</Text>
      </View>
      {/* User activitys */}
      <View className="flex-row space-x-2 mx-10 my-2">
        <View className="w-1/3 bg-slate-300 h-14 space-y-[2px] rounded-lg items-center justify-center">
          <Text>100</Text>
          <ArrowUpTrayIcon size={25} color={'#666'} />
        </View>
        <View className="w-1/3 bg-slate-300 h-14 space-y-[2px] rounded-lg items-center justify-center">
          <Text>100</Text>

          <ArrowDownCircleIcon size={25} color={'#666'} />
        </View>
        <View className="w-1/3 bg-slate-300 h-14 space-y-[2px] rounded-lg items-center justify-center">
          <Text>100</Text>
          <HeartIcon size={25} color={'#666'} />
        </View>
      </View>

      {/* User Uploaded Photos */}
      <View>
        <FlatList
          onEndReachedThreshold={20}
          data={[]}
          //   keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <ImageCardView imgURL={''} text={''} id={''} />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default UserSrc;

const styles = StyleSheet.create({});
