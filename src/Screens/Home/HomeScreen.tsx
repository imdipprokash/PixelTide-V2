import {
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import {useAppDispatch} from '../../hooks/reduxHook';
import {GradientColors} from '../../utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import {MasonryFlashList} from '@shopify/flash-list';

import {SCREEEN_WIDTH, SCREEN_HEIGHT} from '../../utils/Style';
import {handleAndroidPermissions} from '../../utils/UtilsFN';

import AnimeList from '../../Database/Anime.json';
import ArtImage from '../../Database/ArtImages.json';
import AnimalList from '../../Database/Animal.json';
import ArchitectureList from '../../Database/Architecture.json';
import CharacterList from '../../Database/Character.json';
import SciFiList from '../../Database/Sci-Fi.json';

const HomeScreen = ({navigation}: any) => {
  // Ask for fle permission

  useEffect(() => {
    handleAndroidPermissions();
  }, []);

  const [activeCategory, setActiveCategory] = useState({
    id: 1,
    color_1: '#2f36f5',
    color_2: '#dd5b83',
    color_3: '#16a752',
    title: 'All',
  });

  const HandlerCategoryToShow = (selectedTitle: string) => {
    if (selectedTitle === 'All') {
      return ArtImage.sort((a: string, b: string) => a.length - b.length);
    }
    if (selectedTitle === 'Anime') {
      return AnimeList;
    }
    if (selectedTitle === 'Sci-Fi') {
      return SciFiList;
    }
    if (selectedTitle === 'Character') {
      return CharacterList;
    }
    if (selectedTitle === 'Architecture') {
      return ArchitectureList;
    }
    if (selectedTitle === 'Animal') {
      return AnimalList;
    }
    if (selectedTitle === 'Art') {
      return ArtImage;
    }
    return [];
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.container} key={item.id}>
        <LinearGradient
          colors={[item?.color_1, item?.color_2, item?.color_3]}
          start={{x: 0.0, y: 1.0}}
          end={{x: 1.0, y: 1.0}}
          style={styles.gradient}>
          <TouchableOpacity
            onPress={() => setActiveCategory(item)}
            style={[
              styles.buttonContainer,
              {
                backgroundColor:
                  item?.id === activeCategory?.id ? 'transparent' : '#ffff',
              },
            ]}>
            <Text style={styles.buttonText}>{item?.title}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const ImageRender = ({item, index}: {item: string; index: number}) => {
    const even = index % 2 === 0;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ItemView', {item})}>
        <Image
          source={{uri: item}}
          style={{
            marginTop: even ? 0 : 10,
            marginBottom: even ? 10 : 0,
            width: SCREEEN_WIDTH * 0.46,
            margin: 3,
            borderRadius: 10,
            height: even ? SCREEN_HEIGHT * 0.4 : SCREEN_HEIGHT * 0.42,
            overflow: 'hidden',
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {/* Status Bar */}
      <StatusBar backgroundColor={'#f2f2f2'} barStyle={'dark-content'} />
      {/* Custom Header */}
      <CustomHeader
        isHomepage={true}
        toggleDrawer={() => navigation.openDrawer()}
      />

      {/*Top Bar */}
      <FlatList
        style={{maxHeight: 50, marginTop: -10}}
        data={GradientColors}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
      />

      {/*Image View with Masonry List */}
      <MasonryFlashList
        onEndReachedThreshold={20}
        data={HandlerCategoryToShow(activeCategory?.title)}
        numColumns={2}
        renderItem={({item, index}) => (
          <ImageRender item={item} index={index} />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    gap: 1,
    marginEnd: 6,
  },
  gradient: {
    height: 40,
    width: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    width: '99%',
    margin: 1,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    alignSelf: 'center',
  },
  itemContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
