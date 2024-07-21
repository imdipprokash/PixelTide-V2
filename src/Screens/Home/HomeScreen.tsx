import {
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';

import {GradientColors} from '../../utils/Constant';
import LinearGradient from 'react-native-linear-gradient';
import {MasonryFlashList} from '@shopify/flash-list';

import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/Style';
import {handleAndroidPermissions, UUID} from '../../utils/UtilsFN';

import AnimeList from '../../Database/Anime.json';
import ArtImage from '../../Database/ArtImages.json';
import AnimalList from '../../Database/Animal.json';
import ArchitectureList from '../../Database/Architecture.json';
import CharacterList from '../../Database/Character.json';
import SciFiList from '../../Database/Sci-Fi.json';

const image_width = Number(Dimensions.get('screen').width / 2) - 15;
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

const HomeScreen = ({navigation}: any) => {
  const [activeCategory, setActiveCategory] = useState({
    id: 1,
    color_1: '#2f36f5',
    color_2: '#dd5b83',
    color_3: '#16a752',
    title: 'All',
  });

  const [imageUrls, setImageUrls] = useState(
    HandlerCategoryToShow(activeCategory.title).splice(0, 20),
  );
  // Ask for fle permission

  useEffect(() => {
    setImageUrls(HandlerCategoryToShow(activeCategory.title).splice(0, 20));
  }, [activeCategory]);

  useEffect(() => {
    handleAndroidPermissions();
  }, []);

  const ItemsList = ({item}: any) => {
    const [dimensions, setDimensions] = useState<{
      width: number;
      height: number;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      Image.getSize(
        item,
        (width, height) => {
          setDimensions({width, height});

          setLoading(false);

          // console.log({width, height});
        },
        error => {
          console.error(error);
          setLoading(false);
        },
      );
    }, [item]);

    if (loading) {
      return <ActivityIndicator key={UUID()} size="large" color="#0000ff" />;
    }

    return (
      <TouchableOpacity
        key={UUID()}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ItemView', {item, dimensions})}>
        <Image
          source={{uri: item}}
          style={{
            width: image_width,
            height: Number(dimensions?.height) * 0.26,
            margin: 2,
            borderRadius: 16,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
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

  const [top, setTop] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);
    // Replace this with your data fetching logic

    const newData: any = await fetchMoreData(page);

    setImageUrls([...imageUrls, ...newData]);
    setPage(page + 1);
    setLoading(false);
  };

  const fetchMoreData = async (page: any) => {
    // Mocking a network request
    return new Promise(resolve => {
      setTimeout(() => {
        const imagesUrls = HandlerCategoryToShow(activeCategory?.title).splice(
          0,
          20,
        );

        resolve(imagesUrls);
      }, 1500);
    });
  };
  console.log(imageUrls.length);
  const renderFooter = () => {
    return loading ? (
      <View style={{padding: 10}}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
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

      <MasonryFlashList
        onScrollToTop={renderFooter}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        style={{flex: 1}}
        numColumns={2}
        data={imageUrls}
        renderItem={({item, index}) => {
          return <ItemsList item={item} />;
        }}
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
