import {Alert, PermissionsAndroid, ToastAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {UUID} from './UtilsFN';

export const grantPermission = async (url: string) => {
  const granted = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);
  downloadImage(url);
  return granted;
};

const downloadImage = async (url: any) => {
  const {config, fs} = RNFetchBlob;
  const path = fs.dirs.DownloadDir + `/image_${UUID()}.jpg`;

  console.log(path);

  // Start downloading the image
  // {
  //   fileCache: true,
  //   addAndroidDownloads: {
  //     useDownloadManager: true,
  //     notification: true,
  //     path: path,
  //     description: 'Downloading image',
  //     mime: 'image/jpeg',
  //     mediaScannable: true,
  //   },
  // }
  config({})
    .fetch('GET', url)
    .then((res: any) => {
      console.log('The file is saved to:', path);
      ToastAndroid.show(`Image downloaded successfully to: ${path}`, 10000);
    })
    .catch((error: any) => {
      console.error('Error downloading image:', error);
      ToastAndroid.show(`Failed to download image due to: ${error}`, 10000);
    });
};
