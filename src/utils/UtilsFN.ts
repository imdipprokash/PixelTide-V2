import {Alert, PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const handleAndroidPermissions = () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]).then(result => {
      if (result) {
        console.debug(
          '[handleAndroidPermissions] User accepts runtime permissions android 12+',
        );
      } else {
        console.error(
          '[handleAndroidPermissions] User refuses runtime permissions android 12+',
        );
      }
    });
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(checkResult => {
      if (checkResult) {
        console.debug(
          '[handleAndroidPermissions] runtime permission Android <12 already OK',
        );
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(requestResult => {
          if (requestResult) {
            console.debug(
              '[handleAndroidPermissions] User accepts runtime permission android <12',
            );
          } else {
            console.error(
              '[handleAndroidPermissions] User refuses runtime permission android <12',
            );
          }
        });
      }
    });
  }
};

export const handleDownload = async (url: string) => {
  // if device is android you have to ensure you have permission
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    handleAndroidPermissions();
  }
  // let ext = getExtention(url);
  const {fs} = RNFetchBlob;
  let PictureDir = fs.dirs.DownloadDir;

  try {
    const imgPath =
      PictureDir +
      '/PixelTide/pixel_tide' +
      Math.floor(Math.random() * 10000) +
      '.jpg';
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
      .then(res => {
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
