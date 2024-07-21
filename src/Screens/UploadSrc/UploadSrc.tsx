import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../utils/Style';
import {ArrowUpCircleIcon, ArrowUpTrayIcon} from 'react-native-heroicons/solid';
import {client} from '../../utils/Appwrite';
import {Databases} from 'appwrite';
import {CatMstDataReadType} from '../../../Typing';

type Props = {};

const UploadSrc = (props: Props) => {
  const [catMstData, setCatMstData] = useState<CatMstDataReadType[]>([]);

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
        // const temData = data?.map((item, index) => ({
        //   id: index + 1,
        //   collectionId: item?.$id,
        //   title: item?.cat_name,
        //   img_path: item?.init_wall_paper,
        // }));
        // data && setCatMstData(temData);
        console.log(data);
      },
      function (error) {
        console.log(error);
      },
    );
  }, []);
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Text className="text-xl text-black font-semibold uppercase py-4 text-center">
        My Upload
      </Text>

      <View
        style={styles.imgContiner}
        className="flex items-center justify-center mx-auto">
        <Text>Upload photo</Text>
        <ArrowUpCircleIcon color={'#0000ff'} size={45} />
      </View>
      <Text className=" text-left px-4 pt-2 text-black font-semibold text-lg">
        Title :
      </Text>
      <TextInput
        placeholder="Enter photo title"
        className="border-[1px] px-2 my-2 rounded-md w-11/12 h-10 mx-auto"
      />
      <Text className=" text-left px-4 pt-4 text-black font-semibold text-lg">
        Select Category :
      </Text>
      <TextInput
        placeholder="Enter photo title"
        className="border-[1px] px-2 my-2 rounded-md w-11/12 h-10 mx-auto"
      />
      <Text className=" text-left px-4 pt-2 text-black font-semibold text-lg">
        Description :
      </Text>
      <TextInput
        multiline
        numberOfLines={4}
        placeholder="Enter Description"
        textAlignVertical="top" // Align text to the top
        textAlign="left" // Align text to the left
        className="border-[1px] px-2 my-2 rounded-md w-11/12 text-start  mx-auto"
      />

      <TouchableOpacity className="w-6/12 flex-row mx-auto mb-20 bg-blue-700 px-6 py-2 mt-6 rounded-lg items-center justify-center space-x-1">
        <ArrowUpTrayIcon size={20} color={'#fff'} />
        <Text className="text-center text-white text-lg  tracking-wider">
          Upload
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UploadSrc;

const styles = StyleSheet.create({
  imgContiner: {
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.3,
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
  },
});
