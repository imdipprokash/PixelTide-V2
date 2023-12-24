import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import AdsScreen from '../../components/AdsScreen';
import CustomHeader from '../../components/CustomHeader';
import {Databases, Query} from 'appwrite';
import {client} from '../../utils/Appwrite';
import MasonryList from '@react-native-seoul/masonry-list';
import {useNavigation} from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SCREEEN_WIDTH, SCREEN_HEIGHT} from '../../utils/Style';
import {
  UUID,
  deductCoinUpdateDownloadCount,
  handleDownload,
} from '../../utils/UtilsFN';
import FastImage from 'react-native-fast-image';
import {ToastAndroid} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHook';
import {ADD_USER} from '../../Redux/slices/userSlices';

const ItemsPage = ({navigation}: any) => {
  const [wallPapersData, setWallPapersData] = useState<any[]>([]);

  //

  const [isLoading, setisLoading] = useState<boolean>(false);
  const [lastId, setLastId] = useState<string | null>(null);

  const nav = useNavigation();
  const dispatch = useAppDispatch();
  const {id, coin} = useAppSelector(state => state.user);

  const route: any = useRoute();
  const idx = route?.params?.id;
  //Get all images accrodering to current id
  const databases = new Databases(client);

  const ImageCard = ({item, index}: any) => {
    const isShowAds = index < 2 ? false : index % 2 === 0 ? true : false;

    const [isImgLoading, setImgLoading] = useState(true);

    const updateCoinHandler = async () => {
      if (id) {
        const res = await deductCoinUpdateDownloadCount(id);
        if (res) {
          console.log(res);
          dispatch(
            ADD_USER({
              userName: '',
              //@ts-ignore
              id: res?.user_id,
              email: '',
              mac: '',
              photo: '',
              //@ts-ignore
              coin: res?.coin,
              //@ts-ignore

              coin_id: res?.$id,
            }),
          );
        }
      }
    };

    const renderSkeletonPlaceholder = () => {
      return (
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              height={SCREEN_HEIGHT * 0.6}
              width={SCREEEN_WIDTH * 0.9}
              borderRadius={10}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      );
    };
    const handleImageLoad = () => {
      setImgLoading(false);
    };
    const DownloadHandler = () => {
      handleDownload(item?.imgURL);
      ToastAndroid.showWithGravity(
        'Downloading...',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );

      // if (coin < 100) {
      //   ToastAndroid.showWithGravity(
      //     'Please earn coin to download',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.CENTER,
      //   );
      // } else {
      //   updateCoinHandler();
      //   handleDownload(item?.imgURL);
      //   ToastAndroid.showWithGravity(
      //     'Downloading...',
      //     ToastAndroid.SHORT,
      //     ToastAndroid.CENTER,
      //   );
      // }
    };
    return (
      <View>
        <View
          style={[{marginTop: 12, flex: 1, position: 'relative'}]}
          key={item.id}>
          {isImgLoading && renderSkeletonPlaceholder()}
          {!isImgLoading && (
            <TouchableOpacity
              onPress={DownloadHandler}
              activeOpacity={0.7}
              className="absolute w-2/3 bottom-4 rounded-md bg-blue-500  z-50 self-center">
              <Text className="text-white font-semibold p-2 text-center">
                Download
              </Text>
            </TouchableOpacity>
          )}
          <FastImage
            source={{uri: item?.imgURL}}
            style={{
              height: SCREEN_HEIGHT * 0.6,
              width: SCREEEN_WIDTH * 0.9,
              borderRadius: 10,
              alignSelf: 'center',
            }}
            resizeMode="cover"
            onLoad={handleImageLoad}
            onLoadEnd={handleImageLoad}
          />
        </View>
        {isShowAds && (
          <View className="py-2">
            <AdsScreen />
          </View>
        )}
      </View>
    );
  };

  const getImageInfo = async () => {
    const result = await databases.listDocuments(
      '650e5c46012814d1e192',
      '650e7afb317b11350253',

      [Query.equal('cat_id', [idx]), Query.limit(10)],
    );
    if (result.documents) {
      if (result.documents.length === 10) {
        const currentlastID = result.documents[result.documents.length - 1].$id;
        setLastId(currentlastID.toString());
      } else {
        setLastId(null);
      }

      const data = result?.documents;
      const temData = data?.map(item => ({
        id: item.$id,
        total_download: item?.total_download,
        imgURL: item?.img_path,
      }));

      setWallPapersData(temData);
    } else {
      console.log(result);
    }
  };

  const getMoreImageInfo = async () => {
    if (lastId) {
      setisLoading(true);
      const result = await databases.listDocuments(
        '650e5c46012814d1e192',
        '650e7afb317b11350253',
        [
          Query.equal('cat_id', [idx]),
          Query.limit(10),
          Query.cursorAfter(lastId),
        ],
      );
      if (result.documents) {
        if (result.documents.length === 10) {
          const currentlastID =
            result.documents[result.documents.length - 1].$id;
          setLastId(currentlastID.toString());
        } else {
          setLastId(null);
        }
        setisLoading(false);
        const data = result?.documents;
        const temData = data?.map(item => ({
          id: item.$id,
          total_download: item?.total_download,
          imgURL: item?.img_path,
        }));
        setWallPapersData(prev => [...prev, ...temData]);
      } else {
        console.log(result);
        setisLoading(false);
      }
    }
  };
  useEffect(() => {
    getImageInfo();
  }, []);
  return (
    <View style={{flex: 1, paddingHorizontal: 15}}>
      {/* Status Bar */}
      <StatusBar backgroundColor={'#f2f2f2'} barStyle={'dark-content'} />
      {/* Custom Header */}
      <CustomHeader
        title={route?.params?.text}
        toggleDrawer={() => navigation.openDrawer()}
      />

      {/* Main component */}
      {wallPapersData.length > 0 ? (
        <MasonryList
          data={wallPapersData}
          keyExtractor={item => UUID()}
          ListHeaderComponent={<View />}
          contentContainerStyle={{}}
          onEndReached={() => !isLoading && getMoreImageInfo()}
          numColumns={1}
          renderItem={item => <ImageCard index={item.i} item={item?.item} />}
          ListFooterComponent={
            isLoading ? (
              <View style={{paddingVertical: 10}}>
                <ActivityIndicator animating size="large" />
              </View>
            ) : (
              <View></View>
            )
          }
        />
      ) : (
        <ActivityIndicator size={25} className="pt-4" color={''} />
      )}
    </View>
  );
};

export default ItemsPage;

const styles = StyleSheet.create({});
