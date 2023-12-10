import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../components/CustomHeader';
import ImageCardView from '../../components/ImageCardView';
import {Databases} from 'appwrite';
import {client} from '../../utils/Appwrite';
import {CatMstDataReadType} from '../../../Typing';
import {CreateUser, getCoin, isUserPresent} from '../../utils/UtilsFN';
import {useAppDispatch} from '../../hooks/reduxHook';
import {ADD_USER} from '../../Redux/slices/userSlices';

const HomeScreen = ({navigation}: any) => {
  const [catMstData, setCatMstData] = useState<CatMstDataReadType[]>([]);
  const dispatch = useAppDispatch();
  const DeviceIndentify = async () => {
    const result = await isUserPresent();
    console.log(result);
    if (result?.total === 0) {
      // User not present present
      const userWithCoinInfo = await CreateUser();

      dispatch(
        ADD_USER({
          userName: '',
          //@ts-ignore
          id: userWithCoinInfo?.user_id,
          email: '',
          mac: '',
          photo: '',
          //@ts-ignore
          coin: userWithCoinInfo?.coin,
          //@ts-ignore

          coin_id: userWithCoinInfo?.$id,
        }),
      );
    } else {
      const res = await getCoin(result?.documents[0].$id);
      console.log('Coin get user present', res);
      if (res?.documents.length > 0) {
        const data = res?.documents[0];
        dispatch(
          ADD_USER({
            userName: '',
            id: data?.user_id,
            email: '',
            mac: '',
            photo: '',
            coin: data?.coin,
            coin_id: data?.$id,
          }),
        );
      }
    }
  };

  useEffect(() => {
    DeviceIndentify();
  }, []);

  // Read data from appwrite
  const databases = new Databases(client);
  let promise = databases.listDocuments(
    '650e5c46012814d1e192',
    '650e7a7bee4536dded95',
  );

  useEffect(() => {
    promise.then(
      function (response) {
        const data: any[] = response?.documents;
        const temData = data?.map((item, index) => ({
          id: index + 1,
          collectionId: item?.$id,
          title: item?.cat_name,
          img_path: item?.init_wall_paper,
        }));
        data && setCatMstData(temData);
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {/* Status Bar */}
      <StatusBar backgroundColor={'#f2f2f2'} barStyle={'dark-content'} />
      {/* Custom Header */}
      <CustomHeader
        isHomepage={true}
        toggleDrawer={() => navigation.openDrawer()}
      />

      {/* Main component */}
      {catMstData.length > 0 ? (
        <FlatList
          onEndReachedThreshold={20}
          data={catMstData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <ImageCardView
              index={index}
              imgURL={item.img_path}
              text={item.title}
              id={item.collectionId}
            />
          )}
          numColumns={1}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          <ActivityIndicator size={25} className="pt-4" color={''} />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
