import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppColor, SIZES} from '../../utils/Constant';
import {BackIcon, BrushIcon, DownloadIcon, InfoIcon} from '../../assets/svg';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_HEIGHT} from '../../utils/Style';
//@ts-ignore
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import {grantPermission} from '../../utils/Helper';
import AdsScreen from '../../components/AdsScreen';

type Props = {};

const ItemOverview = ({route}: any) => {
  const {image_url} = route.params;

  const nav = useNavigation();

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor={'transparent'} />
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: image_url}}
        style={{
          width: SIZES.ScreenWidth,
          height: SIZES.ScreenHeight,
        }}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          marginTop: SCREEN_HEIGHT * 0.06,
          position: 'absolute',
          backgroundColor: AppColor.btnBgColor,
          padding: 10,
          borderRadius: 10,
          marginLeft: 16,
          opacity: 0.6,
        }}
        onPress={() => nav?.goBack()}>
        <BackIcon
          color="#000"
          width={35}
          height={35}
          style={{
            padding: 20,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          bottom: 60,
          position: 'absolute',
          flexDirection: 'row',
          flexGrow: 1,
          width: '60%',
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}>
        {/* <TouchableHighlight
          onPress={() => {
            console.log('Hijsakhk');
          }}
          underlayColor={AppColor.activeBgColor}
          style={{
            backgroundColor: AppColor.btnBgColor,
            padding: 10,
            borderRadius: 10,
            opacity: 0.8,
          }}
          activeOpacity={0.7}>
          <InfoIcon
            color="#fff"
            width={15}
            height={15}
            style={{
              padding: 20,
            }}
          />
        </TouchableHighlight> */}
        <TouchableHighlight
          onPress={() => {
            grantPermission(image_url);
          }}
          underlayColor={AppColor.activeBgColor}
          style={{
            backgroundColor: AppColor.btnBgColor,
            padding: 10,
            borderRadius: 10,
            opacity: 0.8,
          }}
          activeOpacity={0.7}>
          <DownloadIcon
            color="#fff"
            width={15}
            height={15}
            style={{
              padding: 20,
            }}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            try {
              ManageWallpaper?.setWallpaper(
                {
                  uri: image_url,
                },
                (res: {msg: string; status: string; url: string}) => {
                  ToastAndroid.show(`${res?.msg}`, 10000);
                },
                TYPE?.HOME,
              );
            } catch (error) {
              console.log(error);
            }
          }}
          underlayColor={AppColor.activeBgColor}
          style={{
            backgroundColor: AppColor.btnBgColor,
            padding: 10,
            borderRadius: 10,
            opacity: 0.8,
          }}
          activeOpacity={0.7}>
          <BrushIcon
            color="#fff"
            width={15}
            height={15}
            style={{
              padding: 20,
            }}
          />
        </TouchableHighlight>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: -5,
          alignSelf: 'center',
          zIndex: 1,
        }}>
        <AdsScreen />
      </View>
    </View>
  );
};

export default ItemOverview;

const styles = StyleSheet.create({});
function granted() {
  throw new Error('Function not implemented.');
}
