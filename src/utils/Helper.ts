import {Alert, PermissionsAndroid} from 'react-native';
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
  const downloads = fs.dirs.DownloadDir;
  const path = `${downloads}/image_${UUID()}.jpg`;

  console.log(path);

  // Start downloading the image
  config({
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: path,
      description: 'Downloading image',
    },
  })
    .fetch('GET', url)
    .then((res: any) => {
      console.log('The file is saved to:', res.path());
      Alert.alert(`Image downloaded successfully to: ${res.path()}`);
    })
    .catch((error: any) => {
      console.error('Error downloading image:', error);
      Alert.alert(`Failed to download image due to: ${error}`);
    });
};
