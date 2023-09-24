import {
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import AdsScreen from '../../components/AdsScreen';
import CustomHeader from '../../components/CustomHeader';
import {Databases, Query} from 'appwrite';
import {client} from '../../utils/Appwrite';
import RandomImageView from '../../components/RandomImageView';

const ItemsPage = ({navigation}: any) => {
  const [wallPapersData, setWallPapersData] = useState<any[]>([]);

  const route: any = useRoute();
  const idx = route?.params?.id;
  //Get all images accrodering to current id
  const databases = new Databases(client);

  useEffect(() => {
    let promise = databases.listDocuments(
      '650e5c46012814d1e192',
      '650e7afb317b11350253',
      [Query.equal('cat_id', [idx])],
    );

    promise.then(
      function (response) {
        const data: any[] = response?.documents;
        const temData = data?.map(item => ({
          id: item.$id,
          total_download: item?.total_download,
          imgURL: item?.img_path,
        }));
        data && setWallPapersData(temData);
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
      <CustomHeader toggleDrawer={() => navigation.openDrawer()} />
      {/* header of type wallpaper showing to the user */}
      <Text className="text-center font-semibold text-lg  text-black -mt-3">
        {route?.params?.text}
      </Text>

      {/* tabs for titles */}

      {/* Main component */}
      {wallPapersData.length > 0 ? (
        <RandomImageView data={wallPapersData} />
      ) : (
        <ActivityIndicator size={25} className="pt-4" color={''} />
      )}

      <View className=" absolute bottom-0">
        <AdsScreen />
      </View>
    </View>
  );
};

export default ItemsPage;

const styles = StyleSheet.create({});
