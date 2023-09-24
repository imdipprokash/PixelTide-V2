import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
type Props = {
  data: any[];
};

const RandomImageView = ({data}: Props) => {
  const [isImgLoading, setImgLoading] = useState(true);
  const nav = useNavigation();

  const ImageCard = ({item, style}: any) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);

    return (
      <TouchableOpacity
        onPress={() => {
          const imgUrl = item.imgURL;
          //@ts-ignore
          !isImgLoading && nav.navigate('ItemView', {imgUrl});
        }}
        key={item.id}
        style={[{marginTop: 12, flex: 1}, style]}>
        <View
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: 'stretch',
            borderRadius: 10,
            display: isImgLoading ? 'flex' : 'none',
            backgroundColor: '#f2f2f2',
          }}>
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item
              alignItems="center"
              justifyContent="center">
              <SkeletonPlaceholder.Item
                width={randomBool ? 150 : 280}
                height={200}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
        <Image
          source={{uri: item.imgURL}}
          style={{
            height: randomBool ? 150 : 280,
            alignSelf: 'stretch',
            borderRadius: 10,
          }}
          resizeMode="contain"
          onLoad={() => setImgLoading(false)}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, i}: any) => {
    return <ImageCard item={item} style={{marginLeft: i % 2 === 0 ? 0 : 12}} />;
  };
  return (
    <MasonryList
      keyExtractor={item => item.id}
      ListHeaderComponent={<View />}
      contentContainerStyle={{
        paddingHorizontal: 4,
        alignSelf: 'stretch',
      }}
      onEndReached={() => console.log('onEndReached')}
      numColumns={2}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default RandomImageView;

const styles = StyleSheet.create({});
