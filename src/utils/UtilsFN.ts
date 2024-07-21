import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const handleAndroidPermissions = async (): Promise<boolean> => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    try {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      const granted = Object.values(result).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (granted) {
        console.debug(
          '[handleAndroidPermissions] User accepts runtime permissions android 12+',
        );
        return true;
      } else {
        console.error(
          '[handleAndroidPermissions] User refuses runtime permissions android 12+',
        );
        return false;
      }
    } catch (err) {
      console.error(
        '[handleAndroidPermissions] Permission request error:',
        err,
      );
      return false;
    }
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
    try {
      const checkResult = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (checkResult) {
        console.debug(
          '[handleAndroidPermissions] Runtime permission Android <12 already OK',
        );
        return true;
      } else {
        const requestResult = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
          console.debug(
            '[handleAndroidPermissions] User accepts runtime permission android <12',
          );
          return true;
        } else {
          console.error(
            '[handleAndroidPermissions] User refuses runtime permission android <12',
          );
          return false;
        }
      }
    } catch (err) {
      console.error(
        '[handleAndroidPermissions] Permission request error:',
        err,
      );
      return false;
    }
  }
  return true;
};

export const handleDownload = async (url: string) => {
  // Ensure you have permission if the device is android
  if (Platform.OS === 'android' && Platform.Version >= 23) {
    const permissionsGranted = await handleAndroidPermissions();
    if (!permissionsGranted) {
      Alert.alert(
        'Permissions Required',
        'The app needs permissions to download files. Please enable them in the app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: () => Linking.openSettings()},
        ],
        {cancelable: false},
      );
      return;
    }
  }

  try {
    const {fs} = RNFetchBlob;
    let PictureDir = fs.dirs.DownloadDir;
    const dirPath = PictureDir + '/PixelTide';

    // Ensure the directory exists
    if (!(await fs.exists(dirPath))) {
      await fs.mkdir(dirPath);
    }

    const imgPath =
      dirPath + '/pixel_tide' + Math.floor(Math.random() * 10000) + '.jpg';

    await RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: imgPath,
        description: imgPath + ' is Downloaded.',
        title: 'PixelTide',
      },
      path: imgPath,
    })
      .fetch('GET', url)
      .then(() => {
        ToastAndroid.showWithGravity(
          'Download successful, Please check your download folder.',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  } catch (err: any) {
    ToastAndroid.showWithGravity(
      'Please try again!',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
};

export const UUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// export const CreateUser = async () => {
//   const macId = (await DeviceInfo.getMacAddress()) + DeviceInfo.getDeviceId();
//   let promise = await databases.createDocument(
//     '650e5c46012814d1e192',
//     '651c0c25f11674afc26d',
//     ID.unique(),
//     {
//       user_name: null,
//       email_id: null,
//       mobile_no: null,
//       user_dev_mac: macId || 'test_mac_id',
//     },
//   );
//   if (promise) {
//     let coinCreate = await databases.createDocument(
//       '650e5c46012814d1e192',
//       '6575854989858428d340',
//       ID.unique(),
//       {
//         user_id: promise?.$id,
//         coin: 100,
//         total_download: 0,
//       },
//     );
//     return coinCreate;
//   } else {
//     return 0;
//   }
// };

// export const isUserPresent = async () => {
//   const macId = (await DeviceInfo.getMacAddress()) + DeviceInfo.getDeviceId();
//   let promise = await databases.listDocuments(
//     '650e5c46012814d1e192',
//     '651c0c25f11674afc26d',
//     [Query.equal('user_dev_mac', [macId || 'test_mac_id'])],
//   );
//   return promise;
// };

// export const getCoin = async (Id: string) => {
//   let coinCreate = await databases.listDocuments(
//     '650e5c46012814d1e192',
//     '6575854989858428d340',
//     [Query.equal('user_id', [Id])],
//   );
//   return coinCreate;
// };
// export const updateCoin = async (user_id: string) => {
//   const res = await getCoin(user_id);
//   const data = res?.documents[0];
//   let promise = await databases.updateDocument(
//     '650e5c46012814d1e192',
//     '6575854989858428d340',
//     data?.$id,
//     {
//       user_id: data?.user_id,
//       coin: Number(data?.coin) + 100,
//       total_download: data?.data,
//     },
//   );
//   return promise;
// };
// export const deductCoinUpdateDownloadCount = async (user_id: string) => {
//   const res = await getCoin(user_id);
//   const data = res?.documents[0];
//   let promise = await databases.updateDocument(
//     '650e5c46012814d1e192',
//     '6575854989858428d340',
//     data?.$id,
//     {
//       user_id: data?.user_id,
//       coin: Number(data?.coin) - 100,
//       total_download: data?.total_download + 1,
//     },
//   );
//   return promise;
// };
