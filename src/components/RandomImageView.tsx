import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../utils/Style';
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
            <SkeletonPlaceholder.Item>
              <SkeletonPlaceholder.Item
                height={randomBool ? 150 : 280}
                width={SCREEN_WIDTH / 2 - 20}
                borderRadius={10}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
        <Image
          source={{uri: item.imgURL}}
          style={{
            height: SCREEN_HEIGHT * 0.6,
            width: SCREEN_WIDTH * 0.9,
            borderRadius: 10,
          }}
          resizeMode="cover"
          onLoad={() => setImgLoading(false)}
        />
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, i}: any) => {
    return <ImageCard item={item} />;
  };
  return (
    <MasonryList
      keyExtractor={item => item.id}
      ListHeaderComponent={<View />}
      contentContainerStyle={{
        paddingHorizontal: 4,
      }}
      onEndReached={() => console.log('onEndReached')}
      numColumns={1}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default RandomImageView;

const styles = StyleSheet.create({});
